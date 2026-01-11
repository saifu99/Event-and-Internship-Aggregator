import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import InternshipCard from "../components/InternshipCard";
import eventsData from "../data/events.json";
import internshipsData from "../data/internships.json";
import { Link } from "react-router-dom";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    // load dummy JSON data
    setEvents(eventsData);
    setInternships(internshipsData);
  }, []);

  return (
    <div className="flex flex-col gap-16">
      {/* Hero Section */}
      <section className="text-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6 rounded-b-3xl shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Welcome to CEIA</h1>
        <p className="text-lg max-w-2xl mx-auto mb-6">
          Discover the latest <strong>Events</strong>, <strong>Internships</strong>, and <strong>Opportunities</strong> to grow your career.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/events"
            className="bg-white text-blue-600 font-semibold px-5 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Explore Events
          </Link>
          <Link
            to="/internships"
            className="bg-yellow-400 text-gray-900 font-semibold px-5 py-3 rounded-lg hover:bg-yellow-500 transition"
          >
            Find Internships
          </Link>
        </div>
      </section>

      {/*Events Section */}
      <section className="px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Upcoming Events</h2>
          <Link to="/events" className="text-blue-600 hover:underline">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.length > 0 ? (
            events.slice(0, 3).map((event) => (
              <EventCard key={event._id} event={event} />
            ))
          ) : (
            <p className="text-gray-500">No upcoming events found.</p>
          )}
        </div>
      </section>

      {/*Internships Section */}
      <section className="px-6 mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Trending Internships</h2>
          <Link to="/internships" className="text-blue-600 hover:underline">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {internships.length > 0 ? (
            internships.slice(0, 3).map((internship) => (
              <InternshipCard key={internship._id} internship={internship} />
            ))
          ) : (
            <p className="text-gray-500">No internships available.</p>
          )}
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="bg-gray-100 text-center py-12">
        <h3 className="text-2xl font-semibold mb-3">
          Want to stay updated with the latest opportunities?
        </h3>
        <p className="mb-5 text-gray-600">
          Join our community and get personalized alerts for events and internships.
        </p>
        <Link
          to="/login"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Join Now
        </Link>
      </section>
    </div>
  );
}







