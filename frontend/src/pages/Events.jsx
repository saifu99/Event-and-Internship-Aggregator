import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/opportunities",
        );
        setEvents(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch events:", err);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading events...</p>;
  if (!events.length)
    return <p className="text-center mt-10">No events available.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Hackathons & Events</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((ev) => (
          <div
            key={ev._id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{ev.title}</h2>
            <p className="text-gray-600 mb-1">Platform: {ev.platform}</p>
            <p className="text-gray-600 mb-2">
              Deadline:{" "}
              {ev.deadline
                ? new Date(ev.deadline).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })
                : "N/A"}
            </p>

            <div className="flex justify-between">
              <a
                href={ev.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
              >
                Visit
              </a>
              <Link
                to={`/event/${ev._id}`}
                className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition"
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
