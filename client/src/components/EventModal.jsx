"use client";
import { useState } from "react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import EventForm from "./EventForm";
import EventPreview from "./PreviewCard";

export default function EventModal({ open, onClose }) {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
  });

  const handleFormChange = (data) => {
    for (let key in data) {
      setEventData((prev) => ({ ...prev, [key]: data[key] }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-5xl max-w-6xl p-6 min-h-[32rem]">
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
          {/* Left Side: Event Form */}
          <EventForm onFormChange={handleFormChange} />

          {/* Right Side: Event Preview */}
          <EventPreview data={eventData} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
