import { JsonApiSingleResponse } from "@/types/api";

export interface Booking {
    storageSpaceId: number
    startDate:      unknown
    endDate:        unknown
    status:         "NOT_STARTED" | "EXECUTING" | "SUCCESS" |  "FAILED";
    currency:       string
    amount:         number
    serviceFee:     number
    itemType:       "Furniture" | "Boxes" | "Vehicle" | "Other";
    instructions:   string
    userData: User
}

export interface User {
    email:      string
    phone:      string
    fullName:   string
}

export interface BookingAttributes {
    totalAmount: number;
    serviceFee: number;
    currency: string;
    startDate: string;
    endDate: string;
    stripePaymentIntentId: string;
    reference: string;
    status: "NOT_STARTED" | "EXECUTING" | "SUCCESS" |  "FAILED";
    storageSpace: {
      id?: number;
      name?: string;
      address?: string;
      [key: string]: any; 
    };
  }
  
  export type BookingResponse = JsonApiSingleResponse<BookingAttributes>;