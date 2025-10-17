import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Internships from "./pages/Internships";
import InternshipDetails from "./pages/internshipDetails";
import Dashboard from "./pages/dashboard";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} /> // all events list
        <Route path="/event/:idv" element={<EventDetails />} /> // single event
        <Route path="/internships" element={<Internships />} />
        <Route path="/internship/:idv" element={<InternshipDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/navbar" element={<Navbar />} />
      </Routes>
       </main>
      <Footer/>
    </div>
  );
}

export default App;
