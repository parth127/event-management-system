"use client";

import { Button } from "@/components/ui/button";
import EventsSection from "@/components/EventsSection";

export default function Home() {
  return (
    <div className="flex w-full h-full items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="h-lvh max-h-lvh w-full">
        <div className="flex flex-col w-full h-80 justify-center items-center gap-y-4 bg-[#f8f8fb]">
          <div>
            <h1 className="text-5xl font-extrabold">
              Manage Your Events Effortlessly
            </h1>
          </div>
          <div className="mb-2">
            <p className="text-[#666666] font-light">
              Create, manage, and share events with your team and friends
            </p>
          </div>
          <div>
            <Button className="rounded-md bg-[#3366FF] text-white hover:bg-[#2D5DD7] cursor-pointer hover:scale-105 p-6">
              Create New Event
            </Button>
          </div>
        </div>
        <div>
          <EventsSection />
        </div>
      </main>
    </div>
  );
}
