---
title: Modern React Hooks
description: "A practical guide to the React hooks that matter now: state, refs, memoization, transitions, deferred values, IDs, and when to stop reaching for useEffect."
date: 2026-07-10T16:05:00.000Z
tags:
  - React
  - hooks
  - frontend
---

## Why this guide exists

React hooks have been around long enough that the basic list is easy to memorize.

The harder part is knowing which hooks still matter in modern React, which ones are overused, and how they fit into the way people build apps now.

This guide is for that second part.

The short version:

- `useState` is still the default for local state
- `useReducer` helps when state transitions have structure
- `useRef` stores mutable values without causing rerenders
- `useMemo` and `useCallback` are tools, not default habits
- `useEffect` is still useful, but people reach for it way too often
- `useTransition` and `useDeferredValue` help with perceived responsiveness
- `useId` solves a real accessibility problem cleanly
- server components, framework data APIs, and better architecture should remove some old hook-heavy patterns

## The mental model first

A useful way to think about hooks:

- some hooks store data
- some hooks synchronize with something outside React
- some hooks help with performance
- some hooks help with UX under load

That alone clears up a lot of confusion.

If a piece of logic is purely derived from props and state, it usually should not live in an effect.

If a value needs to survive renders but should not trigger a rerender, it probably belongs in a ref.

If an update is correct but feels slow, it might be a transition problem instead of a state problem.

## `useState`

`useState` is still the first hook to reach for.

```tsx
import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount((current) => current + 1)}>
      Count: {count}
    </button>
  );
}
```

A few good habits:

- use the functional updater when the next state depends on the previous state
- keep local UI state local
- do not turn every variable into state

Bad local state usually looks like this:

- storing values that can be derived directly from other state
- splitting one concept into too many separate state variables
- pushing server state into local component state unnecessarily

## `useReducer`

`useReducer` is useful when state changes have rules.

It shines when:

- several fields change together
- transitions depend on the current state
- the update logic is easier to read as named actions

```tsx
import { useReducer } from "react";

type State = {
  name: string;
  email: string;
  submitting: boolean;
};

type Action =
  | { type: "change_name"; value: string }
  | { type: "change_email"; value: string }
  | { type: "submit_start" }
  | { type: "submit_finish" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "change_name":
      return { ...state, name: action.value };
    case "change_email":
      return { ...state, email: action.value };
    case "submit_start":
      return { ...state, submitting: true };
    case "submit_finish":
      return { ...state, submitting: false };
    default:
      return state;
  }
}

export function SignupForm() {
  const [state, dispatch] = useReducer(reducer, {
    name: "",
    email: "",
    submitting: false,
  });

  return (
    <form>
      <input
        value={state.name}
        onChange={(event) =>
          dispatch({ type: "change_name", value: event.target.value })
        }
      />
      <input
        value={state.email}
        onChange={(event) =>
          dispatch({ type: "change_email", value: event.target.value })
        }
      />
      <button
        type="button"
        disabled={state.submitting}
        onClick={() => dispatch({ type: "submit_start" })}
      >
        Submit
      </button>
    </form>
  );
}
```

If `useReducer` makes the code more ceremonial without making the logic clearer, go back to `useState`.

## `useRef`

`useRef` gives you a stable object whose `.current` value can change without rerendering the component.

That makes it useful for two main jobs:

- pointing at DOM nodes
- storing mutable values that should survive renders

```tsx
import { useEffect, useRef } from "react";

export function SearchInput() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return <input ref={inputRef} placeholder="Search" />;
}
```

And for mutable data:

```tsx
import { useRef } from "react";

export function ClickTracker() {
  const totalClicks = useRef(0);

  return (
    <button
      onClick={() => {
        totalClicks.current += 1;
        console.log(totalClicks.current);
      }}
    >
      Track clicks
    </button>
  );
}
```

Use a ref when you need persistence without rendering.

Do not use a ref to hide state that the UI should actually respond to.

## `useEffect`

This is the hook people misuse most.

