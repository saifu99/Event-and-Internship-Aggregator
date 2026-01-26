import React, { useEffect, useState } from "react";
import { FaUserGraduate, FaCalendarAlt, FaClipboardList, FaBell } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import axios from "axios";
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
  const [stats, setStats] = useState({
    internships: 0,
    events: 0,
    pendingApplications: 0,
    notifications: 0,
    activity: [],
    chartData: { labels: [], data: [] },
  });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // <-- added

  useEffect(() => {
    // Fetch logged-in user for greeting
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedUser || null);

    const fetchDashboardData = async () => {
      try {
        const [
          { data: internshipsData },
          { data: eventsData },
          { data: applicationsData },
          { data: notificationsData },
          { data: activityData },
          { data: weeklyData },
        ] = await Promise.all([
          axios.get("http://localhost:5000/api/dashboard/internships/count"),
          axios.get("http://localhost:5000/api/dashboard/opportunities/count"),
          axios.get("http://localhost:5000/api/dashboard/applications?status=pending"),
          axios.get("http://localhost:5000/api/dashboard/notifications"),
          axios.get("http://localhost:5000/api/dashboard/users/activity"),
          axios.get("http://localhost:5000/api/dashboard/applications/weekly"),
        ]);

        setStats({
          internships: internshipsData.count,
          events: eventsData.count,
          pendingApplications: applicationsData.count,
          notifications: notificationsData.count,
          activity: activityData.activity,
          chartData: {
            labels: weeklyData.labels,
            datasets: [
              {
                label: "Applications Submitted",
                data: weeklyData.data,
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59,130,246,0.2)",
              },
            ],
          },
        });

      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading dashboard...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Greeting */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Welcome back, {user?.username || "User"}!
        </h1>
        <p className="text-gray-600">Here’s your dashboard overview.</p>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <FaUserGraduate className="text-3xl text-blue-500 mr-4" />
          <div>
            <p className="text-gray-500 text-sm">Total Internships</p>
            <p className="text-xl font-bold">{stats.internships}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <FaCalendarAlt className="text-3xl text-green-500 mr-4" />
          <div>
            <p className="text-gray-500 text-sm">Upcoming Events</p>
            <p className="text-xl font-bold">{stats.events}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <FaClipboardList className="text-3xl text-yellow-500 mr-4" />
          <div>
            <p className="text-gray-500 text-sm">Applications Status</p>
            <p className="text-xl font-bold">{stats.pendingApplications} Pending</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <FaBell className="text-3xl text-red-500 mr-4" />
          <div>
            <p className="text-gray-500 text-sm">Notifications</p>
            <p className="text-xl font-bold">{stats.notifications}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          {stats.activity.length === 0 ? (
            <p className="text-gray-500">No recent activity</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Title</th>
                  <th className="py-2">Type</th>
                  <th className="py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.activity.map((act, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="py-2">{act.title}</td>
                    <td className="py-2">{act.type}</td>
                    <td className="py-2">{act.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Analytics / Quick Actions */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Applications Trend</h2>
          <Line data={stats.chartData} />
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
