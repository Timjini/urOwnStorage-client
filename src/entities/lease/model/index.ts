import { z } from "zod";

export interface Lease {
  fullAddress: string;
  imageUrls: string[];
  storageSpaceTitle: string;
  reference: string;
  status: string;
}

export const LeaseSchema = z.object({
  fullAddress: z.string(),
  storageSpaceTitle: z.string(),
});
export type ValidLease = z.infer<typeof LeaseSchema>;
