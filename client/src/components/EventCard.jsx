import { ClockIcon, OpacityIcon } from "@radix-ui/react-icons";
export default function EventCard({ event }) {
  return (
    <div className="flex flex-col w-[440px] h-[356px] bg-white rounded-lg overflow-hidden shadow-md">
      <div>
        <img
          src={event.image}
          alt={event.eventName}
          className=" w-full h-48 object-cover"
        />
      </div>
      <div className="p-6 items-center">
        <div className="mb-2">
          <p className="font-light text-xl">{event.eventName}</p>
        </div>
        <div className="flex flex-row items-center gap-x-2 mb-2">
          <ClockIcon className="text-[#4B5563]" />
          <p className="text-[#4B5563] font-light text-sm">{event.date}</p>
        </div>
        <div className="flex flex-row items-center gap-x-2 mb-2">
          <OpacityIcon className="text-[#4B5563] rotate-180" />
          <p className="text-[#4B5563] font-light text-sm">{event.location}</p>
        </div>
        <div className="flex flex-row justify-end items-center">
          <p className="text-[16px] text-[#3366FF] cursor-pointer">
            View Details
          </p>
        </div>
      </div>
    </div>
  );
}
