import { create } from "zustand";
import { persist } from "zustand/middleware";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAuthSlice, AuthSlice } from "./auth.slice";

export const useAuthStore = create<AuthSlice>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
    }),
    {
      name: "auth-storage", // Unique name for the storage key
      // storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
