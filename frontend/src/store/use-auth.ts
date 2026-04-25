import { create } from "zustand";
import { devtools } from "zustand/middleware";

type AuthState = {
  editable: boolean;
};

type AuthActions = {
  setEditable: (editable: boolean) => void;
};

export type AuthStore = AuthActions & AuthState;

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set) => ({
      editable: false,
      setEditable: (editable) => set({ editable }),
    }),
    { name: "AUTH_STORE" }
  )
);
