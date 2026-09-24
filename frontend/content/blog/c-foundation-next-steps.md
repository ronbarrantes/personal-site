---
title: C Foundation Next Steps
description: "C notes, part two: input, files, errors, safer strings, headers, Makefiles, and debugging."
date: 2026-05-15T10:30:10.000Z
tags:
  - C
  - learning
---

## Why this exists

[Basics of C](/blog/basics-of-c) covers the basics: types, pointers, structs, memory, and the preprocessor.

This one is the second pass. It covers what comes next:

- reading input without hurting myself
- working with files
- checking errors
- writing safer string code
- using headers correctly
- compiling multiple files
- debugging memory bugs
- building small practice projects

If the first post is "what are the pieces?", this one is "how do they fit together?"

## Input from the terminal

For quick demos, `scanf` looks tempting:

```c
#include <stdio.h>

int main(void)
{
  int age;

  printf("Age: ");

  if (scanf("%d", &age) != 1)
  {
    printf("Invalid age\n");
    return 1;
  }

  printf("You are %d years old\n", age);
}
```

The important part is the return value. `scanf` tells the program how many values it successfully read. Ignoring that means the program can keep going with bad data.

For strings, `scanf("%s", name)` is dangerous unless the width is limited, because it can overflow the buffer.

```c
char name[32];
scanf("%31s", name);
```

That reads at most 31 characters and leaves room for the null terminator.

## Reading lines with `fgets`

For line-based input, `fgets` is usually a better default than raw string `scanf`.

The important habit is not just "use `fgets`." It is:

- read into a fixed-size buffer
- check whether the read worked
- remove the trailing newline when it is present
- detect when the input did not fit
- discard the rest of an oversized line before reading again

Here is a reusable pattern:

```c
#include <stdio.h>
#include <string.h>

typedef enum
{
  READ_LINE_OK,
  READ_LINE_TOO_LONG,
  READ_LINE_EOF,
  READ_LINE_ERROR
} ReadLineResult;

static void discard_remaining_line(FILE *stream)
{
  int ch;

  while ((ch = fgetc(stream)) != '\n' && ch != EOF)
  {
  }
}

static ReadLineResult read_line(FILE *stream, char *buffer, size_t size)
{
  if (size == 0)
  {
    return READ_LINE_ERROR;
  }

  if (fgets(buffer, size, stream) == NULL)
  {
    return feof(stream) ? READ_LINE_EOF : READ_LINE_ERROR;
  }

  size_t newline = strcspn(buffer, "\n");

  if (buffer[newline] == '\n')
  {
    buffer[newline] = '\0';
    return READ_LINE_OK;
  }

  int ch = fgetc(stream);

  if (ch == '\n')
  {
    return READ_LINE_OK;
  }

  if (ch == EOF)
  {
    return ferror(stream) ? READ_LINE_ERROR : READ_LINE_OK;
  }

  discard_remaining_line(stream);
  return READ_LINE_TOO_LONG;
}

int main(void)
{
  char name[32];

  printf("Name: ");

  switch (read_line(stdin, name, sizeof(name)))
  {
    case READ_LINE_OK:
      printf("Hello, %s\n", name);
      return 0;

    case READ_LINE_TOO_LONG:
      printf("Name is too long\n");
      return 1;

    case READ_LINE_EOF:
      printf("No input\n");
      return 1;

    case READ_LINE_ERROR:
      perror("stdin");
      return 1;
  }

  return 1;
}
```

What is happening:

- `name` is a fixed-size character buffer
- `sizeof(name)` tells `fgets` how much room it has
- `fgets` keeps the newline if there is room
- `strcspn` finds the newline so it can be replaced with `'\0'`
- if there is no newline, the next character decides whether the input exactly filled the buffer or was too long
- if the input was too long, the rest of the line is discarded
- `read_line` separates successful input, input that was too long, end-of-file, and read errors

For quick one-off programs, this may feel like a lot. For real code, the value is that the caller does not accidentally continue with half a line still waiting in the input stream.

## Working with files

C uses `FILE *` for file handles.

```c
#include <stdio.h>

int main(void)
{
  FILE *file = fopen("notes.txt", "r");

  if (file == NULL)
  {
    perror("notes.txt");
    return 1;
  }

  char line[256];

  while (fgets(line, sizeof(line), file) != NULL)
  {
    printf("%s", line);
  }

  fclose(file);
}
```

Core rules:

- `fopen` can fail, so check for `NULL`
- `perror` prints a useful error message based on `errno`
- `fgets` reads one line at a time
- `fclose` releases the file handle

## Error handling

C does not throw exceptions. Most errors show up through return values.

The habit is simple:

```c
if (something_failed)
{
  handle_error();
  return 1;
}
```

Common patterns:

