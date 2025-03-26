import EventCard from "./EventCard";
import React from "react";
import { useEffect, useState } from "react";

export default function EventsSection({ filters, sortBy }) {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
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
        setFilteredEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    let filtered = [...events];

    // Apply date filters
    if (filters.startDate || filters.endDate) {
      filtered = filtered.filter(event => {
        // Create event date by combining date and time
        const eventDate = new Date(`${event.date}T${event.time}`);
        
        // Create filter dates, setting time to start/end of day
        const startDate = filters.startDate ? new Date(filters.startDate + 'T00:00:00') : null;
        const endDate = filters.endDate ? new Date(filters.endDate + 'T23:59:59') : null;

        // If only start date is provided
        if (startDate && !endDate) {
          const isAfterStart = eventDate >= startDate;
          console.log('Is after start:', isAfterStart);
          return isAfterStart;
        }
        // If only end date is provided
        if (!startDate && endDate) {
          const isBeforeEnd = eventDate <= endDate;
          console.log('Is before end:', isBeforeEnd);
          return isBeforeEnd;
        }
        // If both dates are provided
        if (startDate && endDate) {
          const isInRange = eventDate >= startDate && eventDate <= endDate;
          console.log('Is in range:', isInRange);
          return isInRange;
        }
        // If no dates are provided
        return true;
      });
    }

    // Apply sorting
    if (sortBy) {
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'name-asc':
            return (a.name || '').localeCompare(b.name || '');
          case 'name-desc':
            return (b.name || '').localeCompare(a.name || '');
          case 'location-asc':
            return (a.location || '').localeCompare(b.location || '');
          case 'location-desc':
            return (b.location || '').localeCompare(a.location || '');
          case 'date-asc': {
            const dateA = new Date(`${a.date}T${a.time}`).getTime();
            const dateB = new Date(`${b.date}T${b.time}`).getTime();
            return dateA - dateB;
          }
          case 'date-desc': {
            const dateA = new Date(`${a.date}T${a.time}`).getTime();
            const dateB = new Date(`${b.date}T${b.time}`).getTime();
            return dateB - dateA;
          }
          default:
            return 0;
        }
      });
    }

    setFilteredEvents(filtered);
  }, [events, filters, sortBy]);

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-row justify-between items-center w-fit gap-x-8">
        <div>
          <p className="text-[#3366FF] cursor-pointer">Upcoming Events</p>
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
        <div className="grid grid-cols-3 gap-x-8">
          {loading ? (
            <p>Loading events...</p>
          ) : filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard key={event.event_id} event={event} />
            ))
          ) : (
            <p>No events found</p>
          )}
        </div>
          
        </div>
      </div>
    </div>
  );
}
