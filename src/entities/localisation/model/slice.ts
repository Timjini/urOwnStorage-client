import { StateCreator } from "zustand";
import { LocationSlice } from ".";

export const createLocationSlice: StateCreator<LocationSlice> = (set) => ({
  latitude: null,
  longitude: null,
  savedAddress: "Detecting location...",
  hasHydrated: false,

  setLocation: (latitude, longitude, savedAddress) =>
    set({ latitude, longitude, savedAddress }),

  clearLocation: () =>
    set({
      latitude: null,
      longitude: null,
      savedAddress: "Location unavailable",
    }),

  setHasHydrated: (status) => set({ hasHydrated: status }),
});
