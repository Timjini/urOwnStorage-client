import * as z from "zod";

export const bookingSchema = z.object({
    storageSpaceId: z.coerce.string<string>("Storage Space must exist"),
    status: z.enum(["Pending", "Cancelled", "Approved"]),
    currency: z.string().min(2, "Issue with the Currency"),
    amount: z.coerce.number<number>({ error: "Issue with the price" }),
    serviceFee: z.coerce.number<number>({ error: "Issue with payment" }),
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.email("Please enter a valid email address"),
    phone: z.string().min(6, "Please enter a valid phone number"),
    itemType: z.enum(["Furniture", "Boxes", "Vehicle", "Other"]),
    instructions: z.string().optional(),
    startDate: z.coerce.date<Date>({ error: "Start date is required" }),
    endDate: z.coerce.date<Date>({ error: "End date is required" }),
  });
  
  export type BookingFormData = z.infer<typeof bookingSchema>;