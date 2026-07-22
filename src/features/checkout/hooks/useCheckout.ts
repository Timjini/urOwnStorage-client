import { JsonApiSingleResponse } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Platform } from "react-native";
import { checkoutService } from "../services";
import { Checkout, CheckoutAttributes } from "../types";

export const useCreateCheckout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<
    JsonApiSingleResponse<CheckoutAttributes>,
    Error,
    Checkout
  >({
    mutationFn: (data: Checkout) => checkoutService.create(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["checkouts"] });
      const attrs = response?.data?.attributes;
      const stripeUrl = attrs?.stripeCheckoutUrl ?? "";

      if (Platform.OS === "web") {
        if (stripeUrl) {
          window.location.href = stripeUrl;
        } else {
          console.error(
            "Stripe Checkout URL missing from response backend attributes.",
          );
        }
        return;
      }
      console.log("====> checkout response ====>", response);
      router.push({
        pathname: "/(checkout)/checkout",
        params: {
          id: response?.data?.id,
          totalAmount: attrs?.totalAmount?.toString() ?? "",
          serviceFee: attrs?.serviceFee?.toString() ?? "",
          currency: attrs?.currency ?? "",
          startDate: String(attrs?.startDate ?? ""),
          endDate: String(attrs?.endDate ?? ""),
          status: attrs?.status ?? "",
          storageSpace: JSON.stringify(attrs?.storageSpace ?? {}),
          paymentIntentClientSecret: attrs?.stripeClientSecret ?? "",
          stripeCheckoutUrl: stripeUrl,
          referenceNumber: attrs?.reference,
        },
      });
    },
    onError: (error) => console.log("useCreateCheckout failed:", error.message),
  });
};
