---
title: Basics of Go
description: "Go study notes: packages, modules, types, structs, interfaces, errors, JSON, HTTP, and tests."
date: 2026-06-01T11:00:05.000Z
tags:
  - Go
  - learning
---

## Why Go?

I picked up Go because it is a good language for building boring, reliable backend software: small web services, command line tools, and programs that need to run for a long time without surprises.

Compared to C, Go takes a lot off your plate. There is no manual memory management, no header files, and no pointer arithmetic. It still teaches the fundamentals that carry over to any language, though: types, files, packages, error handling, networking, concurrency, and how to ship a program.

These notes are not a full tour of the language. They cover what you need to get productive and build good habits early. If you already know another language, you should be able to read this in one sitting and start writing small programs.

## Install and check Go

Download Go from [go.dev/dl](https://go.dev/dl/) and install it. Then check that your terminal can find it:

```bash
go version
```

If that prints something like `go version go1.23.0 darwin/arm64`, you are ready.

Here is the smallest useful Go program. Save it as `main.go`:

```go
package main

import "fmt"

func main() {
	fmt.Println("Hello, Go")
}
```

Every Go file starts by saying which package it belongs to. A program you can run lives in a package called `main`, and it starts at a function called `main`. The `fmt` package handles formatted input and output, and `Println` prints a line.

You can run it without building a separate file first:

```bash
go run main.go
```

That compiles the program into a temporary location and runs it. When you want an actual executable you can keep or ship, build it:

```bash
go build -o hello main.go
./hello
```

The `-o hello` part names the output file. Without it, Go names the binary after the file or module.

## Modules

A module is a Go project: a folder of code with a name and a list of dependencies. Almost every Go project starts by creating one:

```bash
go mod init example.com/hello
```

That creates a `go.mod` file. It records the module's name (`example.com/hello`) and, later, every dependency you add along with its version. The name looks like a URL because Go uses it to locate packages, but it does not have to point anywhere for a local project.

These are the commands you will use constantly:

- `go mod init` creates a new module.
- `go get` adds a dependency or updates one.
- `go mod tidy` removes dependencies you no longer use and adds ones you forgot.
- `go run` compiles and runs your program.
- `go build` compiles your program into an executable.
- `go test` runs your tests.
- `go fmt` formats your code in the standard Go style.

One of the nicest things about Go is that all of this ships with the language. You do not need to pick a formatter, a test runner, or a build tool. Everyone uses the same ones, so every Go codebase looks and works roughly the same way.

## Packages

Every Go file starts with a package name:

```go
package main
```

`main` is special: a package named `main` builds into an executable, and its `main` function is where the program starts. Any other package name means the code is a library, meant to be imported by other code:

```go
package mathutil

func Add(a int, b int) int {
	return a + b
}
```

Go does not have `public` or `private` keywords. Instead, the first letter of a name decides who can see it:

- `Add` starts with a capital letter, so it is exported. Other packages can call `mathutil.Add`.
- `add` starts with a lowercase letter, so it is private to the `mathutil` package.

This applies to everything: functions, types, struct fields, and constants. It feels odd for about a day and then becomes second nature.

## Variables

The full way to declare a variable names its type:

```go
var name string = "Ron"
var age int = 35
```

Inside functions, you will almost always see the short form instead. Go works out the type from the value:

```go
name := "Ron"
age := 35
```

The difference between `:=` and `=` trips up a lot of people at first:

- `:=` declares a new variable and gives it a value.
- `=` assigns a new value to a variable that already exists.

So `count := 0` creates `count`, and later `count = 5` changes it. Using `:=` again on the same name in the same scope is a compile error, with one exception: if at least one variable on the left is new, `:=` is allowed and simply reuses the others. That is why you can write `result, err := first()` and then `other, err := second()` in the same function.

Variables you declare without a value get a "zero value" instead of being undefined. That is `0` for numbers, `""` for strings, `false` for booleans, and `nil` for pointers, slices, and maps.

## Basic types

These are the types you will reach for most often:

- `string` holds text.
- `bool` holds `true` or `false`.
- `int` is a whole number, 64 bits on most modern machines.
- `int64` is a whole number that is always 64 bits.
- `float64` is a decimal number.
- `byte` is a single byte, often used for raw data.
- `rune` is a single Unicode character.
- `error` represents something that went wrong (more on this below).

Here they are in use:

```go
package main

import "fmt"

func main() {
	name := "Ron"
	active := true
	score := 10

	fmt.Println(name, active, score) // Ron true 10
}
```

## Functions

Functions list the type of each parameter and the type they return:

```go
func add(a int, b int) int {
	return a + b
}
```

When several parameters in a row share a type, you can write the type once. This means exactly the same thing:

```go
func add(a, b int) int {
	return a + b
}
```

Go functions can return more than one value. This is how most Go functions report errors: they return the result and an error side by side.

```go
func divide(a, b int) (int, error) {
	if b == 0 {
		return 0, fmt.Errorf("divide by zero")
	}

	return a / b, nil
}
```

If the division works, the function returns the answer and `nil` for the error, meaning "no error". If it fails, it returns a placeholder `0` and an error describing what happened.

## Errors

Go does not use exceptions for normal errors. An error is just a value that a function returns, and the caller decides what to do with it.

```go
result, err := divide(10, 0)
if err != nil {
	return err
}

fmt.Println(result)
```

You will write this `if err != nil` check constantly. It follows the same rhythm every time:

1. Call the function.
2. Check whether `err` is `nil`.
3. If it is not, handle the error right away: return it, log it, or recover.
4. Only use the result once you know the call worked.

This feels repetitive at first, and it is. The payoff is that every place something can fail is visible right there in the code, instead of hidden in a `try` block somewhere up the call stack.

## Arrays and slices

An array has a fixed length that is part of its type. A `[3]int` always holds exactly three ints.

```go
var numbers [3]int
numbers[0] = 10
```

You will rarely use arrays directly. Slices are what you use day to day, because they can grow:

```go
numbers := []int{1, 2, 3}
numbers = append(numbers, 4)
```

Note that `append` returns a new slice. You have to assign the result back, or the change is lost.

Under the hood, a slice is a window onto an array. Two slices can look at the same array, so changing one can change the other:

```go
a := []int{1, 2, 3}
b := a[:2]

b[0] = 99

fmt.Println(a) // [99 2 3]
```

Here `b` is a view of the first two elements of `a`, so writing to `b[0]` also changes `a[0]`. This catches people when they pass slices around and are surprised that the original changed. If you need an independent copy, use `copy` or `slices.Clone`.

## Maps

A map stores key/value pairs, like a dictionary or an object in other languages.

```go
counts := map[string]int{
	"coffee": 2,
	"tea":    1,
}

counts["water"] = 3
```

Reading a key that does not exist does not crash. It returns the zero value for the value type, which is `0` here. That is a problem when `0` is also a valid count, so Go lets you ask whether the key was actually there:

```go
count, ok := counts["coffee"]
if !ok {
	fmt.Println("missing")
}

fmt.Println(count)
```

`ok` is `true` if the key exists and `false` if it does not. Use this form whenever "missing" and "zero" mean different things.

## Structs

A struct groups related fields into one type. It is the closest thing Go has to a class.

```go
type User struct {
	ID    int
	Name  string
	Email string
}
```

Create one by naming the fields you want to set:

```go
user := User{
	ID:    1,
	Name:  "Ron",
	Email: "ron@example.com",
}
```

Any field you leave out gets its zero value. Read or change fields with a dot, like `user.Name`.

## Methods

A method is a function attached to a type. The part in parentheses before the name, called the receiver, says which type it belongs to:

```go
type User struct {
	Name string
}

func (u User) Greeting() string {
	return "Hello, " + u.Name
}
```

Call it with a dot, like a method in any other language:

```go
user := User{Name: "Ron"}
fmt.Println(user.Greeting()) // Hello, Ron
```

With a receiver like `(u User)`, the method gets a copy of the struct. Any changes it makes are thrown away when it returns. When a method needs to change the original, or the struct is large enough that copying it is wasteful, use a pointer receiver instead:

```go
func (u *User) Rename(name string) {
	u.Name = name
}
```

Now `user.Rename("Ronald")` changes `user` itself. A good rule of thumb: if any method on a type needs a pointer receiver, give all of that type's methods pointer receivers so they behave consistently.

## Interfaces

An interface describes behavior: a set of methods a type must have.

```go
type Store interface {
	Save(user User) error
}
```

Unlike many languages, you never write "this type implements `Store`". Any type that has a `Save(User) error` method satisfies the interface automatically. A database store, an in-memory store for tests, and a store that writes to a file can all be used anywhere a `Store` is expected.

Go code tends to keep interfaces small, often just one or two methods, and to define them in the package that uses them rather than the package that implements them. That keeps packages loosely connected and makes testing easy, since you can swap in a fake that has the same method.

## JSON

JSON support is part of the standard library, in `encoding/json`:

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

	fmt.Println(string(data)) // {"id":1,"name":"Ron","email":"ron@example.com"}
}
```

`json.Marshal` turns a Go value into JSON bytes, and `json.Unmarshal` does the reverse. The backtick text after each field, like ``json:"email"``, is a struct tag. It tells the encoder to write the field as `email` instead of the Go name `Email`.

Only exported fields (capitalized ones) are included in the JSON. A lowercase field is silently skipped, which is a common source of "why is my JSON empty?" confusion.

## HTTP server

Go's standard library includes a production-grade HTTP server, so you can build a web service without a framework:

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

	if err := http.ListenAndServe(":8080", nil); err != nil {
		panic(err)
	}
}
```

