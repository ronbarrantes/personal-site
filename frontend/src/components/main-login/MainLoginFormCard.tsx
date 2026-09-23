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
    <form onSubmit={onSubmit} className="login-form" aria-labelledby="login-h">
      <div className="field">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(event) => onUsernameChange(event.target.value)}
          autoComplete="username"
          required
        />
      </div>
      <div className="field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => onPasswordChange(event.target.value)}
          autoComplete="current-password"
          required
        />
      </div>
      <button type="submit" className="btn" disabled={isLoading}>
        {isLoading ? "Checking…" : "Sign in →"}
      </button>
    </form>
  );
};
