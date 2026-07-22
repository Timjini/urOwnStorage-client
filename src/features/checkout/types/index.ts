import { JsonApiSingleResponse } from "@/types/api";

export interface Checkout {
  storageSpaceId: number;
  startDate: unknown;
  endDate: unknown;
  status: CheckoutSessionStatus;
  currency: string;
  totalAmount: number;
  serviceFee: number;
  itemType: "Furniture" | "Boxes" | "Vehicle" | "Other";
  instructions: string;
  userData: User;
  agreedToTerms: boolean;
}

export interface User {
  email: string;
  phone: string;
  fullName: string;
}

export interface CheckoutAttributes {
  totalAmount: number;
  serviceFee: number;
  currency: string;
  startDate: string;
  endDate: string;
  stripePaymentIntentId: string;
  stripeClientSecret: string;
  stripeCheckoutUrl: string;
  reference: string;
  status: "NOT_STARTED" | "EXECUTING" | "SUCCESS" | "FAILED";
  storageSpace: {
    id?: number;
    name?: string;
    address?: string;
    [key: string]: any;
  };
}

export type BookingResponse = JsonApiSingleResponse<CheckoutAttributes>;

export type CheckoutSessionStatus =
  | "NOT_STARTED"
  | "EXECUTING"
  | "SUCCESS"
  | "FAILED";
