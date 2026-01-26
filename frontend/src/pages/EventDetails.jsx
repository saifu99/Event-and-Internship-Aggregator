import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { api } from "../utils/API";

export default function EventDetails() {
  const { idv } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await api.get(`/opportunities/${idv}`);
        setEvent(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchEvent();
  }, [idv]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!event) return <p className="text-center mt-10">Event not found</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <p className="text-gray-600 mb-2">Platform: {event.platform}</p>
      <p className="text-gray-600 mb-4">
        Deadline:{" "}
        {event.deadline
          ? new Date(event.deadline).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
          : "N/A"}
      </p>

      <a
        href={event.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Go to Event
      </a>
    </div>
  );
}
