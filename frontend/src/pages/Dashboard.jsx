import React, { useEffect, useState } from "react";
import {
  FaUserGraduate,
  FaCalendarAlt,
  FaClipboardList,
  FaBell,
} from "react-icons/fa";
import axios from "axios";
import { api } from "../utils/API";

const Dashboard = () => {
  const [stats, setStats] = useState({
    internships: 0,
    events: 0,
    pendingApplications: 0,
    notifications: 0,
  });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    //FETCH LOGGED-IN USER
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedUser || null);

    const fetchDashboardData = async () => {
      try {
        const [
          { data: internshipsData },
          { data: eventsData },
          { data: applicationsData },
          { data: notificationsData },
        ] = await Promise.all([
          api.get("/dashboard/internships/count"),
          api.get("/dashboard/events/count"),
          api.get("/dashboard/applications?status=pending"),
          api.get("/dashboard/notifications"),
        ]);

        setStats({
          internships: internshipsData.count || 0,
          events: eventsData.count || 0,
          pendingApplications: applicationsData.count || 0,
          notifications: notificationsData.count || 0,
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
      {/* GREETING */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Welcome back, {user?.username || "User"}!
        </h1>
        <p className="text-gray-600">Here’s your dashboard overview.</p>
      </div>

      {/* TOP METRICES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Metric
          icon={<FaUserGraduate />}
          label="Total Internships"
          value={stats.internships}
          color="blue"
        />
        <Metric
          icon={<FaCalendarAlt />}
          label="Upcoming Events"
          value={stats.events}
          color="green"
        />
        <Metric
          icon={<FaClipboardList />}
          label="Applications Pending"
          value={stats.pendingApplications}
          color="yellow"
        />
        <Metric
          icon={<FaBell />}
          label="Notifications"
          value={stats.notifications}
          color="red"
        />
      </div>
    </div>
  );
};

// REUSABLE COMPONENTS FOR METRICES
const Metric = ({ icon, label, value, color }) => (
  <div className="bg-white p-4 rounded-lg shadow flex items-center">
    <div className={`text-3xl mr-4 text-${color}-500`}>{icon}</div>
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
);

export default Dashboard;