The best way to think about `useEffect` is:

**it synchronizes your component with something outside React**

That includes things like:

- subscriptions
- timers
- DOM APIs
- analytics
- manual event listeners
- imperative libraries

A reasonable effect:

```tsx
import { useEffect } from "react";

export function PageView({ route }: { route: string }) {
  useEffect(() => {
    window.gtag?.("event", "page_view", { route });
  }, [route]);

  return null;
}
```

An effect that probably should not exist:

```tsx
const [fullName, setFullName] = useState("");

useEffect(() => {
  setFullName(`${firstName} ${lastName}`);
}, [firstName, lastName]);
```

That value is derived. It should usually just be:

```tsx
const fullName = `${firstName} ${lastName}`;
```

That shift matters a lot. Modern React code often gets better by deleting effects, not adding them.

### A simple rule for effects

Ask this before writing one:

- am I synchronizing with something external?

If the answer is no, there is a good chance the effect is unnecessary.

## `useMemo`

`useMemo` memoizes a computed value.

```tsx
import { useMemo, useState } from "react";

export function ProductList({ products }: { products: string[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const lower = query.toLowerCase();
    return products.filter((product) =>
      product.toLowerCase().includes(lower),
    );
  }, [products, query]);

  return (
    <>
      <input value={query} onChange={(event) => setQuery(event.target.value)} />
      <ul>
        {filtered.map((product) => (
          <li key={product}>{product}</li>
        ))}
      </ul>
    </>
  );
}
```

Good reasons to use it:

- the computation is actually expensive
- you need stable object identity for another optimization
- profiling shows the work matters

Bad reasons to use it:

- it feels more professional
- you want to wrap every derived value just in case
- the computation is trivial

A lot of `useMemo` in real apps is defensive clutter.

## `useCallback`

`useCallback` memoizes a function reference.

```tsx
import { useCallback, useState } from "react";

export function TodoInput() {
  const [value, setValue] = useState("");

  const reset = useCallback(() => {
    setValue("");
  }, []);

  return (
    <>
      <input value={value} onChange={(event) => setValue(event.target.value)} />
      <button onClick={reset}>Reset</button>
    </>
  );
}
```

It is useful when:

- you pass a callback into a memoized child component
- a hook depends on stable callback identity
- profiling shows rerenders caused by callback churn matter

It is not automatically useful just because a function is declared inside a component.

If no optimization depends on the stable function identity, `useCallback` may add noise without helping anything.

## `useContext`

`useContext` is still the simple way to share values without threading props through every level.

```tsx
import { createContext, useContext } from "react";

const ThemeContext = createContext("light");

export function ThemeLabel() {
  const theme = useContext(ThemeContext);
  return <span>Theme: {theme}</span>;
}
```

Good fits:

- theme
- auth/session information
- feature flags
- localization
- app-level preferences

Be careful using context for fast-changing or very large state trees. That can create broad rerender patterns unless the data is split thoughtfully.

## `useId`

`useId` is one of the cleanest small hooks React added.

It helps generate stable IDs for accessibility wiring.

```tsx
import { useId } from "react";

export function EmailField() {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>Email</label>
      <input id={id} type="email" />
    </div>
  );
}
```

This is a much nicer answer than sprinkling random IDs by hand.

## `useTransition`

`useTransition` is about perceived responsiveness.

It lets you mark some state updates as non-urgent.

```tsx
import { useState, useTransition } from "react";

export function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  function handleChange(nextValue: string) {
    setQuery(nextValue);

    startTransition(() => {
      setResults(expensiveSearch(nextValue));
    });
  }

  return (
    <>
      <input value={query} onChange={(event) => handleChange(event.target.value)} />
      {isPending ? <p>Updating results...</p> : null}
      <ul>
        {results.map((result) => (
          <li key={result}>{result}</li>
        ))}
      </ul>
    </>
  );
}

function expensiveSearch(value: string) {
  return [value].filter(Boolean);
}
```

The idea:

- keep typing urgent
- let the heavier update happen as a transition

