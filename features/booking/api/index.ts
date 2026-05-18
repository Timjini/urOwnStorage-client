import { BOOKINGS } from "@/constants/appGlobal";
import { apiClient } from "@/lib/apiClient";
import { Booking } from "../types";

export const createBooking = async (bookingData: Booking) => {
  return await apiClient.post<Booking>(`${BOOKINGS}`, bookingData);
};