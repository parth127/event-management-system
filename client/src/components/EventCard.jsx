import { CalendarIcon, OpacityIcon, ClockIcon } from "@radix-ui/react-icons";
export default function EventCard({ event }) {
  const { name, description, date, time, location } = event || {};
  return (
    <div className="flex flex-col w-[440px] bg-white rounded-lg overflow-hidden shadow-md">
      <div>
        <img
          src={event?.image || "/images/Stock_1.jpg"}
          alt={event.eventName}
          className=" w-full h-48 object-cover"
        />
      </div>
      <div className="flex flex-col p-4 items-start gap-y-2">
        <div>
          <p className="font-light text-xl">{name}</p>
        </div>
        <div>
          <p className="font-light text-sm text-[#4B5563] text-justify line-clamp-3">
            {description}
          </p>
        </div>
        <div className="flex flex-row justify-start items-center gap-x-2">
          <div className="flex flex-row items-center gap-x-2 text-[#4B5563]">
            <CalendarIcon className="w-4 h-4" />
            <p className="font-light text-sm">
              {new Date(
                new Date(date).toLocaleString("en-US", {
                  timeZone: "UTC",
                })
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex flex-row items-start h-full">
            <div className="w-1 h-1 bg-[#4B5563] rounded-full" />
          </div>
          <div>
            <div className="flex flex-row items-center gap-x-2 text-[#4B5563]">
              <ClockIcon className="w-4 h-4" />
              <p className="font-light text-sm">
                {new Date(`1970-01-01T${time}`).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-row items-center gap-x-2 text-[#4B5563]">
            <OpacityIcon className="w-4 h-4 rotate-180" />
            <p className="font-light text-sm">{location}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
