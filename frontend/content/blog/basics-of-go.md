---
title: Basics of Go
description: "A practical Go study guide: packages, modules, types, structs, interfaces, errors, JSON, HTTP, and tests."
date: 2026-06-01T11:00:05.000Z
tags:
  - Go
  - learning
---

## Why Go?

Go is a strong language to learn for building boring, reliable backend software.

It is smaller than C in some ways because there is no manual memory management, no header-file model, and no pointer arithmetic. But it still teaches useful fundamentals: types, files, packages, errors, networking, concurrency, and deployment.

The goal of this note is not to memorize every feature. The goal is to get productive and build the right habits.

## Install and check Go

Once Go is installed:

```bash
go version
```

A simple program:

```go
package main

import "fmt"

func main() {
	fmt.Println("Hello, Go")
}
```

Run it:

```bash
go run main.go
```

Build it:

```bash
go build -o hello main.go
./hello
```

## Modules

Most Go projects use modules.

```bash
go mod init example.com/hello
```

That creates `go.mod`, which names the module and tracks dependencies.

Common commands:

- `go mod init`: create a module
- `go get`: add or update dependencies
- `go mod tidy`: clean up dependencies
- `go run`: compile and run
- `go build`: compile
- `go test`: run tests
- `go fmt`: format code

One of Go's strengths is how much of the workflow is built into the toolchain.

## Packages

Every Go file starts with a package.

```go
package main
```

`main` is special. A package named `main` builds into an executable.

Other packages are reusable code:

```go
package mathutil

func Add(a int, b int) int {
	return a + b
}
```

Exported names start with a capital letter:

- `Add` is exported
- `add` is private to the package

## Variables

Go has explicit declarations:

```go
var name string = "Ron"
var age int = 35
```

But inside functions, the short form is common:

```go
name := "Ron"
age := 35
```

Use `:=` when declaring a new variable inside a function.

Use `=` when assigning to an existing variable.

## Basic types

Common types:

- `string`
- `bool`
- `int`
- `int64`
- `float64`
- `byte`
- `rune`
- `error`

Example:

```go
package main

import "fmt"

func main() {
	name := "Ron"
	active := true
	score := 10

	fmt.Println(name, active, score)
}
```

## Functions

Functions have explicit parameter and return types.

```go
func add(a int, b int) int {
	return a + b
}
```

If consecutive parameters have the same type, this is equivalent:

```go
func add(a, b int) int {
	return a + b
}
```

Go can return multiple values. This matters a lot for errors.

```go
func divide(a, b int) (int, error) {
	if b == 0 {
		return 0, fmt.Errorf("divide by zero")
	}

	return a / b, nil
}
```

## Errors

Go does not use exceptions for normal error handling.

Errors are values.

```go
result, err := divide(10, 0)
if err != nil {
	return err
}

fmt.Println(result)
```

This is one of the core Go habits:

- call a function
- check `err`
- handle it immediately
- keep going only if it worked

It can feel repetitive, but it keeps failure visible.

## Arrays and slices

Arrays have fixed length.

```go
var numbers [3]int
numbers[0] = 10
```

Slices are more common because they can grow.

```go
numbers := []int{1, 2, 3}
numbers = append(numbers, 4)
```

A slice is a view over an underlying array. That means appending or slicing can share memory in ways that matter.

```go
a := []int{1, 2, 3}
b := a[:2]

b[0] = 99

fmt.Println(a) // [99 2 3]
```

That is worth remembering.

## Maps

Maps store key/value pairs.

```go
counts := map[string]int{
	"coffee": 2,
	"tea":    1,
}

counts["water"] = 3
```

Check whether a key exists:

```go
count, ok := counts["coffee"]
if !ok {
	fmt.Println("missing")
}

fmt.Println(count)
```

The `ok` value matters because missing keys return the zero value.

## Structs

Structs group fields.

```go
type User struct {
	ID    int
	Name  string
	Email string
}
```

Create one:

```go
user := User{
	ID:    1,
	Name:  "Ron",
	Email: "ron@example.com",
}
```

## Methods

Methods attach behavior to a type.

```go
type User struct {
	Name string
}

func (u User) Greeting() string {
	return "Hello, " + u.Name
}
```

Call it:

```go
user := User{Name: "Ron"}
fmt.Println(user.Greeting())
```

Use a pointer receiver when the method should mutate the value or avoid copying a large struct.

```go
func (u *User) Rename(name string) {
	u.Name = name
}
```

## Interfaces

Interfaces describe behavior.

```go
type Store interface {
	Save(user User) error
}
```

Any type with a `Save(User) error` method satisfies the interface automatically.

That is the Go move: small interfaces, often defined where they are used.

## JSON

Go has JSON support in the standard library.

```go
package main

import (
	"encoding/json"
	"fmt"
)

type User struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

func main() {
	user := User{ID: 1, Name: "Ron", Email: "ron@example.com"}

	data, err := json.Marshal(user)
	if err != nil {
		panic(err)
	}

	fmt.Println(string(data))
}
```

Struct tags like ``json:"email"`` tell the encoder which field name to use.

## HTTP server

Go can build an HTTP server without a framework.

```go
package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "Hello from Go")
	})

	http.ListenAndServe(":8080", nil)
}
```

Run it:

```bash
go run main.go
```

Visit:

```txt
http://localhost:8080
```

For real programs, always check the server error:

```go
if err := http.ListenAndServe(":8080", nil); err != nil {
	panic(err)
}
```

## Tests

Go has testing built in.

```go
// mathutil.go
package mathutil

func Add(a, b int) int {
	return a + b
}
```

```go
// mathutil_test.go
package mathutil

import "testing"

func TestAdd(t *testing.T) {
	got := Add(2, 3)
	want := 5

	if got != want {
		t.Fatalf("got %d, want %d", got, want)
	}
}
```

Run:

```bash
go test ./...
```

## Table tests

Table tests are a common Go pattern.

```go
func TestAdd(t *testing.T) {
	tests := []struct {
		name string
		a    int
		b    int
		want int
	}{
		{name: "positive", a: 2, b: 3, want: 5},
		{name: "negative", a: -2, b: -3, want: -5},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := Add(tt.a, tt.b)
			if got != tt.want {
				t.Fatalf("got %d, want %d", got, tt.want)
			}
		})
	}
}
```

## What to practice

Good first Go projects:

- command line calculator
- JSON file reader
- HTTP server with one route
- HTTP server with JSON response
- todo list API
- file line counter
- URL checker
- tiny in-memory key/value store

For every project:

- run `go fmt ./...`
- run `go test ./...`
- check every error
- keep interfaces small
- prefer simple package structure

## Go foundation checklist

Before claiming a solid grasp of Go basics, these should feel comfortable:

- modules and packages
- functions and multiple returns
- errors as values
- slices and maps
- structs and methods
- interfaces
- JSON encoding/decoding
- basic HTTP servers
- tests and table tests
- `go fmt`, `go test`, `go build`

That is enough to start building useful backend programs.
