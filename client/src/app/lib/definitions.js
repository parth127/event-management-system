import { z } from "zod";

export const SignupFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First Name must be at least 2 characters long." })
    .trim(),
  lastName: z
    .string()
    .min(2, { message: "Last Name must be at least 2 characters long." })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Password too short. " })
    .refine(
      (password) => {
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[d])(?=.*[!@#$%^&*()_+=[\]{}|;':",.<>/?]).*$/;
        return passwordRegex.test(password);
      },
      { message: "Password must be stronger" }
    ),
});

export const LoginFormSchema = z.object({
  email: z
    .string()
    .email({
      message: "Email is required",
    })
    .trim(),
  password: z
    .string()
    .min(1, {
      message: "Password is required",
    })
    .trim(),
});

export const EventSchema = z.object({
  title: z
    .string()
    .min(1, "Event title is required") // Title cannot be empty
    .max(100, "Event title must be less than 100 characters"), // Maximum 100 characters
  description: z
    .string()
    .min(1, "Event description is required") // Description cannot be empty
    .max(500, "Event description must be less than 500 characters"), // Maximum 500 characters
  location: z.string().min(1, "Location is required"), // Location cannot be empty
  date: z.string().min(1, "Date is required"), // Date cannot be empty
  time: z.string().min(1, "Time is required"), // Time cannot be empty
});
