// import { StripeProvider } from "@stripe/stripe-react-native";

// if (!process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
//     throw new Error('EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined in environment variables');
//   }
// const publishableKey = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY

// if (!publishableKey)
// {
//     throw new Error ("stripe publishableKey missing");
// }

// export default function AppStripeProvider(
//     props: Omit<
//     React.ComponentProps<typeof StripeProvider>,
//     "publishableKey"
//     >
// ) {
//     return (
//         <StripeProvider
//         publishableKey={publishableKey}
//         {...props}
//         />
//     )
// }
