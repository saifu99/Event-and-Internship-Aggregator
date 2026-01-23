import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  return (
    <Link to={`/event/${event._id}`}>
      <div className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer">
        <h3 className="text-lg font-semibold mb-2">{event.title}</h3>

        <p className="text-gray-600 mb-1">
          Platform: {event.platform}
        </p>

        <p className="text-gray-600">
          Deadline:{" "}
          {event.deadline
            ? new Date(event.deadline).toLocaleString("en-IN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              })
            : "N/A"}
        </p>
      </div>
    </Link>
  );
}
