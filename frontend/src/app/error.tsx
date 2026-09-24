"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="site">
      <main id="main">
        <div className="sheet">
          <div className="cell c-4 label vio">
            <span className="n">Error</span>
            <h1>Something went wrong.</h1>
            <p>The page hit an unexpected error.</p>
          </div>
          <div className="cell c-8">
            <button className="btn" onClick={reset} type="button">
              Try again
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
