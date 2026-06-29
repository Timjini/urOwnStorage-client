import { storage } from "@/entities/storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AuthSlice, createAuthSlice } from "./authSlice";

type StoreState = AuthSlice;

export const useAppStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => storage),
    },
  ),
);
