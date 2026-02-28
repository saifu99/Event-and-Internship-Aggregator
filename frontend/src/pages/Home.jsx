import { useEffect, useState } from "react"; 
import Card from "../components/Card";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../utils/API";

export default function Home() {
  const navigate = useNavigate();
  const [internships, setInternships] = useState([]);
  const [hackathons, setHackathons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsResponse = await api.get("/events?page=1&limit=9");
        const eventsArray = Array.isArray(eventsResponse?.data?.data)
          ? eventsResponse.data.data
          : [];
        setHackathons(
          eventsArray.map((h) => ({
            _id: h._id,
            title: h.title || "No title",
            platform: h.platform || "N/A",
            deadline: h.deadline || null,
            applyLink: h.sourceUrl || null,
          }))
        );

        const internshipsResponse = await api.get("/internships?page=1&limit=9");
        const internshipsArray = Array.isArray(internshipsResponse?.data?.data)
          ? internshipsResponse.data.data
          : [];
        setInternships(
          internshipsArray.map((i) => ({
            _id: i._id,
            title: i.title || "No title",
            company: i.company || null,
            platform: i.platform || "N/A",
            deadline: i.deadline || null,
            applyLink: i.sourceUrl || null,
          }))
        );
      } catch (err) {
        console.error("Home fetch error:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-16">
      {/* HERO */}
      <section className="text-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6 rounded-b-3xl shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Welcome to EIA</h1>
        <p className="text-lg max-w-2xl mx-auto mb-6">
          Discover the latest Events, Internships, and Opportunities to grow your career.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/events"
            className="bg-white text-blue-600 font-semibold px-5 py-3 rounded-lg"
          >
            Explore Events
          </Link>
          <Link
            to="/internships"
            className="bg-yellow-400 text-gray-900 font-semibold px-5 py-3 rounded-lg"
          >
            Find Internships
          </Link>
        </div>
      </section>

      {/* EVENTS/HACKATHONS */}
      <section className="px-6 mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Latest Events or Hackathons</h2>
          <Link to="/events" className="text-blue-600 font-semibold hover:underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hackathons.length > 0 ? (
            hackathons.slice(0, 3).map((h) => (
              <Link key={h._id} to={`/event/${h._id}`}>
                <Card item={h} />
              </Link>
            ))
          ) : (
            <p>No events available.</p>
          )}
        </div>
      </section>

      {/* INTERNSHIPS */}
      <section className="px-6 mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Trending Internships</h2>
          <Link
            to="/internships"
            className="text-blue-600 font-semibold hover:underline"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {internships.length > 0 ? (
            internships.slice(0, 3).map((i) => (
              <Link key={i._id} to={`/internship/${i._id}`}>
                <Card item={i} />
              </Link>
            ))
          ) : (
            <p>No internships available.</p>
          )}
        </div>
      </section>

      {/* BOTTOM CALL-TO-ACTION */}
      <section className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white py-20 px-6 text-center rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-3xl font-bold mb-4">
          Want to stay updated with the latest opportunities?
        </h2>
        <p className="text-lg mb-8 max-w-xl mx-auto">
          Join our community and get personalized alerts for hackathons and internships.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="bg-white text-purple-700 font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition"
        >
          Join Now
        </button>
      </section>
    </div>
  );
}