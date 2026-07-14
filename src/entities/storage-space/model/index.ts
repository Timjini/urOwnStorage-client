import { Address } from "@/entities/address";

export interface StorageSpaceResponse {
  storageSpace: StorageSpace;
}

export interface StorageSpace {
  id: string;
  userId: number;
  title: string;
  description: string;
  formattedPrice: string;
  amount: number;
  billingInterval: string;
  currency: string;
  sizeValue: number;
  height: number;
  width: number;
  length: number;
  sizeUnit: string;
  spaceType: string;
  status: string;
  instantBooking: boolean;
  features: string[];
  imageUrls: string[];
  address: Address;
  currencySymbol: string;
}

export interface StorageSpaceFilters {
  status?: string;
  billing_interval?: string;
  space_type?: string;
  features?: string[];
  lat?: number;
  lng?: number;
  distance?: number;
  coordinates?: [number, number];
  page?: number | unknown;
  per_page?: number;
}
