export interface LocationState {
  latitude: number | null;
  longitude: number | null;
  savedAddress: string;
  hasHydrated: boolean;
}

export interface LocationActions {
  setLocation: (lat: number, lng: number, address: string) => void;
  clearLocation: () => void;
  setHasHydrated: (state: boolean) => void;
}

export type LocationSlice = LocationState & LocationActions;
