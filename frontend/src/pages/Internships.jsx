import { useEffect, useState } from "react";
import axios from "axios";
import InternshipCard from "../components/InternshipCard";
import { api } from "../utils/API";

export default function Internships() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const { data } = await api.get("/internships");

        const mappedInternships = data.map(i => ({
          _id: i._id,
          title: i.title || "No title",
          company: i.company || "Unknown Company",
          logo: i.logo || null,
          category: i.category || null,
          duration: i.duration || null,
          stipend: i.stipend || null,
          location: i.location || "Remote/Unknown",
          applyBy: i.deadline ? new Date(i.deadline).toLocaleDateString() : null,
          skills: i.skills || [],
          applyLink: i.sourceUrl || null,
          platform: i.platform || "N/A"
        }));

        setInternships(mappedInternships);
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
        {internships.map(intern => (
          <InternshipCard key={intern._id} internship={intern} />
        ))}
      </div>
    </div>
  );
}
