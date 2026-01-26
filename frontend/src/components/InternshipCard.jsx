export default function InternshipCard({ internship }) {
  if (!internship) return null;

  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-md transition">
      <h3 className="font-bold text-lg">
        {internship.title}
      </h3>

      <p className="text-gray-600">
        {internship.company}
      </p>

      <p className="mt-2 text-sm text-gray-500">
        Platform: {internship.platform}
      </p>

      {internship.applyBy && (
        <p className="mt-1 text-sm">
          Apply by: {internship.applyBy}
        </p>
      )}

      <button
        onClick={(e) => {
          e.stopPropagation();
          window.open(internship.applyLink, "_blank");
        }}
        className="inline-block mt-3 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
      >
        Apply Now
      </button>
    </div>
  );
}
