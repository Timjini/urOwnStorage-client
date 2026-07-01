import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createLocationSlice } from "./slice";
import { LocationSlice } from ".";

type LocationStoreState = LocationSlice;

export const useLocationStore = create<LocationStoreState>()(
  persist(
    (set, get, store) => ({
      ...createLocationSlice(set, get, store),
    }),
    {
      name: "user-location-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: (state) => {
        return () => {
          state.setHasHydrated(true);
        };
      },
    },
  ),
);
