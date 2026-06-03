---
title: Go Concurrency and Real Programs
description: "A practical Go follow-up: goroutines, channels, context, HTTP handlers, graceful shutdown, and real backend habits."
date: 2026-06-02T11:30:00.000Z
tags:
  - Go
  - learning
  - backend
---

## Why this exists

The basics of Go are pretty small, but real Go starts to get interesting when programs do more than one thing at a time.

This note is about the practical side:

- goroutines
- channels
- `select`
- `context`
- HTTP handlers
- timeouts
- graceful shutdown
- worker pools
- real backend habits

Concurrency is much easier to use well when the mental model stays clear.

## Goroutines

A goroutine is a lightweight thread managed by Go.

Start one with `go`:

```go
package main

import (
	"fmt"
	"time"
)

func say(message string) {
	for i := 0; i < 3; i++ {
		fmt.Println(message)
		time.Sleep(100 * time.Millisecond)
	}
}

func main() {
	go say("hello")
	say("world")
}
```

This starts `say("hello")` in the background while `say("world")` runs in the main goroutine.

Important: when `main` exits, the program exits. It does not wait for every goroutine automatically.

## Wait groups

Use `sync.WaitGroup` when work needs to wait for goroutines to finish.

```go
package main

import (
	"fmt"
	"sync"
)

func main() {
	var wg sync.WaitGroup

	for i := 0; i < 3; i++ {
		wg.Add(1)

		go func(id int) {
			defer wg.Done()
			fmt.Println("worker", id)
		}(i)
	}

	wg.Wait()
}
```

The pattern:

- `Add(1)` before starting work
- `defer Done()` inside the goroutine
- `Wait()` where execution should block until all work finishes

## Channels

Channels let goroutines communicate.

```go
package main

import "fmt"

func main() {
	messages := make(chan string)

	go func() {
		messages <- "hello"
	}()

	msg := <-messages
	fmt.Println(msg)
}
```

Read this as:

- `messages <- "hello"` sends a value
- `<-messages` receives a value

By default, sending and receiving block until both sides are ready.

## Closing channels

Close a channel when the sender is done sending values.

```go
package main

import "fmt"

func main() {
	jobs := make(chan int)

	go func() {
		for i := 0; i < 3; i++ {
			jobs <- i
		}
		close(jobs)
	}()

	for job := range jobs {
		fmt.Println(job)
	}
}
```

Only the sender should close the channel.

## `select`

`select` waits on multiple channel operations.

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	done := make(chan string)

	go func() {
		time.Sleep(2 * time.Millisecond)
		done <- "finished"
	}()

	select {
	case message := <-done:
		fmt.Println(message)
	case <-time.After(1 * time.Millisecond):
		fmt.Println("timed out")
	}
}
```

This is how Go handles "wait for this, but give up if it takes out."

## Context

`context.Context` carries cancellation and deadlines across function calls and goroutines.

This matters a lot in servers. If a request is canceled, the work for that request should stop too.

```go
package main

import (
	"context"
	"fmt"
	"time"
)

func work(ctx context.Context) error {
	select {
	case <-time.After(2 * time.Second):
		fmt.Println("work complete")
		return nil
	case <-ctx.Done():
		return ctx.Err()
	}
}

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()

	if err := work(ctx); err != nil {
		fmt.Println(err)
	}
}
```

Useful rules:

- pass `context.Context` as the first argument
- do not store context in structs
- call `cancel` when creating a cancelable context
- check `ctx.Done()` in long-running work

## Worker pool

A worker pool limits how much work runs at the same time.

```go
package main

import (
	"fmt"
	"sync"
)

func worker(id int, jobs <-chan int, results chan<- string, wg *sync.WaitGroup) {
	defer wg.Done()

	for job := range jobs {
		results <- fmt.Sprintf("worker %d processed job %d", id, job)
	}
}

func main() {
	jobs := make(chan int)
	results := make(chan string)
	var wg sync.WaitGroup

	for i := 1; i <= 3; i++ {
		wg.Add(1)
		go worker(i, jobs, results, &wg)
	}

	go func() {
		for i := 1; i <= 5; i++ {
			jobs <- i
		}
		close(jobs)
		wg.Wait()
		close(results)
	}()

	for result := range results {
		fmt.Println(result)
	}
}
```

The worker function uses directional channel types:

- `<-chan int`: receive-only
- `chan<- string`: send-only

That makes the function contract clearer.

## Data races

Goroutines can create bugs if they access shared data at the same time.

This is unsafe:

```go
count := 0

