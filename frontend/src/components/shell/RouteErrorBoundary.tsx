import { isRouteErrorResponse, useRouteError } from "react-router";

export const RouteErrorBoundary = () => {
  const error = useRouteError();

  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : "Something went wrong while loading this page.";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-6 text-center text-[var(--ink)]">
      <div>
        <p className="text-sm tracking-[0.2em]">UNEXPECTED ERROR</p>
        <h1 className="mt-2 text-2xl md:text-3xl">{message}</h1>
        <p className="mt-3 text-sm opacity-80">Please refresh and try again.</p>
      </div>
    </div>
  );
};
