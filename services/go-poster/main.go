package main

import (
	"bytes"
	"context"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

type PostPayload struct {
	Title    string                 `json:"title" binding:"required"`
	Content  string                 `json:"content" binding:"required"`
	Tags     []string               `json:"tags,omitempty"`
	Draft    *bool                  `json:"draft,omitempty"`
	Slug     string                 `json:"slug,omitempty"`
	Metadata map[string]interface{} `json:"metadata,omitempty"`
}

func envOrDefault(key, def string) string {
	val := strings.TrimSpace(os.Getenv(key))
	if val == "" {
		return def
	}
	return val
}

func mustEnv(key string) string {
	val := strings.TrimSpace(os.Getenv(key))
	if val == "" {
		log.Fatalf("missing required env var: %s", key)
	}
	return val
}

func generateSlug(title string) string {
	lower := strings.ToLower(title)
	replacer := strings.NewReplacer(" ", "-", "_", "-", "/", "-", "\\", "-", ".", "-", ",", "-", ":", "-", ";", "-", "!", "", "?", "")
	slug := replacer.Replace(lower)
	slug = strings.Map(func(r rune) rune {
		if (r >= 'a' && r <= 'z') || (r >= '0' && r <= '9') || r == '-' {
			return r
		}
		return -1
	}, slug)
	slug = strings.Trim(slug, "-")
	if slug == "" {
		return "post-" + strconv.FormatInt(time.Now().Unix(), 10)
	}
	return slug
}

func main() {
	router := gin.Default()

	posterPort := envOrDefault("POSTER_PORT", "8081")
	backendBase := mustEnv("BACKEND_BASE_URL")
	backendEndpoint := envOrDefault("BACKEND_POSTS_ENDPOINT", "/posts")
	backendAPIKey := os.Getenv("BACKEND_API_KEY")
	timeoutSeconds, _ := strconv.Atoi(envOrDefault("BACKEND_TIMEOUT_SECONDS", "15"))

	client := &http.Client{Timeout: time.Duration(timeoutSeconds) * time.Second}

	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	router.POST("/post", func(c *gin.Context) {
		var payload PostPayload
		if err := c.ShouldBindJSON(&payload); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// Ensure slug
		if strings.TrimSpace(payload.Slug) == "" && strings.TrimSpace(payload.Title) != "" {
			payload.Slug = generateSlug(payload.Title)
		}

		// Prepare request to backend (transform to backend schema)
		backendURL := strings.TrimRight(backendBase, "/") + backendEndpoint
		backendBody := map[string]interface{}{
			"title": payload.Title,
			"desc":  payload.Content,
		}
		bodyBytes, err := json.Marshal(backendBody)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to serialize payload"})
			return
		}

		req, err := http.NewRequestWithContext(context.Background(), http.MethodPost, backendURL, bytes.NewReader(bodyBytes))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create request"})
			return
		}
		req.Header.Set("Content-Type", "application/json")
		if strings.TrimSpace(backendAPIKey) != "" {
			req.Header.Set("Authorization", "Bearer "+backendAPIKey)
		}

		resp, err := client.Do(req)
		if err != nil {
			c.JSON(http.StatusBadGateway, gin.H{"error": "backend request failed", "details": err.Error()})
			return
		}
		defer resp.Body.Close()
		respBody, _ := io.ReadAll(resp.Body)

		// Proxy status and body back
		c.Data(resp.StatusCode, "application/json", respBody)
	})

	log.Printf("poster listening on :%s", posterPort)
	if err := router.Run(":" + posterPort); err != nil {
		log.Fatal(err)
	}
}