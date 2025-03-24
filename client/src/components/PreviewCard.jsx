import { CalendarIcon, OpacityIcon, ClockIcon } from "@radix-ui/react-icons";

export default function EventPreview({ data }) {
  const { title, description, date, time, location } = data || {};

  return (
    <div className="flex flex-col w-full bg-[#f8fbfb] rounded-sm px-6 py-4 gap-y-4">
      <div>
        <p className="font-normal text-lg">Event Preview</p>
      </div>
      <div>
        <div className="flex flex-col w-full bg-white rounded-lg overscroll-auto">
          <div className="w-full overflow-hidden rounded-t-lg">
            <img
              src="/images/Stock_1.jpg"
              alt={event.eventName}
              className=" w-full min-h-40 max-h-40 object-cover"
            />
          </div>
          <div className="flex flex-col p-4 items-start gap-y-2">
            <div>
              <p className="font-light text-xl">{title || "Event Title"}</p>
            </div>
            <div>
              <p className="font-light text-sm text-[#4B5563] text-justify line-clamp-3">
                {description || "Event Description"}
              </p>
            </div>
            <div className="flex flex-row justify-start items-center gap-x-2">
              <div className="flex flex-row items-center gap-x-2 text-[#4B5563]">
                <CalendarIcon className="w-4 h-4" />
                <p className="font-light text-sm">
                  {date
                    ? new Date(
                        new Date(date).toLocaleString("en-US", {
                          timeZone: "UTC",
                        })
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Select a date"}
                </p>
              </div>
              <div className="flex flex-row items-start h-full">
                <div className="w-1 h-1 bg-[#4B5563] rounded-full" />
              </div>
              <div>
                <div className="flex flex-row items-center gap-x-2 text-[#4B5563]">
                  <ClockIcon className="w-4 h-4" />
                  <p className="font-light text-sm">
                    {time
                      ? new Date(`1970-01-01T${time}`).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })
                      : "Select a time"}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-row items-center gap-x-2 text-[#4B5563]">
                <OpacityIcon className="w-4 h-4 rotate-180" />
                <p className="font-light text-sm">
                  {location || "Select a location"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
