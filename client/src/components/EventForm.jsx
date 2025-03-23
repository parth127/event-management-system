"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { EventSchema } from "@/app/lib/definitions";

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

  const handleFormChange = (data) => {
    setPreviewData(data);
    onFormChange(data); // Pass data to parent (Modal) to update preview
  };

  return (
    <Form {...form}>
      <form
        onChange={() => handleFormChange(form.getValues())}
        className="space-y-4"
      >
        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-4">
            {/* Event Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="active:outline-none">
                  <FormLabel className="font-normal text-[#374151]">
                    Event Title
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter event title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal text-[#374151]">
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
            <div className="flex flex-row justify-between items-center space-x-2">
              {/* Date */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => {
                  // Get current date in YYYY-MM-DD format
                  const currentDate = new Date().toISOString().split("T")[0];

                  return (
                    <FormItem className="flex-1">
                      <FormLabel className="font-normal text-[#374151]">
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

              {/* Time */}
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="font-norma text-[#374151]">
                      Time
                    </FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal text-[#374151]">
                    Location
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <Button
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
