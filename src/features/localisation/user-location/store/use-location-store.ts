import { create } from "zustand";

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  savedAddress: string;
  setLocation: (lat: number, lng: number, address: string) => void;
  clearLocation: () => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  latitude: null,
  longitude: null,
  savedAddress: "Detecting location...",
  setLocation: (latitude, longitude, savedAddress) =>
    set({ latitude, longitude, savedAddress }),
  clearLocation: () =>
    set({
      latitude: null,
      longitude: null,
      savedAddress: "Location unavailable",
    }),
}));
