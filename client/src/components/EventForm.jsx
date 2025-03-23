"use client";

import { useEffect, useState, useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { EventSchema } from "@/app/lib/definitions";
import { createEvent } from "@/actions/event";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "./ui/form";

export default function EventForm({ onFormChange }) {
  const [state, action, pending] = useActionState(createEvent, undefined);
  const [previewData, setPreviewData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
  });

  const form = useForm({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
    },
  });

  useEffect(() => {
    // console.log("State: ", state);
    if (state?.success) {
      form.reset();
    }
  }, [state, form]);
  const handleFormChange = (data) => {
    setPreviewData(data);
    onFormChange(data); // Pass data to parent (Modal) to update preview
  };

  return (
    <Form {...form}>
      <form
        action={action}
        onChange={() => handleFormChange(form.getValues())}
        className="space-y-4"
      >
        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-4">
            <div>
              {/* Event Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="active:outline-none">
                    <FormLabel
                      className={`font-normal text-[#374151] ${
                        state?.errors?.title ? "text-red-500" : ""
                      }`}
                    >
                      Event Title
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter event title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {state?.errors?.title && (
                <p className="text-red-500 mt-1 text-sm">
                  {state.errors.title}
                </p>
              )}
            </div>

            <div>
              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={`font-normal text-[#374151] ${
                        state?.errors?.description ? "text-red-500" : ""
                      }`}
                    >
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-20"
                        placeholder="Enter event description..."
                        minh="10rem"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {state?.errors?.description && (
                <p className="text-red-500 mt-1 text-sm">
                  {state.errors.description}
                </p>
              )}
            </div>
            <div className="flex flex-row justify-between items-center space-x-2">
              <div className="flex-1">
                {/* Date */}
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => {
                    // Get current date in YYYY-MM-DD format
                    const currentDate = new Date().toISOString().split("T")[0];

                    return (
                      <FormItem>
                        <FormLabel
                          className={`font-normal text-[#374151] ${
                            state?.errors?.date ? "text-red-500" : ""
                          }`}
                        >
                          Date
                        </FormLabel>
                        <FormControl>
                          <Input type="date" min={currentDate} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                {state?.errors?.date && (
                  <p className="text-red-500 mt-1 text-sm">
                    {state.errors.date}
                  </p>
                )}
              </div>
              <div className="flex-1">
                {/* Time */}
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className={`font-normal text-[#374151] ${
                          state?.errors?.time ? "text-red-500" : ""
                        }`}
                      >
                        Time
                      </FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {state?.errors?.time && (
                  <p className="text-red-500 mt-1 text-sm">
                    {state.errors.time}
                  </p>
                )}
              </div>
            </div>
            <div>
              {/* Location */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={`font-normal text-[#374151] ${
                        state?.errors?.location ? "text-red-500" : ""
                      }`}
                    >
                      Location
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {state?.errors?.location && (
                <p className="text-red-500 mt-1 text-sm">
                  {state.errors.location}
                </p>
              )}
            </div>
          </div>
          <div>
            <Button
              onClick={(e) => {
                //e.preventDefault();
              }}
              type="submit"
              className="cursor-pointer bg-[#3366FF] hover:bg-[#2D5DD7]"
            >
              Create Event
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
