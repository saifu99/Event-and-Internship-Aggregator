import { useParams } from "react-router-dom";

const mockEvents = [
  { id: 1, title: "Hackathon 2025", date: "2025-12-01", description: "48-hour coding challenge." },
  { id: 2, title: "Tech Talk", date: "2025-11-20", description: "Seminar by industry pros." },
  { id: 3, title: "Coding Contest", date: "2025-10-25", description: "Competitive programming." },
];

export default function EventDetails() {
  const { idv } = useParams();
  const event = mockEvents.find((e) => e.id === parseInt(idv));

  if (!event) return <p className="p-4">Event not found</p>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-lg mt-6">
      <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
      <p className="text-gray-600 mb-2">Date: {event.date}</p>
      <p className="text-gray-700">{event.description}</p>
    </div>
  );
}
