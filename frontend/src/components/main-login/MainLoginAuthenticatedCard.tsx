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
    <div className="box w-full max-w-sm p-8">
      <div className="tag mb-4">STATUS // AUTHENTICATED</div>
      <h1 className="smash mb-6 text-6xl">
        WELCOME
        <span style={{ color: "var(--accent)" }}>.</span>
      </h1>
      <p className="mb-8 text-sm leading-relaxed">
        YOU HAVE ACCESS. ALL SYSTEMS GO.
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          className="btn"
          onClick={onLogout}
          disabled={isLoading}
        >
          {isLoading ? "SIGNING OUT..." : "SIGN OUT"}
        </button>
        <button type="button" className="btn btn-alt" onClick={onGoHome}>
          ← HOME
        </button>
      </div>
    </div>
  );
};