go func() {
	count++
}()

go func() {
	count++
}()
```

Use the race detector:

```bash
go test -race ./...
```

For shared state, use one of these:

- channels
- `sync.Mutex`
- `sync.RWMutex`
- `sync/atomic`

Do not guess. Run the race detector.

## HTTP handlers

Go's standard HTTP server is enough for a lot of programs.

```go
package main

import (
	"encoding/json"
	"net/http"
)

type HealthResponse struct {
	OK bool `json:"ok"`
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	if err := json.NewEncoder(w).Encode(HealthResponse{OK: true}); err != nil {
		http.Error(w, "failed to encode response", http.StatusInternalServerError)
		return
	}
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /health", healthHandler)

	if err := http.ListenAndServe(":8080", mux); err != nil {
		panic(err)
	}
}
```

Good habits:

- set response headers before writing the body
- validate request method or use method-aware routes
- return useful status codes
- encode JSON directly to the response writer
- do not ignore encode/decode errors

## Request context

Every HTTP request has a context.

```go
func slowHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	select {
	case <-time.After(5 * time.Second):
		w.WriteHeader(http.StatusNoContent)
	case <-ctx.Done():
		return
	}
}
```

If the client disconnects or the request times out, the context is canceled.

That lets downstream work stop instead of wasting resources.

## Server timeouts

Do not run a public HTTP server with default zero-value timeouts.

```go
server := &http.Server{
	Addr:         ":8080",
	Handler:      mux,
	ReadTimeout:  5 * time.Second,
	WriteTimeout: 10 * time.Second,
	IdleTimeout:  2 * time.Second,
}

if err := server.ListenAndServe(); err != nil {
	panic(err)
}
```

Timeouts are part of making a server real.

## Graceful shutdown

Real servers should shut down cleanly.

```go
package main

import (
	"context"
	"errors"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusNoContent)
	})

	server := &http.Server{
		Addr:         ":8080",
		Handler:      mux,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  120 * time.Second,
	}

	go func() {
		log.Println("listening on :8080")
		if err := server.ListenAndServe(); !errors.Is(err, http.ErrServerClosed) {
			log.Fatal(err)
		}
	}()

	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt, syscall.SIGTERM)
	<-stop

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := server.Shutdown(ctx); err != nil {
		log.Fatal(err)
	}
}
```

That is a lot, but the idea is simple:

- start the server
- listen for shutdown signal
- give current requests a little time to finish
- exit

## Project shape

For a small Go service, a boring structure is usually the right one:

```txt
.
├── go.mod
├── cmd
│   └── server
│       └── main.go
├── internal
│   ├── users
│   │   ├── service.go
│   │   └── service_test.go
│   └── storage
│       └── memory.go
└── README.md
```

Notes:

- `cmd/server/main.go` starts the app
- `internal` holds app code that should not be imported by other modules
- keep package names short and meaningful
- do not over-architect tiny programs

## Logging

Go has `log` in the standard library and `log/slog` for structured logging.

```go
package main

import "log/slog"

func main() {
	slog.Info("server started", "addr", ":8080")
}
```

For real services, structured logs are easier to search than random strings.

## Configuration

Start with environment variables.

```go
port := os.Getenv("PORT")
if port == "" {
	port = "8080"
}
```

Keep config boring until it needs to be fancy.

## Real-program checklist

Before calling a Go program real, these should be in place:

- tests for business logic
- `go test ./...` passing
- `go test -race ./...` passing for concurrent code
- request timeouts
- server timeouts
- context passed into slow work
- useful logs
- graceful shutdown
- clear package boundaries
- simple README with run/test commands

## Practice projects

Good next projects:

- concurrent URL status checker
- worker pool that processes files
- HTTP JSON API with tests
- tiny job queue
- log parser
- static file server
- webhook receiver
- CLI that calls an HTTP API

For every concurrency project:

- know who starts each goroutine
- know how each goroutine stops
- know who closes each channel
- run the race detector
- avoid shared state unless necessary

## The mental model

Go concurrency is not "make everything async."

The better model:

- goroutines do work
- channels communicate ownership or results
- contexts cancel work
- wait groups wait for work
- mutexes protect shared state
- tests and race detection catch problems early

That is the foundation needed before building bigger Go services.
