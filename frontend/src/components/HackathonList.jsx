// src/components/HackathonList.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function HackathonList() {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/opportunities");
        setHackathons(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch hackathons:", err);
        setLoading(false);
      }
    };

    fetchHackathons();
  }, []);

  if (loading) return <p>Loading hackathons...</p>;
  if (!hackathons.length) return <p>No hackathons available.</p>;

  return (
    <div>
      <h2>Hackathons</h2>
      <ul>
        {hackathons.map(h => (
          <li key={h._id}>
            <a href={h.sourceUrl} target="_blank" rel="noopener noreferrer">
              {h.title}
            </a>
            <p>Platform: {h.platform}</p>
            <p>Deadline: {h.deadline || "N/A"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
