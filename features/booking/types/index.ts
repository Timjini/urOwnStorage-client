import { JsonApiSingleResponse } from "@/types/api";

export interface Booking {
    storageSpaceId: number
    startDate:      unknown
    endDate:        unknown
    status:         "Pending" | "Cancelled" | "Approved";
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
    amount: number;
    serviceFee: number;
    currency: string;
    startDate: string;
    endDate: string;
    paymentIntent: string;
    reference: string;
    status: "Pending" | "Approved" | "Cancelled" | "Completed";
    storageSpace: {
      id?: number;
      name?: string;
      address?: string;
      [key: string]: any; 
    };
  }
  
  export type BookingResponse = JsonApiSingleResponse<BookingAttributes>;