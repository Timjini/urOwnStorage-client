import { PAYMENTS } from '@/constants/appGlobal';
import { useStripe } from '@stripe/stripe-react-native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, View } from 'react-native';

export default function PaymentScreen() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(true);

  const setup = async () => {
    try {
      const response = await fetch(PAYMENTS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      const { paymentIntent, error: backendError } = await response.json();

      if (backendError) {
        Alert.alert('Backend Error', backendError);
        return;
      }

      // 2. Initialize the sheet with the secret from Rails
      const { error } = await initPaymentSheet({
        merchantDisplayName: 'Ur Own Storage',
        paymentIntentClientSecret: paymentIntent, 
        defaultBillingDetails: { name: 'Jane Doe' }
      });

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        setLoading(false);
      }
    } catch (e) {
      Alert.alert('Network Error', 'Could not connect to Rails server');
    }
  };

  useEffect(() => {
    setup();
  }, []);

  const checkout = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="Checkout" onPress={checkout} />
      )}
    </View>
  );
}