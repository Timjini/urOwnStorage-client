import { z } from "zod";

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

export const LeaseSchema = z.object({
  id: z.string(),
  reference: z.string(),
  storageId: z.string(),
  billingInterval: z.string(),
  bookingDuration: z.number(),
  checkoutSessionId: z.number(),
  createdAt: z.coerce.date(),
  currency: z.string(),
  durationSubtotal: z.number(),
  endDate: z.coerce.date(),
  extraInfo: z.string(),
  serviceFee: z.number(),
  startDate: z.coerce.date(),
  status: z.string(),
  storageSpaceId: z.number(),
  subtotal: z.number(),
  tax: z.number(),
  totalAmount: z.number(),
  unitRate: z.number(),
  updatedAt: z.coerce.date(),
  userId: z.number(),
});
export type ValidLease = z.infer<typeof LeaseSchema>;
