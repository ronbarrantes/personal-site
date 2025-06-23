import { create } from "zustand";
import { devtools } from "zustand/middleware";

type AuthState = {
  isAuth: boolean;
  editable: boolean;
};

type AuthActions = {
  setIsAuth: (isAuth: boolean) => void;
  setEditable: (editable: boolean) => void;
};

export type AuthStore = AuthActions & AuthState;

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set) => ({
      isAuth: false,
      editable: false,
      setIsAuth: (isAuth) =>
        set(() => (isAuth ? { isAuth } : { isAuth, editable: false })),
      setEditable: (editable) => set({ editable }),
    }),
    { name: "AUTH_STORE" }
  )
);
