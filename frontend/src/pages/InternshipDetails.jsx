import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";

export default function InternshipDetails() {
  const { id } = useParams();
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/internships/${id}`);
        setInternship(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchInternship();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading internship...</p>;
  if (!internship) return <p className="text-center mt-10">Internship not found</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card title={internship.title} date={internship.deadline ? new Date(internship.deadline).toLocaleString("en-IN") : "N/A"} />
      <p className="mt-4 text-gray-700">
        Company: {internship.company}<br />
        Platform: {internship.platform}<br />
        Type: {internship.type || "N/A"}
      </p>
      <a
        href={internship.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Apply Now
      </a>
    </div>
  );
}
