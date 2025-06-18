package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"regexp"
	"strings"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/schema"
)

type Now struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Title     string    `json:"title"`
	Desc      string    `json:"desc"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type LoginAttempt struct {
	ID        uint   `gorm:"primaryKey"`
	Key       string `gorm:"uniqueIndex"`
	IP        string
	Count     int
	LastTry   time.Time
	BlockedAt time.Time
	CreatedAt time.Time
	UpdatedAt time.Time
}

const (
	PORT             = "8080"
	TOKEN_NAME       = "x-ronb-co-token"
	MAX_ATTEMPTS     = 3
	LOCKOUT_DURATION = 10 * time.Minute
	RESET_WINDOW     = 5 * time.Minute
)

func AuthMiddleware(apiToken string) gin.HandlerFunc {
	return func(c *gin.Context) {
		token := c.GetHeader("Authorization")

		if token == "" {
			cookie, err := c.Cookie(TOKEN_NAME)
			if err == nil {
				token = "Bearer " + cookie
			}
		}

		if token != "Bearer "+apiToken {
			c.AbortWithStatusJSON(http.StatusUnauthorized,
				gin.H{"error": "unauthorized"})
			return
		}

		c.Next()
	}
}

func recordFailedAttempts(db *gorm.DB, key string, ip string) {
	var attempt LoginAttempt
	now := time.Now()

	err := db.Where("key = ?", key).First(&attempt).Error
	if err != nil {

		if err == gorm.ErrRecordNotFound {
			db.Create(&LoginAttempt{
				Key:     key,
				IP:      ip,
				Count:   1,
				LastTry: now,
			})
		}
		return
	}

	attempt.Count++
	attempt.LastTry = now
	if attempt.Count >= MAX_ATTEMPTS {
		attempt.BlockedAt = now
	}

	db.Save(&attempt)
}

func isBlocked(db *gorm.DB, key string) bool {
	var attempt LoginAttempt
	err := db.Where("key = ?", key).First(&attempt).Error
	if err != nil {
		return false
	}

	now := time.Now()

	if !attempt.BlockedAt.IsZero() && now.Sub(attempt.BlockedAt) < LOCKOUT_DURATION {
		return true
	}

	if !attempt.BlockedAt.IsZero() && now.Sub(attempt.BlockedAt) >= LOCKOUT_DURATION {
		return false
	}

	if now.Sub(attempt.LastTry) > RESET_WINDOW {
		db.Delete(&attempt)
		return false
	}

	return attempt.Count >= MAX_ATTEMPTS
}

func ConnectDB() (*gorm.DB, error) {
	dsn := os.Getenv("DATABASE_URL")
	prefix := os.Getenv("DB_PREFIX")

	withPrefix := schema.NamingStrategy{
		TablePrefix: prefix,
	}

	var db *gorm.DB
	var err error

	db, err = gorm.Open(postgres.New(postgres.Config{
		DSN:                  dsn,
		PreferSimpleProtocol: true,
	}), &gorm.Config{
		NamingStrategy: withPrefix,
	})

	return db, err
}

func main() {
	if gin.Mode() != gin.ReleaseMode {
		_ = godotenv.Load(".env.local")
	}

	r := gin.Default()
	if err := r.SetTrustedProxies(nil); err != nil {
		log.Fatalf("failed to set trusted proxies: %v", err)
	}

	//	CORS setup
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "http://localhost:3003"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	api := r.Group("/api")
	secure := gin.Mode() == gin.ReleaseMode

	db, dbError := ConnectDB()
	if dbError != nil {
		log.Panicf("DB error %v", dbError)
	}

	// AUTO MIGRATE
	if err := db.AutoMigrate(&Now{}); err != nil {
		log.Fatalf("migration of Nows failed: %v", err)
	}

	if err := db.AutoMigrate(&LoginAttempt{}); err != nil {
		log.Fatalf("migration of loginAttempts failed: %v", err)
	}

	api.POST("/login", func(c *gin.Context) {
		var input struct {
			Username string `json:"username"`
			Password string `json:"password"`
		}

		key := fmt.Sprintf("%s|%s", c.ClientIP(), c.GetHeader("User-Agent"))
		if isBlocked(db, key) {
			c.JSON(http.StatusTooManyRequests, gin.H{
				"error": "too many login attempts, please try again later",
			})
			return
		}

		if c.ContentType() != "application/json" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Expected application/json"})
			return
		}

		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
			return
		}

		input.Username = strings.TrimSpace(input.Username)
		input.Password = strings.TrimSpace(input.Password)

		if input.Username == "" || input.Password == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Username and password are required"})
			return
		}

		if matched := regexp.MustCompile(`^[a-zA-Z0-9_]+$`).MatchString(input.Username); !matched {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid characters in username"})
			return
		}

		hashedUser := os.Getenv("ADMIN_USERNAME_HASH")
		hashedPass := os.Getenv("ADMIN_PASSWORD_HASH")
		apiToken := os.Getenv("API_TOKEN")

		userErr := bcrypt.CompareHashAndPassword([]byte(hashedUser), []byte(input.Username))
		passErr := bcrypt.CompareHashAndPassword([]byte(hashedPass), []byte(input.Password))
		if userErr != nil || passErr != nil {
			recordFailedAttempts(db, key, key)
			c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
			return
		}

		c.SetCookie(TOKEN_NAME, apiToken, 3600, "/", "", secure, true)
		c.JSON(http.StatusOK, gin.H{"message": "logged in"})
	})

	api.GET("/now", func(c *gin.Context) {
		var nows []Now
		if err := db.Find(&nows).Error; err != nil {
			log.Printf("Database error: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to fetch Nows",
			})
			return
		}
		c.JSON(http.StatusOK, nows)
	})

	auth := api.Group("/", AuthMiddleware(os.Getenv("API_TOKEN")))

	auth.GET("/me", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"role": "admin"})
	})

	auth.POST("/logout", func(c *gin.Context) {
		c.SetCookie(TOKEN_NAME, "", 1, "/", "", secure, true)
		c.JSON(http.StatusOK, gin.H{"message": "logged out"})
	})

	auth.POST("/prune", func(c *gin.Context) {
		now := time.Now()
		var stale []LoginAttempt

		if err := db.Where(`
					(blocked_at IS NOT NULL AND blocked_at < ?) OR
							(blocked_at IS NULL AND last_try < ?)
								`, now.Add(-LOCKOUT_DURATION), now.Add(-RESET_WINDOW)).Find(&stale).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to fetch login attempts",
			})
			return
		}

		if len(stale) == 0 {
			c.JSON(http.StatusOK, gin.H{"message": "No stale login attempts"})
			return
		}

		ids := make([]uint, len(stale))
		for i, attempt := range stale {
			ids[i] = attempt.ID
		}

		if err := db.Delete(&LoginAttempt{}, ids).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to delete stale login attempts",
			})

			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message":          "Pruned staled login attempts",
			"deleted_attempts": len(ids),
		})
	})

	auth.POST("/now", func(c *gin.Context) {
		var input struct {
			Title string `json:"title"`
			Desc  string `json:"desc"`
		}

		if c.ContentType() != "application/json" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Expected application/json"})
			return
		}

		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Invalid input",
			})
			return
		}

		now := &Now{Title: input.Title, Desc: input.Desc}
		if err := db.Create(now).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create Now post"})
			return

		}
		c.JSON(http.StatusOK, now)
	})

	auth.PUT("/now/:id", func(c *gin.Context) {
		id := c.Param("id")

		var input struct {
			Title *string `json:"title"`
			Desc  *string `json:"desc"`
		}

		if c.ContentType() != "application/json" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Expected application/json"})
			return
		}

		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Invalid input",
			})
			return
		}

		updates := make(map[string]interface{})

		if input.Title != nil {
			updates["title"] = *input.Title
		}

		if input.Desc != nil {
			updates["desc"] = *input.Desc
		}

		if len(updates) == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Nothing to update"})
			return
		}

		res := db.Model(&Now{}).Where("id = ?", id).Updates(updates)

		if res.Error != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update Now entry"})
			return
		}
		if res.RowsAffected == 0 {
			c.JSON(http.StatusNotFound, gin.H{"error": "Entry not found"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Entry updated"})
	})

	auth.DELETE("/now/:id", func(c *gin.Context) {
		id := c.Param("id")
		if err := db.Delete(&Now{}, id).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete Now entry"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Entry deleted"})
	})

	api.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = PORT
	}

	err := r.Run(":" + port)
	if err != nil {
		log.Fatal(err)
	}
}
