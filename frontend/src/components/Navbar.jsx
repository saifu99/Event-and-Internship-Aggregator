import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    setIsOpen(false);
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex flex-wrap justify-between items-center">
      <h1 className="font-bold text-xl cursor-pointer" onClick={() => navigate("/")}>EIA</h1>

      {/* HAMBURGER BUTTON */}
      <button
        className="block md:hidden relative w-6 h-6"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`absolute block h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${
            isOpen ? "rotate-45 top-2.5" : "top-0"
          }`}
        ></span>
        <span
          className={`absolute block h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${
            isOpen ? "opacity-0" : "top-2.5"
          }`}
        ></span>
        <span
          className={`absolute block h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${
            isOpen ? "-rotate-45 top-2.5" : "top-5"
          }`}
        ></span>
      </button>

      {/* LINKS */}
      <div
        className={`${isOpen ? "block" : "hidden"} w-full md:flex md:w-auto space-x-4 mt-2 md:mt-0`}
      >
        <Link className="hover:underline block md:inline" to="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link className="hover:underline block md:inline" to="/events" onClick={() => setIsOpen(false)}>Events</Link>
        <Link className="hover:underline block md:inline" to="/internships" onClick={() => setIsOpen(false)}>Internships</Link>
        <Link className="hover:underline block md:inline" to={token ? "/dashboard" : "/login"} onClick={() => setIsOpen(false)}>Dashboard</Link>

        {token ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white block md:inline"
          >
            Logout
          </button>
        ) : (
          <Link className="hover:underline block md:inline" to="/login" onClick={() => setIsOpen(false)}>Login</Link>
        )}
      </div>
    </nav>
  );
}
