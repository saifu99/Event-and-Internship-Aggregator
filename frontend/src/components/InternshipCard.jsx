// src/components/InternshipCard.jsx
export default function InternshipCard({ internship }) {
  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-md transition">
      <div className="flex items-center gap-3">
        {internship.logo && (
          <img
            src={internship.logo}
            alt={internship.company}
            className="w-12 h-12 rounded-md"
          />
        )}
        <div>
          <h3 className="font-bold text-lg">{internship.title}</h3>
          <p className="text-gray-600">{internship.company}</p>
        </div>
      </div>

      {internship.category && (
        <p className="text-blue-600 mt-1">{internship.category}</p>
      )}
      {internship.duration && <p>⏳ {internship.duration}</p>}
      {internship.stipend && <p>💰 {internship.stipend}</p>}
      {internship.location && <p>📍 {internship.location}</p>}
      {internship.applyBy && <p>🗓️ Apply by: {internship.applyBy}</p>}

      {internship.skills && (
        <div className="mt-2 flex flex-wrap gap-2">
          {internship.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-gray-200 text-sm px-2 py-1 rounded"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {internship.applyLink && (
        <a
          href={internship.applyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white bg-green-600 hover:bg-green-700 px-3 py-2 mt-3 inline-block rounded"
        >
          Apply Now
        </a>
      )}
    </div>
  );
}

