// Card.jsx – To display event or internship cards
export default function Card({ data }) {
  // For events
  return (
    <div className="border p-4 rounded shadow mb-4">
      {data.title && <h3 className="font-bold text-lg">{data.title}</h3>}
      {data.date && <p className="text-gray-500">{data.date}</p>}

      {/* For internships */}
      {data.company && <h3 className="font-bold text-lg">{data.company}</h3>}
      {data.role && <p className="text-gray-500">{data.role}</p>}
    </div>
  );
}
