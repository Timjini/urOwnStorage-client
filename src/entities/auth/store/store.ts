import { storage } from "@/entities/storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AuthSlice, createAuthSlice } from "./slice";

type StoreState = AuthSlice;

// const storage = createMMKV();

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
