import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // make sure this is imported

export default function Internships() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/internships");
        setInternships(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchInternships();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading internships...</p>;
  if (!internships.length) return <p className="text-center mt-10">No internships available.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Internships</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {internships.map((intern) => (
          // Wrap the card in a Link to the detail page
          <Link key={intern._id} to={`/internship/${intern._id}`} className="block">
            <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">{intern.title}</h2>
              <p className="text-gray-600 mb-1">Company: {intern.company}</p>
              <p className="text-gray-600 mb-1">Platform: {intern.platform}</p>
              <p className="text-gray-600 mb-2">
                Deadline: {intern.deadline ? new Date(intern.deadline).toLocaleString("en-IN") : "N/A"}
              </p>
              {/* Make Apply button clickable separately */}
              <a
                href={intern.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                onClick={(e) => e.stopPropagation()} // prevent Link click
              >
                Apply
              </a>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
