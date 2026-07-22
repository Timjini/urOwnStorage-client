import * as z from "zod";

export const STATUS_OPTIONS = [
  "NOT_STARTED",
  "EXECUTING",
  "SUCCESS",
  "FAILED",
] as const;
export const checkoutSchema = z.object({
  storageSpaceId: z.coerce.string<string>("Storage Space must exist"),
  status: z.enum(STATUS_OPTIONS),
  currency: z.string().min(2, "Issue with the Currency"),
  totalAmount: z.coerce.number<number>({ error: "Issue with the price" }),
  serviceFee: z.coerce.number<number>({ error: "Issue with payment" }),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  phone: z.string().min(6, "Please enter a valid phone number"),
  itemType: z.enum(["Furniture", "Boxes", "Vehicle", "Other"]),
  instructions: z.string().optional(),
  startDate: z.date().min(new Date(Date.now()), {
    message: "Select a date from today onward",
  }),
  endDate: z.z.date().min(new Date(Date.now()), {
    message: "Select a date from today onward",
  }),
  agreedToTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions to proceed.",
  }),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
