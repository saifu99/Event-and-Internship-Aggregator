import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">

        {/* LEFT: BRANDING */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h1 className="font-bold text-xl">EIA</h1>
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} EIA. All rights reserved.</p>
        </div>

        {/* CENTER: NAVIGATION */}
        <div className="flex flex-wrap justify-center space-x-6">
          <Link to="/" className="hover:text-gray-400 transition-colors duration-200">Home</Link>
          <Link to="/events" className="hover:text-gray-400 transition-colors duration-200">Events</Link>
          <Link to="/internships" className="hover:text-gray-400 transition-colors duration-200">Internships</Link>
          <Link to="/dashboard" className="hover:text-gray-400 transition-colors duration-200">Dashboard</Link>
        </div>

      </div>
    </footer>
  );
}
