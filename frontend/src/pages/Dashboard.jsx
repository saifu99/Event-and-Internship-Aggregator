import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  // example mock data
  const stats = [
    { id: 1, title: "Total Events", value: 12 },
    { id: 2, title: "Total Internships", value: 8 },
    { id: 3, title: "Active Users", value: 150 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard – main landing page after login</h1>
      <p>Welcome! Your upcoming events and internships will appear here.</p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="p-4 border rounded shadow bg-white text-center"
          >
            <h2 className="text-xl font-semibold">{stat.value}</h2>
            <p className="text-gray-600">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-xl font-bold mb-2">Quick Links</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <Link
            to="/events"
            className="p-4 bg-blue-500 text-white rounded shadow hover:bg-blue-600 text-center flex-1"
          >
            View Events
          </Link>
          <Link
            to="/internships"
            className="p-4 bg-green-500 text-white rounded shadow hover:bg-green-600 text-center flex-1"
          >
            View Internships
          </Link>
          <Link
            to="/profile"
            className="p-4 bg-purple-500 text-white rounded shadow hover:bg-purple-600 text-center flex-1"
          >
            Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

