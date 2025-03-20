export default function EventCard({ event }) {
  return (
    <div className="flex flex-col gap-4 p-4 border border-gray-200 rounded-lg shadow-md min-w-64">
      <div className="flex flex-col justify-center text-center gap-2">
        <h2 className="text-xl font-bold">{event.name}</h2>
        <p className="text-sm text-gray-600">{event.date}</p>
        <p className="text-sm text-gray-600">{event.location}</p>
      </div>
    </div>
  );
}
