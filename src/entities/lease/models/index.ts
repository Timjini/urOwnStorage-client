export interface Lease {
  id: string;
  reference: string;
  storageId: string;
  billingInterval: string;
  bookingDuration: number;
  checkoutSessionId: number;
  createdAt: Date;
  currency: string;
  durationSubtotal: number;
  endDate: Date;
  extraInfo: string;
  serviceFee: number;
  startDate: Date;
  status: string;
  storageSpaceId: number;
  subtotal: number;
  tax: number;
  totalAmount: number;
  unitRate: number;
  updatedAt: Date;
  userId: number;
}
