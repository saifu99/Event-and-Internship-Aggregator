import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import InternshipCard from "../components/InternshipCard";

export default function InternshipDetails() {
  const { id } = useParams();
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/internships/${id}`,
        );

        setInternship({
          _id: data._id,
          title: data.title || "No title",
          company: data.company || "Unknown Company",
          logo: data.logo || null,
          category: data.category || null,
          duration: data.duration || null,
          stipend: data.stipend || null,
          location: data.location || "Remote/Unknown",
          applyBy: data.deadline
            ? new Date(data.deadline).toLocaleDateString()
            : null,
          skills: data.skills || [],
          applyLink: data.sourceUrl || null, // ⭐ THIS LINE FIXES YOUR ISSUE
          platform: data.platform || "N/A",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInternship();
  }, [id]);

  if (loading)
    return <p className="text-center mt-10">Loading internship...</p>;
  if (!internship)
    return <p className="text-center mt-10">Internship not found</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <InternshipCard internship={internship} />
    </div>
  );
}
