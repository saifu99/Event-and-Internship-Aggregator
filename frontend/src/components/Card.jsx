export default function Card({ data }) { // Card.jsx – To display event or internship cards
  // For events
  return (
    <div className="border p-4 rounded shadow mb-4">
      {data.title && <h3 className="font-bold text-lg">{data.title}</h3>}
      {data.date && <p className="text-gray-500">{data.date}</p>}
      {data.location && <p className="text-gray-500">{data.location}</p>}
       {data.description && <p className="text-gray-500">{data.description}</p>}

      {/* For internships */}
      {data.company && <h3 className="font-bold text-lg">{data.company}</h3>}
      {data.category && <p className="text-red-500">{data.category}</p>}
    </div>
  );
}