- functions return `NULL` for failed pointers
- functions return `-1` for failed integers
- functions return `0` for success in some APIs
- functions return nonzero for failure in other APIs

Read the docs for each function to know which convention it uses, and check the return value every time.

## Safer strings

C strings are just character arrays ending in `'\0'`.

That means string functions can write past the end of a buffer if they are used carelessly.

This is risky:

```c
char name[8];
strcpy(name, "Ron Barrantes");
```

`name` does not have enough room.

A safer pattern is to track the buffer size:

```c
#include <stdio.h>

int main(void)
{
  char name[8];

  snprintf(name, sizeof(name), "%s", "Ron Barrantes");

  printf("%s\n", name);
}
```

`snprintf` knows the size of the destination buffer. The output may be truncated, but it should not overflow the buffer.

`snprintf` still depends on getting the size right. Pass the wrong size and it can overflow too.

## `const` and pointers

`const` with pointers can look strange at first.

```c
const int *a;
int * const b = NULL;
const int * const c = NULL;
```

Read it like this:

- `const int *a`: pointer to a constant int; the pointer can move, but the value cannot be changed through it
- `int * const b`: constant pointer to an int; the value can change, but the pointer cannot move
- `const int * const c`: constant pointer to a constant int

This matters because function parameters use this to communicate intent.

```c
void print_name(const char *name)
{
  printf("%s\n", name);
}
```

`print_name` promises not to modify the string through `name`.

## Fixed-width integer types

Plain `int`, `long`, and `short` have sizes that can vary by platform.

When exact sizes matter, C provides `stdint.h`.

```c
#include <inttypes.h>
#include <stdint.h>
#include <stdio.h>

int main(void)
{
  int32_t score = 100;
  uint8_t byte = 255;

  printf("score: %" PRId32 "\n", score);
  printf("byte: %" PRIu8 "\n", byte);
}
```

Useful types:

- `int8_t`, `int16_t`, `int32_t`, `int64_t`
- `uint8_t`, `uint16_t`, `uint32_t`, `uint64_t`
- `size_t` for sizes and indexes

Use them when the exact size matters, like file formats, network protocols, or bit flags. Plain `int` is fine for everyday counters.

When printing the fixed-width integer types, `inttypes.h` provides matching format macros like `PRId32` and `PRIu8`.

## Header guards

Headers can be included more than once. Header guards prevent duplicate declarations.

```c
// math_helpers.h
#ifndef MATH_HELPERS_H
#define MATH_HELPERS_H

int add(int a, int b);

#endif
```

The pattern:

- if this header has not been included yet, define its marker
- include the declarations
- if it shows up again, skip it

Some projects use `#pragma once`, but include guards are standard C and always safe.

## Multiple files

Larger C programs split declarations (`.h`) from implementation (`.c`).

```c
// math_helpers.h
#ifndef MATH_HELPERS_H
#define MATH_HELPERS_H

int add(int a, int b);

#endif
```

```c
// math_helpers.c
#include "math_helpers.h"

int add(int a, int b)
{
  return a + b;
}
```

```c
// main.c
#include <stdio.h>
#include "math_helpers.h"

int main(void)
{
  printf("%d\n", add(2, 3));
}
```

Compile them together:

```bash
gcc -Wall -Wextra -pedantic main.c math_helpers.c -o main
```

## A tiny Makefile

Typing compile commands over and over gets old fast.

```make
CC = gcc
CFLAGS = -Wall -Wextra -pedantic

main: main.c math_helpers.c math_helpers.h
	$(CC) $(CFLAGS) main.c math_helpers.c -o main

clean:
	rm -f main
```

Then run:

```bash
make
```

Important detail: the indentation under `main` and `clean` must be a tab, not spaces.

## Debugging tools

Compile with debug symbols:

```bash
gcc -g -Wall -Wextra -pedantic main.c -o main
```

Use sanitizers while learning:

```bash
gcc -g -Wall -Wextra -pedantic -fsanitize=address,undefined main.c -o main
```

What this helps catch:

- out-of-bounds reads and writes
- use after free
- double free
- undefined behavior
- some bad pointer operations

On Linux, Valgrind is also useful:

```bash
valgrind ./main
```

On macOS, AddressSanitizer is usually the better first tool.

## Practice projects

Here is a good practice path:

1. Hello program with command line arguments
2. Number guessing game using `fgets`
3. File line counter
4. Word counter
5. Dynamic array of integers
6. String builder
7. Linked list
8. Hash table
9. Tiny test runner
10. Tiny shell that reads commands and exits on `quit`

For every project:

- compile with warnings
- check return values
- run with sanitizers
- pair every `malloc` with a matching `free`
- keep `.h` and `.c` files organized

## What C teaches

Beyond the syntax, C teaches:

- data representation
- memory lifetime
- ownership
- compilation
- linking
- interfaces
- careful error handling
- respect for undefined behavior
