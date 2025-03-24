import EventCard from "./EventCard";
import React from "react";
import { useEffect, useState } from "react";

export default function EventsSection() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://127.0.0.1:4000/events", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [events]);

  return (
    <div className="flex px-40 py-20 flex-col gap-y-8">
      <div className="flex flex-row justify-between items-center w-fit gap-x-8">
        <div>
          <p className="text-[#3366FF] cursor-pointer">Uncoming Events</p>
        </div>
        <div>
          <p className="text-[#666666] hover:text-[#3366FF] cursor-pointer">
            Past Events
          </p>
        </div>
        <div>
          <p className="text-[#666666] hover:text-[#3366FF] cursor-pointer">
            My Events
          </p>
        </div>
      </div>
      <div>
        <div className="flex flex-row justify-between items-center gap-x-8">
          {events.length > 0
            ? events.map((event) => {
                return <EventCard key={event.event_id} event={event} />;
              })
            : ""}
        </div>
      </div>
    </div>
  );
}
