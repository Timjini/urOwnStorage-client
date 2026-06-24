import { StateCreator } from "zustand";

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
}

export interface AuthActions {
  setCredentials: (user: User, token: string) => void;
  clearCredentials: () => void;
}

export type AuthSlice = AuthState & AuthActions;

export const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (
  set,
) => ({
  // Initial State
  user: null,
  accessToken: null,
  isAuthenticated: false,

  // Actions
  setCredentials: (user, token) =>
    set({
      user,
      accessToken: token,
      isAuthenticated: true,
    }),

  clearCredentials: () =>
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
    }),
});
