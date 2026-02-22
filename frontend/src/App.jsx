import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Internships from "./pages/Internships";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import DetailPage from "./pages/DetailPage"; // new unified detail page

export default function App() {
  useEffect(() => {
    fetch("https://event-and-internship-aggregator-production.up.railway.app/health")
      .then(() => console.log("Backend awake"))
      .catch(() => {});
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/event/:id" element={<DetailPage type="event" />} /> {/* unified detail */}
          <Route path="/internships" element={<Internships />} />
          <Route path="/internship/:id" element={<DetailPage type="internship" />} /> {/* unified detail */}
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/navbar" element={<Navbar />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}