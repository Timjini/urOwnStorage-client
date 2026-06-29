import { StateCreator } from "zustand";
import { IAuth } from "../models/auth";

export interface AuthSlice {
  auth: IAuth | null;
  setAuth: (authData: IAuth) => void;
  logout: () => void;
}

export const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (
  set,
) => ({
  auth: null,
  setAuth: (authData) => set({ auth: authData }),
  logout: () => {
    set({ auth: null });
  },
});
