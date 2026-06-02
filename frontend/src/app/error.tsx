"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-3xl font-bold">Something went wrong.</h1>
      <button className="rounded border px-4 py-2 font-bold" onClick={reset} type="button">
        Try again
      </button>
    </main>
  );
}
