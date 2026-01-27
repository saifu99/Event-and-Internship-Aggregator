import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  //Check if user is logged in
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex flex-wrap justify-between items-center">
      <h1 className="font-bold text-xl cursor-pointer" onClick={() => navigate("/")}>EIA</h1>

      {/* Hamburger button */}
      <button className="block md:hidden" onClick={() => setIsOpen(!isOpen)}>
        <div className="w-6 h-0.5 bg-white mb-1"></div>
        <div className="w-6 h-0.5 bg-white mb-1"></div>
        <div className="w-6 h-0.5 bg-white"></div>
      </button>

      {/* Links */}
      <div className={`${isOpen ? "block" : "hidden"} w-full md:flex md:w-auto space-x-4 mt-2 md:mt-0`}>
        <Link className="hover:underline block md:inline" to="/">Home</Link>
        <Link className="hover:underline block md:inline" to="/events">Events</Link>
        <Link className="hover:underline block md:inline" to="/internships">Internships</Link>

        {/* Dashboard link */}
        <Link
          className="hover:underline block md:inline"
          to={token ? "/dashboard" : "/login"}
        >
          Dashboard
        </Link>

        {/* Auth Buttons */}
        {token ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white block md:inline"
          >
            Logout
          </button>
        ) : (
          <Link className="hover:underline block md:inline" to="/login">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
