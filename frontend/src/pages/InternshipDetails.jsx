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
          `http://localhost:5000/api/internships/${id}`
        );
        setInternship(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInternship();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading internship...</p>;
  if (!internship) return <p className="text-center mt-10">Internship not found</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <InternshipCard internship={internship} />
    </div>
  );
}
