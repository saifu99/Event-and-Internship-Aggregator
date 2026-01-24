// src/pages/Dashboard.jsx
import React from "react";
import { FaUserGraduate, FaCalendarAlt, FaClipboardList, FaBell } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  // Mock data for charts
  const applicationsData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Applications Submitted",
        data: [12, 19, 10, 24],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.2)",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <FaUserGraduate className="text-3xl text-blue-500 mr-4" />
          <div>
            <p className="text-gray-500 text-sm">Total Internships</p>
            <p className="text-xl font-bold">128</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <FaCalendarAlt className="text-3xl text-green-500 mr-4" />
          <div>
            <p className="text-gray-500 text-sm">Upcoming Events</p>
            <p className="text-xl font-bold">24</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <FaClipboardList className="text-3xl text-yellow-500 mr-4" />
          <div>
            <p className="text-gray-500 text-sm">Applications Status</p>
            <p className="text-xl font-bold">76 Pending</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <FaBell className="text-3xl text-red-500 mr-4" />
          <div>
            <p className="text-gray-500 text-sm">Notifications</p>
            <p className="text-xl font-bold">5</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2">Title</th>
                <th className="py-2">Type</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">Frontend Intern at ABC Corp</td>
                <td className="py-2">Internship</td>
                <td className="py-2">Jan 22, 2026</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">React Workshop</td>
                <td className="py-2">Event</td>
                <td className="py-2">Jan 25, 2026</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Analytics / Quick Actions */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Applications Trend</h2>
          <Line data={applicationsData} />
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Quick Actions</h3>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded mb-2">
              Add Internship
            </button>
            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded mb-2">
              Add Event
            </button>
            <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded">
              View My Applications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
