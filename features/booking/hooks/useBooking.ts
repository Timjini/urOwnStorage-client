import { QueryClient, useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { bookingService } from '../services';
import { Booking } from '../types';

export const useCreateBooking = () => {
    const queryClient = new QueryClient();
    const router = useRouter();
  return useMutation<Booking>({
    mutationFn: (bookingData: Booking) => bookingService.create(bookingData),
    
    onSuccess: (data) => {
      console.log('Booking successfully created:', data);
      
      queryClient.invalidateQueries({ queryKey: ['bookings'] });

      const bookingId = data?.data.id;
      const attrs = data?.data.attributes;

      router.push({
        pathname: '/booking-confirmation',
        params: {
          id: bookingId,
          amount: attrs.amount.toString(),
          currency: attrs.currency,
          startDate: attrs.startDate,
          endDate: attrs.endDate,
          status: attrs.status,
          storageSpace: JSON.stringify(attrs.storageSpace) 
        }
      });
    },
    
    onError: (error) => {
      console.error('Error in useCreateBooking hook:', error.message);
    },
  });
};