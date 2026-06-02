import { JsonApiSingleResponse } from "@/types/api";
import { createBooking } from "../api";
import { Booking, BookingAttributes } from "../types";

export const bookingService = {
  defaultFee: 5,

  getPriceWithFee(price: number): number {
    return this.defaultFee + price;
  },

  async create(bookingData: Booking): Promise<JsonApiSingleResponse<BookingAttributes>> {
    try {
      const response = await createBooking(bookingData);
      return response;
    } catch (error) {
      console.error("BookingService.create failed:", error);
      throw error;
    }
  }
};