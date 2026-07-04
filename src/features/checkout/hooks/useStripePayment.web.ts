import { useStripe } from "@stripe/stripe-react-native";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

interface UseStripePaymentProps {
  paymentIntentClientSecret: string | undefined;
  merchantDisplayName?: string;
}

export const useStripePayment = ({
  paymentIntentClientSecret,
  merchantDisplayName = "Ur Own Storage",
}: UseStripePaymentProps) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [isReady, setIsReady] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initializePaymentSheet = async () => {
      if (!paymentIntentClientSecret) return;

      setIsReady(false);
      const { error } = await initPaymentSheet({
        merchantDisplayName,
        paymentIntentClientSecret,
        allowsDelayedPaymentMethods: false,
      });

      if (error) {
        Alert.alert("Payment Initialization Error", error.message);
      } else {
        setIsReady(true);
      }
    };

    initializePaymentSheet();
  }, [initPaymentSheet, paymentIntentClientSecret, merchantDisplayName]);

  const presentCheckout = async (): Promise<boolean> => {
    if (!isReady) return false;

    setLoading(true);
    const { error } = await presentPaymentSheet();
    setLoading(false);

    if (error) {
      Alert.alert(`Payment failed (${error.code})`, error.message);
      return false;
    } else {
      Alert.alert("Success", "Your booking payment is confirmed!");
      return true;
    }
  };

  return {
    isReady: isReady && !!paymentIntentClientSecret,
    loading,
    presentCheckout,
  };
};
