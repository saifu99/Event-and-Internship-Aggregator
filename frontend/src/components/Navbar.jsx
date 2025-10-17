import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
<nav className="bg-blue-600 text-white p-4 flex flex-wrap justify-between items-center">
      <h1 className="font-bold text-xl">CEIA</h1>

      {/* Hamburger button */}
      <button
        className="block md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Three lines */}
        <div className="w-6 h-0.5 bg-white mb-1"></div>
        <div className="w-6 h-0.5 bg-white mb-1"></div>
        <div className="w-6 h-0.5 bg-white"></div>
      </button>

      {/* Links */}
      <div className={`${isOpen ? "block" : "hidden"} w-full md:flex md:w-auto space-x-4 mt-2 md:mt-0`}>
        <Link className="hover:underline block md:inline" to="/">Home</Link>
        <Link className="hover:underline block md:inline" to="/events">Events</Link>
        <Link className="hover:underline block md:inline" to="/internships">Internships</Link>
        <Link className="hover:underline block md:inline" to="/dashboard">Dashboard</Link>
        <Link className="hover:underline block md:inline" to="/login">Login</Link>
      </div>
    </nav>
  );
}


