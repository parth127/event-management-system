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
