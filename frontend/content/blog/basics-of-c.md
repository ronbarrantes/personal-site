---
title: Basics of C
description: "Rough notes from learning C: compiling, types, memory, pointers, structs, and the preprocessor."
date: 2026-05-01T10:00:15.000Z
# image: https://upload.wikimedia.org/wikipedia/commons/a/af/Cara_de_quem_caiu_do_caminh%C3%A3o..._%28cropped%29.jpg
tags:
  - C
  - learning
---

## Why this exists

This post is for developers who already know how to program and want a fast, practical entry point into C.

It is not a complete textbook. It is a compact guide to the concepts that matter early: compilation, memory, pointers, structs, and the parts of the language that shape how C code actually behaves.

For a deeper or more formal treatment, the original article and the language documentation are better sources. This post is meant to be the useful first pass.

## What is C?

C is a general-purpose programming language that is extremely popular, simple, and flexible.

At a practical level, C is worth learning because it exposes the mechanics that higher-level languages often hide. Data layout, memory lifetime, compilation, and undefined behavior are all much more visible here.

## Why C?

For developers coming from JavaScript, Python, or Go, C is useful partly because it forces a stricter mental model. The language does not offer much protection from bad assumptions, which makes it a strong place to learn what values, pointers, arrays, and memory are really doing.

