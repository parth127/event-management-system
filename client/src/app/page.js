"use client";

import { useEffect, useState } from "react";

import EventCard from "@/components/EventCard";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch events from Flask API
    fetch("http://localhost:4000/events")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>Events List</h1>
        <div className="flex flex-row gap-x-2">
          {loading ? (
            <p>Loading...</p>
          ) : (
            events.map((event) => <EventCard key={event.id} event={event} />)
          )}
        </div>
      </main>
    </div>
  );
}
