// src/components/EventCard.jsx
export default function EventCard({ event }) {
  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-md transition">
      <div className="flex items-center gap-3">
        {event.image && (
          <img
            src={event.image}
            alt={event.title}
            className="w-16 h-16 rounded-md object-cover"
          />
        )}
        <div>
          <h3 className="font-bold text-lg">{event.title}</h3>
          {event.organizer && <p className="text-gray-600">{event.organizer}</p>}
        </div>
      </div>

      {event.date && <p className="mt-2">📅 {event.date}</p>}
      {event.location && <p>📍 {event.location}</p>}
      {event.category && <p className="text-blue-600">{event.category}</p>}
      {event.description && (
        <p className="text-gray-500 mt-2 text-sm">{event.description}</p>
      )}
      {event.link && (
        <a
          href={event.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 mt-3 inline-block rounded"
        >
          View Event
        </a>
      )}
    </div>
  );
}