The video [How I program C](https://www.youtube.com/watch?v=443UNeGrFoM) by [_Eskil Steenberg_](https://www.youtube.com/@eskilsteenberg) is a strong companion piece for anyone trying to learn the language with more intention.

_With that out of the way, here we go!_

## What matters most

A useful foundation in C is not just syntax. The real goal is the mental model:

- how a `.c` file becomes a program
- what the compiler checks and what it does not check
- how values live in memory
- how pointers point at memory
- how arrays and strings are represented
- how headers and source files work together
- how allocation, ownership, and cleanup work
- what undefined behavior is and why it matters

That is the stuff that makes C feel different from higher-level languages.

## Basic hello world

A basic C program looks like this:

```c
#include <stdio.h>

int main(void)
{
    printf("Hello, world!\n");
}
```

Every C program starts with `#include <stdio.h>`, which includes the standard input/output library.
Every C program has a main function, which is `int main(void)`.
The `main()` function is the entry point for a C program.
Sometimes a C program returns `0` at the end, but it is not necessary in this tiny example.
Every statement in C ends with a semicolon `;`.

## Compiling

To compile a C program, you need a C compiler installed on your computer.
You can use `gcc`:

```bash
gcc hello.c -o hello
```

Instructions for downloading and installing `gcc` can be found [here](https://gcc.gnu.org/install/index.html).

When learning, compile with warnings turned on:

```bash
gcc -Wall -Wextra -pedantic hello.c -o hello
```

- `-Wall` turns on a useful set of warnings
- `-Wextra` turns on more warnings
- `-pedantic` asks the compiler to complain about non-standard C

Warnings are not decoration in C. Treat them like bugs until you know exactly why they are safe.

## The build pipeline

A C program goes through a few steps before it becomes an executable:

- preprocessing: handles `#include`, `#define`, and other preprocessor directives
- compiling: turns C source into object code
- linking: combines object files and libraries into one executable

That is why this works:

```bash
gcc main.c helper.c -o app
```

`main.c` and `helper.c` are compiled, then linked together into `app`.

## Variables and Types

There are a bunch of types in C. Their exact sizes can depend on the platform and compiler, so do not blindly memorize the numbers. Use `sizeof` when it matters.

Common sizes on modern 64-bit systems look something like this:

- `char`: character, usually 1 byte
- `int`: signed integer, commonly 4 bytes
- `short`: signed short integer, commonly 2 bytes
- `long`: signed long integer, commonly 8 bytes
- `float`: floating-point number, commonly 4 bytes
- `double`: double-precision floating-point number, commonly 8 bytes
- `long double`: extended-precision floating-point number, commonly 16 bytes
- `bool`: boolean, requires `stdbool.h`, commonly 1 byte
- `void`: no value

```c
#include <stdio.h>

int main(void)
{
  printf("char size: %zu bytes\n", sizeof(char)); // 1 byte
  printf("int size: %zu bytes\n", sizeof(int)); // often 4 bytes
  printf("short size: %zu bytes\n", sizeof(short)); // often 2 bytes
  printf("long size: %zu bytes\n", sizeof(long)); // often 8 bytes on 64-bit Unix
  printf("float size: %zu bytes\n", sizeof(float)); // often 4 bytes
  printf("double size: %zu bytes\n", sizeof(double)); // often 8 bytes
  printf("long double size: %zu bytes\n", sizeof(long double)); // platform-dependent
}
```

The `sizeof` operator returns the size of a type or variable in bytes.
Its result has type `size_t`, so `%zu` is the right `printf` format for it.

## Constants

There are two common ways to define constants in C:

- `const`: creates a typed read-only variable
- `#define`: creates a preprocessor macro

```c
#include <stdio.h>

int main(void)
{
  const int a = 10;
  printf("a: %d\n", a); // 10

  #define b 20
  printf("b: %d\n", b); // 20
}
```

## Operators

C has a bunch of operators.

Math operators:

- `+`: addition
- `-`: subtraction
- `*`: multiplication
- `/`: division
- `++`: increment by 1
- `--`: decrement by 1
- `%`: modulus

Logical operators:

- `&&`: and
- `||`: or
- `!`: not

Bitwise operators:

- `&`: bitwise and
- `|`: bitwise or
- `^`: bitwise xor
- `~`: bitwise not
- `>>`: right shift
- `<<`: left shift

Comparison operators:

- `==`: equal
- `!=`: not equal
- `>`: greater than
- `<`: less than
- `>=`: greater than or equal
- `<=`: less than or equal

Assignment operators:

- `=`: assignment
- `+=`: addition assignment
- `-=`: subtraction assignment
- `*=`: multiplication assignment
- `/=`: division assignment
- `%=`: modulus assignment
- `&=`: bitwise and assignment
- `|=`: bitwise or assignment
- `^=`: bitwise xor assignment
- `>>=`: right shift assignment
- `<<=`: left shift assignment

## Conditionals

There are two types of conditionals in c:

- `if`: if statement
- `switch`: switch statement

## Ternary operator

- `?:`: ternary, example `a > b ? a : b`

```c
#include <stdio.h>

int main(void)
{
  int a = 10;
  int b = 20;

  if (a > b)
  {
    printf("a is greater than b\n");
  }
  else if (a < b)
  {
    printf("a is less than b\n");
  }
  else
  {
    printf("a is equal to b\n");
  }

  switch (a)
  {
    case 10:
      printf("a is 10\n");
      break;
    case 20:
      printf("a is 20\n");
      break;
    default:
      printf("a is not 10 or 20\n");
      break;
  }
}

```

## Loops

There are three main kinds of loops in C:

- `for`: for loop
- `while`: while loop
- `do while`: like a `while` loop, but it runs at least once

```c
#include <stdio.h>

int main(void)
{
  for (int i = 0; i < 10; i++)
  {
    printf("i: %d\n", i);
  }

  int i = 0;
  while (i < 10)
  {
    printf("i: %d\n", i);
    i++;
  }

  i = 0;
  do
  {
    printf("i: %d\n", i);
    i++;
  } while (i < 10);
}
```

If you want to break out of a loop you can use `break` and if you want to skip the rest of the loop you can use `continue`.

## Arrays

Arrays are a collection of variables of the same type.

```c
#include <stdio.h>

int main(void)
{
  int arr[10];

  for (int i = 0; i < 10; i++)
  {
    arr[i] = i;
  }

  for (int i = 0; i < 10; i++)
  {
    printf("arr[%d]: %d\n", i, arr[i]);
  }
}

```

## Strings

Strings can be represented as an array of characters.

```c
#include <stdio.h>

int main(void)
{
  char a[10] = "hello";
  char b[10] = {'h', 'e', 'l', 'l', 'o', '\0'};

  printf("a: %s\n", a); // hello
  printf("b: %s\n", b); // hello
}

```

A string is an array of characters that ends with a null character `\0`.
The last character is called a terminator.

To manipulate strings you can use the `string.h` library, which contains functions like:

- `strlen()`: returns the length of a string
- `strcpy()`: copies a string to another string
- `strcat()`: concatenates two strings
- `strcmp()`: compares two strings

## Pointers

A pointer is a variable that stores the address of another variable.
Probably one of the most confusing things in C.
An address is a location in memory.
Memory is an array of bytes.

Pointers are declared by adding a `*` after the type.
To get the address of a variable you can use the `&` operator.
To get the value of a pointer you can use the `*` operator.

```c
#include <stdio.h>

int main(void)
{
  int a = 10;
  int *b = &a;

  printf("a: %d\n", a); // 10
  printf("b: %p\n", (void *) b); // 0x7ffeeb0b4a3c
  printf("*b: %d\n", *b); // 10
  printf("&a: %p\n", (void *) &a); // 0x7ffeeb0b4a3c
  printf("&b: %p\n", (void *) &b); // 0x7ffeeb0b4a30
}
```

An array can often behave like a pointer to the first element of the array.

```c
#include <stdio.h>

int main(void)
{
  int a[10] = {0,1,2,3,4,5,6,7,8,9};
  int *b = a;

  printf("a: %p\n", (void *) a); // 0x7ffeeb0b4a30
  printf("b: %p\n", (void *) b); // 0x7ffeeb0b4a30
  printf("a[0]: %d\n", a[0]); // 0
  printf("b[0]: %d\n", b[0]); // 0
  printf("*a: %d\n", *a); // 0
  printf("*b: %d\n", *b); // 0
}
```

You can iterate over it using pointer arithmetic.

```c
#include <stdio.h>

int main(void)
{
  int a[10];

  for (int i = 0; i < 10; i++)
  {
    a[i] = i;
  }

  for (int i = 0; i < 10; i++)
  {
    printf("a[%d]: %d\n", i, *(a + i));
  }

  for(int *p = a; p < a + 10; p++)
  {
    printf("p: %d\n", *p);
  }
}
```

## Memory lifetime

C forces careful thinking about where data lives and how long it stays valid:

- automatic storage: local variables inside a function, often on the stack
- static storage: globals and `static` variables, alive for the whole program
- allocated storage: memory requested with `malloc`, alive until `free`

Example of automatic storage:

```c
int add(int a, int b)
{
  int result = a + b;
  return result;
}
```

`result` only exists while `add` is running. Returning its value is fine. Returning a pointer to `result` would be wrong because the local variable stops existing after the function returns.

## Dynamic memory

When memory size is not known until runtime, `malloc` is the standard tool.

```c
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
  int count = 5;
  int *numbers = malloc(sizeof(int) * count);

  if (numbers == NULL)
  {
    return 1;
  }

  for (int i = 0; i < count; i++)
  {
    numbers[i] = i * 2;
  }

  for (int i = 0; i < count; i++)
  {
    printf("%d\n", numbers[i]);
  }

  free(numbers);
}
```

The important rules:

- check whether `malloc` returned `NULL`
- call `free` exactly once when done
- do not use the pointer after `free`
- do not lose the pointer before freeing it

## Undefined behavior

C allows code that compiles but has no valid meaning. That is called undefined behavior.

Examples:

- reading past the end of an array
- using an uninitialized variable
- dereferencing a null pointer
- using memory after `free`
- returning a pointer to a local variable
- overflowing a signed integer

Undefined behavior is not just "maybe wrong output." The compiler is allowed to assume it never happens, which can make bugs extremely weird.

## Functions

Functions are a block of code that can be called from anywhere in the program.

```c
#include <stdio.h>

// a and b are parameters
int add(int a, int b)
{
  return a + b;
}

int main(void)
{
  int a = 10;
  int b = 20;

  // a and b are arguments
  int c = add(a, b);

  printf("c: %d\n", c); // 30
}

```

Functions have a return type and may or may not take parameters.
Functions can be declared anywhere in the program but must be defined before they are called.
Parameters can be pointers.

```c
#include <stdio.h>

// swap the values of two variables
void swap(int *a, int *b)
{
  int temp = *a;
  *a = *b;
  *b = temp;
}

int main(void)
{
  int a = 10;
  int b = 20;

  printf("a: %d | b: %d\n", a, b); // a: 10 | b: 20

  swap(&a, &b);

  printf("a: %d | b: %d\n", a, b); // a: 20 | b: 10
}
```

## Scope

There is global scope and local scope.

```c

#include <stdio.h>

int a = 10; // global scope

int main(void)
{
  int b = 20; // local scope

  printf("a: %d\n", a); // 10
  printf("b: %d\n", b); // 20
}

```

## Type Definitions

You can create your own types using `typedef`.

```c

#include <stdio.h>

typedef int NUMBER;

int main(void)
{
  NUMBER a = 10;

  printf("a: %d\n", a); // 10
}

```

## Enumerations

Enumerations are a list of named integer constants.

```c
#include <stdio.h>

enum Weekday
{
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday
};


int main(void)
{
  enum Weekday today = Monday;

  printf("today: %d\n", today); // 0
}
```

## Enumerated Types

This is how to create a named enum type. For actual booleans, `stdbool.h` is usually the better choice.

```c
#include <stdio.h>

typedef enum
{
  false,
  true
} BOOLEAN;

int main(void)
{
  BOOLEAN isTrue = true;
  printf("isTrue: %d\n", isTrue); // 1
}
```

## Structures

Structures are a collection of variables of different types.
Structures use the word `struct` to define them.

```c
#include <stdio.h>

struct Person
{
  char *name; // pointer to a string
  int age; // integer
};

// *name is a pointer because strings are arrays of characters and an array is a
// pointer to the first element of the array

int main(void)
{
  struct Person person = {"John", 20};

  printf("name: %s\n", person.name); // John
  printf("age: %d\n", person.age); // 20
}

```

Structures can be declared and defined at the same time.

```c

#include <stdio.h>

struct Person
{
  char *name;
  int age;
} john, people[10], jim = {"Jim", 30}; // john is a struct Person, people is an array of struct Person and jim is a struct Person with the name Jim and age 30

int main(void)
{
  john.name = "John";
  john.age = 20;

  printf("name: %s\n", john.name); // John
  printf("age: %d\n", john.age); // 20

  people[0].name = "John";
  people[0].age = 20;
  people[1].name = "Jane";
  people[1].age = 30;
}

```

Structures are passed by copy.

## Typedef Structures

You can create your own types using `typedef`.

```c
#include <stdio.h>

typedef struct
{
  char *name;
  int age;
} PERSON;

int main(void)
{
  PERSON person = {"John", 20};

  printf("name: %s\n", person.name); // John
  printf("age: %d\n", person.age); // 20
}

```

## Pointers to Structures

```c

#include <stdio.h>

typedef struct
{
  char *name;
  int age;
} PERSON; // PERSON is a type

int main(void)
{
  PERSON person = {"John", 20};
  PERSON *p = &person;

  printf("name: %s\n", p->name); // John
  printf("age: %d\n", p->age); // 20
}

```

## Unions

Unions are a collection of variables that share the same memory location.

```c
#include <stdio.h>

union Number
{
  int i;
  float f;
};

int main(void)
{
  union Number number;

  number.i = 10;

  printf("i: %d\n", number.i); // 10
  printf("f: %f\n", number.f); // 0.000000

  number.f = 10.5;

  printf("i: %d\n", number.i); // 1092616192
  printf("f: %f\n", number.f); // 10.500000
}

```

The difference between a union and a structure is that a union can only hold one value at a time.

## Bit Fields

Bit fields are used to store multiple values in a single byte.

```c
#include <stdio.h>

struct Date
{
  unsigned int day : 5; // 1 - 31
  unsigned int month : 4; // 1 - 12
  unsigned int year; // 1900 - 2020
};

int main(void)
{
  struct Date today = {26, 4, 2020};

  printf("size of today: %zu\n", sizeof(today)); // 4
  printf("day: %d\n", today.day); // 26
  printf("month: %d\n", today.month); // 4
  printf("year: %d\n", today.year); // 2020
}

```

## Command line parameters

Sometimes you want to pass parameters to your program when you run it.
In this case, instead of using `int main(void)`, you can use `int main(int argc, char *argv[])`.

- `argc` is the number of arguments passed to the program
- `argv` is an array of strings containing the arguments passed to the program

```c
#include <stdio.h>

// ./hello hello world
int main(int argc, char *argv[]) {
  printf("argc: %d\n", argc); // 3
  for (int i = 0; i < argc; i++) {
    printf("%s\n", argv[i]);
  }
}
```

`./hello hello world` is an example of a command line argument.

Another example is `gcc -o hello hello.c` where `-o` is an argument to the `gcc` program.

## Header files

Header files are used to share declarations between multiple files.
Header files have the `.h` extension.
They can help to make your code more modular by separating the interface from the implementation.

```c
// hello.h
void hello(void);
```

```c
// hello.c
#include <stdio.h>
#include "hello.h"

void hello(void) {
  printf("Hello, World!\n");
}
```

```c
// main.c
#include "hello.h"

int main(void) {
  hello();
}
```

When you compile your program you need to pass all the source files to the compiler.

```bash
gcc -o main main.c hello.c
```

## Preprocessor

The preprocessor is a program that runs before the compiler.
There are a few directives that the preprocessor uses to modify the source code before the compiler runs.

- `#include` - includes a header file
- `#define` - defines a macro
- `#undef` - undefines a macro
- `#ifdef` - checks if a macro is defined
- `#ifndef` - checks if a macro is not defined
- `#if` - checks if a condition is true
- `#else` - alternative for `#if`
- `#elif` - alternative for `#if`
- `#endif` - ends a conditional block
- `#error` - prints an error message
- `#pragma` - implementation-defined directive

And more...

```c
#include <stdio.h>
#define PI 3.14

int main(void)
{
  printf("PI: %f\n", PI); // 3.140000
}

```

The preprocessor replaces all occurrences of `PI` with `3.14`.

In the case below, the preprocessor will replace `DEBUG` with `0` and the compiler will see this code.

```c
#include <stdio.h>

#define DEBUG 0

int main(void) {
#if DEBUG == 0
  printf("I am NOT debugging\n");
#else
  printf("I am debugging\n");
#endif
}
```

## Macros and Symbolic Constants

Symbolic constants are used to define constants.
Macros are used to define constants and functions, which means they can take arguments.
They are defined using the `#define` directive.

```c

#include <stdio.h>
#define PI 3.14
#define AREA(r) (PI * r * r)

int main(void)
{
  printf("PI: %f\n", PI); // 3.140000
  printf("AREA: %f\n", AREA(2)); // 12.560000
}

```

## If defined

The `#if defined` directive checks if a macro is defined.

```c

#include <stdio.h>
#define VALUE 1

int main(void) {
#ifdef VALUE
  printf("Value is defined\n");
#else
  printf("Value is not defined\n");
#endif
}
```

## Predefined symbolic constants

The C language defines a few predefined symbolic constants.

- `__DATE__` - the current date as a string literal in the format "Mmm dd yyyy"
- `__TIME__` - the current time as a string literal in the format "hh:mm:ss"
- `__FILE__` - the current filename as a string literal
- `__LINE__` - the current line number as a decimal constant

```c
#include <stdio.h>

int main(void) {
  printf("Date: %s\n", __DATE__);
  printf("Time: %s\n", __TIME__);
  printf("File: %s\n", __FILE__);
  printf("Line: %d\n", __LINE__);
}
```

## What to practice next

This note covers a lot of surface area, but reading is not enough. The fastest way to get solid at C is to write small programs that force contact with memory, files, and error handling.

Good practice projects:

- write a calculator that parses command line arguments
- write a dynamic array for integers with `push`, `get`, and `free`
- write a string helper that copies, trims, and compares strings
- read a text file line by line and count words
- implement a linked list
- implement a hash table
- write tests for tiny functions
- compile every program with `-Wall -Wextra -pedantic`
- run programs with sanitizers when available

Sanitizers can catch memory bugs while learning:

```bash
gcc -Wall -Wextra -pedantic -fsanitize=address,undefined main.c -o main
```

That is not a replacement for understanding memory, but it gives much better feedback when something goes wrong.

The main things worth burning into memory:

- know who owns memory
- know when memory stops being valid
- check return values
- keep headers and source files organized
- avoid undefined behavior
- let compiler warnings teach me
