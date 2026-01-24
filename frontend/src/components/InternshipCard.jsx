// src/components/InternshipCard.jsx
export default function InternshipCard({ internship }) {
  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-md transition">
      {/* Header with logo + title/company */}
      <div className="flex items-center gap-3 mb-3">
        {internship.logo && (
          <img
            src={internship.logo}
            alt={internship.company}
            className="w-12 h-12 rounded-md object-cover"
          />
        )}
        <div>
          <h3 className="font-bold text-lg">{internship.title}</h3>
          <p className="text-gray-600">{internship.company}</p>
        </div>
      </div>

      {/* Category, Duration, Stipend, Location, Deadline */}
      {internship.category && (
        <p className="text-blue-600 mt-1">{internship.category}</p>
      )}
      {internship.duration && <p className="mt-1">⏳ {internship.duration}</p>}
      {internship.stipend && <p className="mt-1">💰 {internship.stipend}</p>}
      {internship.location && <p className="mt-1">📍 {internship.location}</p>}
      {internship.applyBy && <p className="mt-1">🗓️ Apply by: {internship.applyBy}</p>}

      {/* Skills badges */}
      {internship.skills && internship.skills.length > 0 && (
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

      {/* Apply button */}
      {internship.applyLink && (
        <a
          href={internship.applyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 mt-3 inline-block rounded transition"
        >
          Apply Now
        </a>
      )}
    </div>
  );
}
