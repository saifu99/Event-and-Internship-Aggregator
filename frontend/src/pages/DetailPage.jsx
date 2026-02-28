import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../utils/API";
import Card from "../components/Card";

export default function DetailPage({ type }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await api.get(`/${type}s/${id}`);
        const data = response?.data; 
        if (!data) throw new Error("Item not found");

        setItem({
          _id: data._id,
          title: data.title || "No title",
          company: data.company || null,
          platform: data.platform || "N/A",
          deadline: data.deadline || null,
          applyLink: data.sourceUrl || null,
        });
      } catch (err) {
        console.error(`${type} detail fetch error:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id, type]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!item) return <p className="text-center mt-10">No {type} found.</p>;

  return (
    <div className="px-6 py-12 max-w-4xl mx-auto flex flex-col gap-6">
      <Card item={item} />
      <button
        onClick={() => navigate(type === "event" ? "/events" : "/internships")}
        className="text-blue-600 font-semibold hover:underline"
      >
        &larr; Back to {type === "event" ? "Events" : "Internships"}
      </button>
    </div>
  );
}