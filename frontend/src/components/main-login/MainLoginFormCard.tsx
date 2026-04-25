import type { FormEvent } from "react";

type MainLoginFormCardProps = {
  username: string;
  password: string;
  isLoading: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onUsernameChange: (username: string) => void;
  onPasswordChange: (password: string) => void;
};

export const MainLoginFormCard = ({
  username,
  password,
  isLoading,
  onSubmit,
  onUsernameChange,
  onPasswordChange,
}: MainLoginFormCardProps) => {
  return (
    <div className="box w-full max-w-sm p-8">
      <div className="tag mb-4">FILE_00 // ACCESS</div>
      <h1 className="smash mb-8 text-6xl">
        ENTER
        <span style={{ color: "var(--accent)" }}>.</span>
      </h1>
      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label htmlFor="username" className="tag mb-2 block">
            USER_ID
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(event) => onUsernameChange(event.target.value)}
            placeholder="IDENTIFIER..."
            autoComplete="username"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="tag mb-2 block">
            PASSKEY
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => onPasswordChange(event.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
        </div>
        <button
          type="submit"
          className="btn w-full justify-center"
          disabled={isLoading}
        >
          {isLoading ? "CHECKING..." : "ENTER →"}
        </button>
      </form>
    </div>
  );
};
