// import { useParams } from "react-router-dom";

// const mockEvents = [
//   { id: 1, title: "Hackathon 2025", date: "2025-12-01", description: "48-hour coding challenge." },
//   { id: 2, title: "Tech Talk", date: "2025-11-20", description: "Seminar by industry pros." },
//   { id: 3, title: "Coding Contest", date: "2025-10-25", description: "Competitive programming." },
// ];

// export default function EventDetails() {
//   const { idv } = useParams();
//   const event = mockEvents.find((e) => e.id === parseInt(idv));

//   if (!event) return <p className="p-4">Event not found</p>;

//   return (
//     <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-lg mt-6">
//       <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
//       <p className="text-gray-600 mb-2">Date: {event.date}</p>
//       <p className="text-gray-700">{event.description}</p>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function EventDetails() {
  const { idv } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/opportunities/${idv}`);
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
      <p className="text-gray-600 mb-4">Deadline: {event.deadline || "N/A"}</p>
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
