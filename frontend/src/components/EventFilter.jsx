export default function EventFilter({ filterType, setFilterType }) {
  return (
    <div className="mb-4 flex gap-2">
      <button
        className={`px-3 py-1 rounded ${filterType === "all" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        onClick={() => setFilterType("all")}
      >
        All
      </button>
      <button
        className={`px-3 py-1 rounded ${filterType === "hackathon" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        onClick={() => setFilterType("hackathon")}
      >
        Hackathon
      </button>
      <button
        className={`px-3 py-1 rounded ${filterType === "contest" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        onClick={() => setFilterType("contest")}
      >
        Coding Contest
      </button>
      <button
        className={`px-3 py-1 rounded ${filterType === "talk" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        onClick={() => setFilterType("talk")}
      >
        Tech Talk
      </button>
      <button
        className={`px-3 py-1 rounded ${filterType === "internship" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        onClick={() => setFilterType("internship")}
      >
        Internships
      </button>
    </div>
  );
}
