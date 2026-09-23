type MainLoginAuthenticatedCardProps = {
  isLoading: boolean;
  onLogout: () => void;
  onGoHome: () => void;
};

export const MainLoginAuthenticatedCard = ({
  isLoading,
  onLogout,
  onGoHome,
}: MainLoginAuthenticatedCardProps) => {
  return (
    <div className="login-form">
      <p>
        You&apos;re signed in. You can add, edit and delete Now updates from the
        home page.
      </p>
      <div className="ctas">
        <button type="button" className="btn" onClick={onGoHome}>
          ← Home
        </button>
        <button
          type="button"
          className="btn o"
          onClick={onLogout}
          disabled={isLoading}
        >
          {isLoading ? "Signing out…" : "Sign out"}
        </button>
      </div>
    </div>
  );
};
