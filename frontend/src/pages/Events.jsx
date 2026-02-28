import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/API";
import Card from "../components/Card";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const limit = 9; //FETCH 9 AT A TIME 

const fetchEvents = async (p) => {
  try {
    const response = await api.get(`/events?page=${p}&limit=${limit}`);
    const eventsArray = Array.isArray(response?.data?.data)
      ? response.data.data
      : [];

    if (eventsArray.length < limit) setHasMore(false);

    const formatted = eventsArray.map(ev => ({
      _id: ev._id,
      title: ev.title || "No title",
      platform: ev.platform || "N/A",
      deadline: ev.deadline || null,
      applyLink: ev.sourceUrl || null,
    }));

    setEvents(prev => {
      const combined = [...prev, ...formatted];

      //DEDUPLICATE BY _ID
      const uniqueMap = new Map();
      combined.forEach(item => {
        uniqueMap.set(item._id, item);
      });

      return Array.from(uniqueMap.values());
    });

  } catch (err) {
    console.error("Failed to fetch events:", err);
    setHasMore(false);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchEvents(page);
  }, [page]);

  if (loading && page === 1)
    return <p className="text-center mt-10">Loading events...</p>;
  if (!events.length)
    return <p className="text-center mt-10">No events available.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Hackathons & Events</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((ev) => (
          <Card
            key={ev._id}
            item={ev}
            onClick={() => navigate(`/event/${ev._id}`)}
          />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}