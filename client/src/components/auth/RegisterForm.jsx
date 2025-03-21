"use client";

import React from "react";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { SignupFormSchema } from "../../app/lib/definitions";

import { signup } from "@/actions/auth";
import { useActionState } from "react";

import { FormSuccess } from "../authForms/form-success";
import { FormError } from "../authForms/form-error";

import { CardWrapper } from "./card-wrapper";

export default function RegisterForm() {
  const form = useForm({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [state, action, pending] = useActionState(signup, undefined);

  useEffect(() => {
    if (state?.errors && state?.serverError) {
      setError(state.errors);
    }
    if (state?.success) {
      setSuccess("User registered successfully");
      form.reset();
    }
  }, [state, form]);

  return (
    <div className="w-lvw h-lvh flex justify-center items-center bg-white">
      <CardWrapper
        headerLabel="Register"
        backButtonLabel="Already have an account?"
        backButtonHref="/auth/login"
      >
        <Form {...form}>
          <form
            className="space-y-4"
            action={action}
            onSubmit={(e) => {
              setError("");
              setSuccess("");
            }}
          >
            <div>
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={state?.errors?.firstName ? "text-red-500" : ""}
                    >
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {state?.errors?.firstName && (
                <p className="text-red-500 mt-1">{state.errors.firstName}</p>
              )}
            </div>

            <div>
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={state?.errors?.lastName ? "text-red-500" : ""}
                    >
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {state?.errors?.lastName && (
                <p className="text-red-500 mt-1">{state.errors.lastName}</p>
              )}
            </div>

            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={state?.errors?.email ? "text-red-500" : ""}
                    >
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="shadcn"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {state?.errors?.email && (
                <p className="text-red-500 mt-1">{state.errors.email}</p>
              )}
            </div>
            <div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={state?.errors?.password ? "text-red-500" : ""}
                    >
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {state?.errors?.password && (
                <p className="text-red-500 mt-1">{state.errors.password}</p>
              )}
            </div>

            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit" className="w-full cursor-pointer">
              Register
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
}
