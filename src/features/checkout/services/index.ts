import { JsonApiSingleResponse } from "@/types/api";
import { createCheckoutSession } from "../api";
import { Checkout, CheckoutAttributes } from "../types";

export const checkoutService = {
  defaultFee: 5,

  getPriceWithFee(price: number): number {
    return Number(this.defaultFee) + Number(price);
  },

  async create(data: Checkout): Promise<JsonApiSingleResponse<CheckoutAttributes>> {
    try {
      const response = await createCheckoutSession(data);
      return response;
    } catch (error) {
      console.error("CheckoutService.create failed:", error);
      throw error;
    }
  }
};