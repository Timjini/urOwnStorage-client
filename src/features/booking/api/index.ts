import { BOOKINGS } from "@/constants/appGlobal";
import { apiClient } from "@/lib/apiClient";
import { JsonApiSingleResponse } from "@/types/api";
import { Booking, BookingAttributes } from "../types";

export const createBooking = async (bookingData: Booking): Promise<JsonApiSingleResponse<BookingAttributes>> => {
  const response = await apiClient.post<JsonApiSingleResponse<BookingAttributes>>(`${BOOKINGS}`, bookingData);
  return response;
};