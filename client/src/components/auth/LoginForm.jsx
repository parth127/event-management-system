"use client";

import { CardWrapper } from "./card-wrapper";
import React from "react";
import { useEffect, useState, useActionState } from "react";
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
import { login } from "@/actions/auth";
import { LoginFormSchema } from "@/app/lib/definitions";

import { FormSuccess } from "../authForms/form-success";
import { FormError } from "../authForms/form-error";
import { useRouter } from "next/navigation";

// import { useNavigate } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [state, action, pending] = useActionState(login, undefined);

  useEffect(() => {
    if (state?.errors && state?.serverError) {
      setError(state.errors);
    }
    if (state?.success) {
      setSuccess("Sign In successful");
      form.reset();

      router.push("/");
    }
  }, [state, form]);

  return (
    <div className="w-lvw h-lvh flex justify-center items-center bg-white">
      <CardWrapper
        headerLabel="Sign In"
        backButtonLabel="Don't have an account?"
        backButtonHref="/auth/register"
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
              Login
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
}
