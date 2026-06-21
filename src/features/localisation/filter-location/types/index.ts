export interface StorageSpaceFilters {
  status?: string;
  billing_interval?: string;
  space_type?: string;
  features?: string[];
  lat?: number;
  lng?: number;
  distance?: number;
  coordinates?: [number, number];
}
