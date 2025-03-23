"use server";

import { EventSchema } from "@/app/lib/definitions";
import { getUserIdFromSession } from "@/app/lib/session";

export async function createEvent(state, formData) {
  const validatedFields = EventSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    date: formData.get("date"),
    time: formData.get("time"),
    location: formData.get("location"),
  });
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      serverError: false,
    };
  }

  const user_id = await getUserIdFromSession();

  const payload = {
    user_id: user_id,
    name: validatedFields.data.title,
    description: validatedFields.data.description,
    date: validatedFields.data.date,
    time: validatedFields.data.time,
    location: validatedFields.data.location,
  };

  // Send the data to the backend using fetch or axios
  try {
    const response = await fetch("http://127.0.0.1:4000/events", {
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
    console.error("Error during event creation:", error);
    return { errors: { general: ["An error occurred. Please try again."] } };
  }
}
