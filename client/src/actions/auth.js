"use server";

import { SignupFormSchema, LoginFormSchema } from "@/app/lib/definitions";
import { createSession, deleteSession } from "@/app/lib/session";

export async function signup(state, formData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      serverError: false,
    };
  }

  // Prepare the payload to send to the backend API
  const payload = {
    first_name: validatedFields.data.firstName,
    last_name: validatedFields.data.lastName,
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  };

  // Send the data to the backend using fetch or axios
  try {
    const response = await fetch("http://localhost:4000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok === false) {
      // Handle error response
      return { errors: data.error, serverError: true };
    }

    // Handle successful registration, maybe redirect to login
    return { success: true };
  } catch (error) {
    console.error("Error during registration:", error);
    return { errors: { general: ["An error occurred. Please try again."] } };
  }
}

export async function login(state, formData) {
  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      serverError: false,
    };
  }

  // Prepare the payload to send to the backend API
  const payload = {
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  };

  // Send the data to the backend using fetch or axios
  try {
    const response = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok === false) {
      const error = data.error || { general: ["An error occurred."] };
      // Handle error response
      return { errors: error, serverError: true };
    }
    const user_id = data?.user_id;
    await createSession(user_id);

    // Handle successful registration, maybe redirect to login
    return { success: true };
  } catch (error) {
    console.error("Error during login:", error);
    return { errors: { general: ["An error occurred. Please try again."] } };
  }
}

export async function logout() {
  try {
    await deleteSession();
    return { message: "Logout successful" };
  } catch (error) {
    console.error("Logout failed:", error);
    return { error: "Logout failed" };
  }
}
