import { CHECKOUT_SESSION } from "@/constants/appGlobal";
import { apiClient } from "@/lib/apiClient";
import { JsonApiSingleResponse } from "@/types/api";
import { Checkout, CheckoutAttributes } from "../types";

export const createCheckoutSession = async (data: Checkout): Promise<JsonApiSingleResponse<CheckoutAttributes>> => {
  const response = await apiClient.post<JsonApiSingleResponse<CheckoutAttributes>>(`${CHECKOUT_SESSION}`, data);
  return response;
};