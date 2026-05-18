import { createBooking } from "../api";
import { Booking } from "../types";

export const bookingService = {
  defaultFee: 5,

  getPriceWithFee(price: number): number {
    return this.defaultFee + price;
  },

  async create(bookingData: Booking): Promise<Booking> {
    try {
      const response = await createBooking(bookingData);
      
      return response;
    } catch (error) {
      console.error("BookingService.create failed:", error);
      throw error;
    }
  }
};