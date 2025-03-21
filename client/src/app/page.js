"use client";

import { useEffect, useState } from "react";

import EventCard from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/auth";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
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

  async function handleLogout() {
    const result = await logout();

    if (result.error) {
      console.error(result.error);
    } else {
      console.log(result.message);
      router.push("/auth/login");
    }
  }

  return (
    <div className="flex w-full h-full items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="h-lvh max-h-lvh border w-full">
        <div className="flex flex-col gap-y-4 p-4">
          <div className="flex w-full justify-end">
            <div>
              <Button
                onClick={handleLogout}
                className="cursor-pointer hover:scale-110"
                variant="secondary"
              >
                Logout
              </Button>
            </div>
          </div>
          <h1>Events List</h1>
          <div className="flex flex-row gap-x-2">
            {loading ? (
              <p>Loading...</p>
            ) : (
              events.map((event, index = 0) => (
                <EventCard key={index} event={event} />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
