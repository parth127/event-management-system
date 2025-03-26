"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import EventsSection from "@/components/EventsSection";
import EventModal from "@/components/EventModal";
import Filters from "@/components/Filters";

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null
  });
  const [sortBy, setSortBy] = useState(null);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
  };

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
            <Button
              className="rounded-md bg-[#3366FF] text-white hover:bg-[#2D5DD7] cursor-pointer hover:scale-105 p-6"
              onClick={() => setModalOpen(true)}
            >
              Create New Event
            </Button>
            <EventModal
              open={isModalOpen}
              onClose={() => setModalOpen(false)}
            />
          </div>
        </div>
        <div className="flex flex-col px-40 py-10 gap-y-10">
          <div>
            <Filters 
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
            />
          </div>
          <div>
            <EventsSection 
              filters={filters}
              sortBy={sortBy}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
