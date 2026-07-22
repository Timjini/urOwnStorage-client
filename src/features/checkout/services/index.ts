import { JsonApiSingleResponse } from "@/types/api";
import { createCheckoutSession } from "../api";
import { Checkout, CheckoutAttributes } from "../types";

export const checkoutService = {
  defaultFee: 5,

  getPriceWithFee(price: number, leaseFee: number): number {
    return Number(leaseFee) + Number(price);
  },

  async create(
    data: Checkout,
  ): Promise<JsonApiSingleResponse<CheckoutAttributes>> {
    try {
      const response = await createCheckoutSession(data);
      return response;
    } catch (error) {
      console.error("CheckoutService.create failed:", error);
      throw error;
    }
  },
};