This is a UX hook. It does not make slow code magically fast, but it can make the interface feel much better.

## `useDeferredValue`

`useDeferredValue` helps when one value updates quickly, but some part of the UI can lag slightly behind.

```tsx
import { useDeferredValue, useMemo, useState } from "react";

export function DeferredSearch({ items }: { items: string[] }) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const filtered = useMemo(() => {
    const lower = deferredQuery.toLowerCase();
    return items.filter((item) => item.toLowerCase().includes(lower));
  }, [items, deferredQuery]);

  return (
    <>
      <input value={query} onChange={(event) => setQuery(event.target.value)} />
      <ul>
        {filtered.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
}
```

This keeps the input responsive while allowing the expensive UI work to trail a little.

## The hooks modern apps use less directly

Modern React apps, especially in frameworks like Next.js, often rely less on some older client-side patterns.

Why?

- server components move some work off the client
- framework data APIs replace effect-based fetch code
- mutations are often handled through dedicated libraries or server actions
- routing and caching are more framework-aware than they used to be

That does not mean hooks matter less.

It means the **shape** of hook usage changes.

You often want fewer of these:

- fetch-in-effect boilerplate
- loading state duplicated everywhere
- derived state stored in local state
- giant context objects for everything

And more of these:

- focused UI state
- deliberate effects
- framework-native data flow
- transitions for responsiveness
- accessibility hooks like `useId`

## Common hook mistakes

### 1. Using `useEffect` for derived state

This is probably the most common one.

If the value can be calculated during render, calculate it during render.

### 2. Memoizing everything

`useMemo` and `useCallback` are not badges of sophistication.

They are tradeoffs.

### 3. Storing too much in context

Context is great for app-level shared values.

It is not automatically the right answer for every state problem.

### 4. Using refs to dodge rendering

A ref is not a secret state store.

If the UI depends on it, it probably belongs in state.

### 5. Writing effects without cleanup

If an effect subscribes to something, starts a timer, or attaches a listener, cleanup usually matters.

```tsx
useEffect(() => {
  const id = window.setInterval(() => {
    console.log("tick");
  }, 1000);

  return () => {
    window.clearInterval(id);
  };
}, []);
```

## A practical decision guide

When I am deciding which hook to use, this is the quick filter:

- need local UI state? `useState`
- need structured state transitions? `useReducer`
- need a mutable value without rerendering? `useRef`
- need shared app-level value? `useContext`
- need to sync with something outside React? `useEffect`
- need stable IDs for accessibility? `useId`
- need better responsiveness for non-urgent updates? `useTransition`
- need to let expensive UI lag behind input a bit? `useDeferredValue`
- need memoization because profiling says it matters? `useMemo` or `useCallback`

That is usually enough.

## A healthy modern React posture

Modern React is not about using more hooks.

It is about using fewer hooks more intentionally.

Good React code today usually has these qualities:

- state lives close to where it is used
- effects are rare and clearly justified
- derived values are derived, not stored
- performance hooks are used for reasons, not vibes
- responsiveness is treated as part of the design
- accessibility is not bolted on at the end

If a component feels confusing, one of the fastest ways to simplify it is to ask:

- which state is real?
- which values are derived?
- which effects are actually external synchronization?
- which memoization is doing real work?

That question set catches a lot.

## What to practice next

If you want to get sharper with modern hooks, build small examples around these situations:

1. a searchable list using `useState`
2. a form flow using `useReducer`
3. a focusable modal using `useRef`
4. a settings provider using `useContext`
5. an analytics or timer example using `useEffect`
6. a large filtered list using `useDeferredValue`
7. a slow tab switch using `useTransition`
8. accessible form fields using `useId`

That mix is more useful than memorizing every hook definition in isolation.

## Final thought

The modern React move is not "which hook can I add?"

It is closer to:

- can I keep this logic simple?
- can I remove unnecessary effects?
- can I keep the UI responsive?
- can I make the state model obvious?

If the answer is yes, the hook choices usually get a lot easier.
