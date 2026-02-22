import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/API";
import Card from "../components/Card";

export default function Internships() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const limit = 9;

const fetchInternships = async (p) => {
  try {
    const response = await api.get(`/internships?page=${p}&limit=${limit}`);
    const internshipsArray = Array.isArray(response?.data?.data)
      ? response.data.data
      : [];

    if (internshipsArray.length < limit) setHasMore(false);

    const formatted = internshipsArray.map(i => ({
      _id: i._id,
      title: i.title || "No title",
      company: i.company || null,
      platform: i.platform || "N/A",
      deadline: i.deadline || null,
      applyLink: i.sourceUrl || null,
    }));

    setInternships(prev => {
      const combined = [...prev, ...formatted];

      // 🔥 Deduplicate by _id
      const uniqueMap = new Map();
      combined.forEach(item => {
        uniqueMap.set(item._id, item);
      });

      return Array.from(uniqueMap.values());
    });

  } catch (err) {
    console.error("Failed to fetch internships:", err);
    setHasMore(false);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchInternships(page);
  }, [page]);

  if (loading && page === 1)
    return <p className="text-center mt-10">Loading internships...</p>;
  if (!internships.length)
    return <p className="text-center mt-10">No internships available.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Internships</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {internships.map((intern) => (
          <Card
            key={intern._id}
            item={intern}
            onClick={() => navigate(`/internship/${intern._id}`)}
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