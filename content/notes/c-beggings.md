---
title: Basics of C
date: 2023-07-08T11:00:00.000Z
# image: https://upload.wikimedia.org/wikipedia/commons/a/af/Cara_de_quem_caiu_do_caminh%C3%A3o..._%28cropped%29.jpg
type: Note
tags:
  - C
---

## WTF is this??

Soooo... Here is the deal! I am an experienced programmer, but, as of July 2023, I very new to C. Hence the reason for me writing this note.
This right here is a vague summary based on the article _[The C Beginner's Handbook: Learn C Programming Language basics in just a few hours](https://www.freecodecamp.org/news/the-c-beginners-handbook)_ by [Flavio Copes](https://flaviocopes.com/) as well as the auto suggestion from github copilot. lol!
So if you want the real deal article with the actual knowledge, go read the article, but if you want some dirty cliff notes, you're welcome to chill here for a bit.
I hope this help you as much as it is helping me.

## Why C?

I've been wanting to learn a low level language for years now but I just haven't had the time (I've been doing too much [React](https://react.dev) recently)! At first, I thought about learing _c++_ and since I didn't really know what tf I was doing, I figured tackling some [leetcode](https://leetcode.com) challenges would at least scratch that itch a little.

This plan was going great until I ran across a video on youtube by [_Eskil Steenberg_](https://www.youtube.com/@eskilsteenberg) called [How I program C](https://www.youtube.com/watch?v=443UNeGrFoM) and the way he talked about _c_ very much resonated with me and with my belief about programming. So I became inspired to first learn _c_, and then go back and tackle _c++_, that or _rust_.

**With that out of the way, here we go!**

## Basic hello world

A basic c program looks like this:

```c
#include <stdio.h>

int main(void)
{
    printf("Hello, world!\n");
}
```

Every c program starts with `#include <stdio.h>` which includes the standard input and output library.
Every c program has a main function which is `int main(void)`.
The `main()` function is the entry point for a C program.
Sometimes a c program `return 0` at the end but it is not necessary.
Every line of code in c ends with a semicolon `;`.

## Compiling

To compile a c program you need to have a c compiler installed on your computer.
You can use `gcc` to compile a c program.

```bash
gcc hello.c -o hello
```

Instructions of how to download and install `gcc` can be found [here](https://gcc.gnu.org/install/index.html).

## Variables and Types

There are a bunch of types in c, they all have different sizes and they are:

- `char`: character and it's size is 1 byte
- `int`: integer number (signed) and it's size is 4 bytes
- `short`: short integer number (signed) and it's size is 2 bytes
- `long`: long integer number (signed) and it's size is 8 bytes
- `float`: floating point number and it's size is 4 bytes
- `double`: double floating point number and it's size is 8 bytes
- `long double`: long double floating point number and it's size is 16 bytes
- `bool`: boolean (bool requires including `stdbool.h` to work) and it's size is 1 byte
- `void`: nothing and it's size is 1 byte

```c
#include <stdio.h>

int main(void)
{
  printf("char size: %lu bytes\n", sizeof(char)); // 1 byte
  printf("int size: %lu bytes\n", sizeof(int)); // 4 bytes
  printf("short size: %lu bytes\n", sizeof(short)); // 2 bytes
  printf("long size: %lu bytes\n", sizeof(long)); // 8 bytes
  printf("float size: %lu bytes\n", sizeof(float)); // 4 bytes
  printf("double size: %lu bytes\n", sizeof(double)); // 8 bytes
  printf("long double size: %lu bytes\n", sizeof(long double)); // 16 bytes
}
```

The sizeof operator returns the size of a type or a variable in bytes.

## Constants

There are two types of constants in c:

- `const`: a constant that can be used in the whole program
- `#define`: a constant that can be used in the whole program

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

There are a bunch of operators in c, they are:

Normal math operators:

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
- Bitwise operators:

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

There are three types of loops in c:

- `for`: for loop
- `while`: while loop
- `do while`: do while loop (it is like while loop but it runs at least once, almost never used)

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

To manipulate strings you can use the `string.h` library.
which contains functions such as

- `strlen()`: returns the length of a string
- `strcpy()`: copies a string to another string
- `strcat()`: concatenates two strings
- `strcmp()`: compares two strings

## Pointers

A pointer is a variable that stores the address of another variable.
Probably one of the most confusing things in c.
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
  printf("b: %p\n", b); // 0x7ffeeb0b4a3c
  printf("*b: %d\n", *b); // 10
  printf("&a: %p\n", &a); // 0x7ffeeb0b4a3c
  printf("&b: %p\n", &b); // 0x7ffeeb0b4a30
}
```

An array is just a pointer to the first element of the array.

```c
#include <stdio.h>

int main(void)
{
  int a[10] = {0,1,2,3,4,5,6,7,8,9};
  int *b = a;

  printf("a: %p\n", a); // 0x7ffeeb0b4a30
  printf("b: %p\n", b); // 0x7ffeeb0b4a30
  printf("a[0]: %d\n", a[0]); // 0
  printf("b[0]: %d\n", b[0]); // 0
  printf("*a: %d\n", *a); // 0
  printf("*b: %d\n", *b); // 0
}
```

And could be iterated over using pointer arithmetic.

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

```c
#include <stdio.h>

typedef enum
{
  true,
  false
} BOOLEAN;

int main(void)
{
  BOOLEAN isTrue = true;
  printf("isTrue: %d\n", isTrue); // 0
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

Structures are passed by copy

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

  printf("size of today: %lu\n", sizeof(today)); // 4
  printf("day: %d\n", today.day); // 26
  printf("month: %d\n", today.month); // 4
  printf("year: %d\n", today.year); // 2020
}

```

## Command line parameters

Sometimes you want to pass parameters to your program when you run it.
In this case instead of using `int main(void)` you can use `int main(int argc, char *argv[])`.

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
- `#pragma` - implementation defined directive
  and more...

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

const int DEBUG = 0;

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
