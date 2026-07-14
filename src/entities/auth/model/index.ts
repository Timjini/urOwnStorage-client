import * as z from "zod";

export interface IAuth {
  email: string;
  password: string;
}

export interface IUserCreate {
  email: string;
  password: string;
}

export interface AuthAttributes {
  email: string;
  authToken: any;
}

export interface IAuthResponse {
  email: string;
  authToken: any;
}

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[^a-zA-Z0-9]/, {
    message: "Password must contain at least one special character",
  });

export const authSchema = z.object({
  email: z.email("Please enter a valid email address"),
  // phone: z.string().min(6, "Please enter a valid phone number"),
  password: passwordSchema,
  // passwordConfirmation: passwordSchema,
});

export const createAccountSchema = z.object({
  email: z.email("Please enter a valid email address"),
  phone: z.string().min(6, "Please enter a valid phone number"),
  password: passwordSchema,
  passwordConfirmation: passwordSchema,
});

export type AccountCreationFormData = z.infer<typeof createAccountSchema>;
export type AuthFormData = z.infer<typeof authSchema>;
