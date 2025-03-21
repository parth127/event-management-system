import EventCard from "./EventCard";

const eventList = [
  {
    eventName: "Tech Conference 2024",
    location: "Toronto, Canada",
    date: "2025-03-29",
    time: "12:00 PM",
    image: "/images/Stock_1.jpg",
  },
  {
    eventName: "InnoSummit 2025",
    location: "Montreal, Canada",
    date: "2025-04-01",
    time: "8:00 AM",
    image: "/images/Stock_2.jpeg",
  },
  {
    eventName: "CodeCon Vancouver",
    location: "Vancouver, Canada",
    date: "2025-05-15",
    time: "10:00 AM",
    image: "/images/Stock_3.jpeg",
  },
];

export default function EventsSection() {
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
          {eventList.map((event, index) => {
            return <EventCard key={index} event={event} />;
          })}
        </div>
      </div>
    </div>
  );
}