`HandleFunc` connects a path to a function. That function gets two arguments: `w`, which you write the response to, and `r`, which holds everything about the incoming request. `ListenAndServe` starts the server on port 8080 and keeps running until the program stops.

Run it:

```bash
go run main.go
```

Then open this address in your browser:

```txt
http://localhost:8080
```

`ListenAndServe` returns an error if the server cannot start, for example because another program is already using port 8080. The example above ignores it, which means the program would quit silently. In any program you actually use, check it:

```go
if err := http.ListenAndServe(":8080", nil); err != nil {
	panic(err)
}
```

## Tests

Testing is built into the language and the `go` command. Tests live next to the code they test, in files ending in `_test.go`:

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

A test is any function whose name starts with `Test` and takes a `*testing.T`. If a check fails, call `t.Fatalf` (stop this test) or `t.Errorf` (report and keep going) with a message.

Run every test in the module:

```bash
go test ./...
```

The `./...` means "this folder and every folder below it".

## Table tests

When you want to test the same function with many inputs, Go code usually uses a table test. You list the cases as data, then loop over them:

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

Adding a case is one more line in the table. `t.Run` gives each case its own name, so when one fails, the output tells you exactly which one.

## What to practice

Reading only gets you so far. These small projects each exercise a different part of the language:

- a command line calculator (arguments, parsing, errors)
- a JSON file reader (files, structs, `encoding/json`)
- an HTTP server with one route (`net/http`)
- an HTTP server that returns JSON (handlers plus JSON)
- a todo list API (all of the above, plus a map as storage)
- a file line counter (reading files line by line)
- a URL checker (HTTP requests and error handling)
- a tiny in-memory key/value store (maps, methods, and a small interface)

Whatever you build, keep these habits:

- Run `go fmt ./...` so your code matches the standard style.
- Run `go test ./...` and keep the tests passing.
- Check every error instead of ignoring it.
- Keep interfaces small.
- Start with a flat, simple package layout and only add structure when you need it.

## Go foundation checklist

These should feel comfortable before moving on:

- modules and packages
- functions and multiple return values
- errors as values
- slices and maps
- structs and methods
- interfaces
- JSON encoding and decoding
- basic HTTP servers
- tests and table tests
- `go fmt`, `go test`, and `go build`

Next: [Go Concurrency and Real Programs](/blog/go-concurrency-and-real-programs), which covers doing more than one thing at a time.
