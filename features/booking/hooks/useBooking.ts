import { JsonApiSingleResponse } from '@/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { bookingService } from '../services';
import { Booking, BookingAttributes } from '../types';

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<JsonApiSingleResponse<BookingAttributes>, Error, Booking>({
    mutationFn: (bookingData: Booking) => bookingService.create(bookingData),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      const attrs = response?.data?.attributes;

      router.push({
        pathname: '/booking-payment',
        params: {
          id: response?.data?.id,
          totalAmount: attrs?.totalAmount?.toString() ?? '',
          serviceFee: attrs?.serviceFee?.toString() ?? '',
          currency: attrs?.currency ?? '',
          startDate: String(attrs?.startDate ?? ''),
          endDate: String(attrs?.endDate ?? ''),
          status: attrs?.status ?? '',
          storageSpace: JSON.stringify(attrs?.storageSpace ?? {}),
          paymentIntentClientSecret: attrs?.stripePaymentIntentId ?? '',
          referenceNumber: attrs.reference
        }
      });
    },
    onError: (error) => console.error('useCreateBooking failed:', error.message),
  });
};

// export const useFetchBookings = () => {
//   return useQuery({
//     queryKey: ['bookings'],
//     queryFn: () => bookingService.getAll(), // Assumes this method exists in your service
//   });
// };

// export const useCancelBooking = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (bookingId: string) => bookingService.cancel(bookingId),
//     onSuccess: () => {
//       // Refresh the booking lists instantly on deletion/cancellation
//       queryClient.invalidateQueries({ queryKey: ['bookings'] });
//     },
//   });
// };