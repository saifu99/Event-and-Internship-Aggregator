import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section */}
        <div className="mb-4 md:mb-0">
          <h1 className="font-bold text-xl">EIA</h1>
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} EIA. All rights reserved.</p>
        </div>

        {/* Center Section: Links */}
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a href="#" className="hover:text-gray-400">Home</a>
          <a href="#" className="hover:text-gray-400">Events</a>
          <a href="#" className="hover:text-gray-400">Internships</a>
          <a href="#" className="hover:text-gray-400">Dashboard</a>
        </div>

        {/* Right Section: Social Icons */}
        <div className="flex space-x-4">
          <a href="#" className="hover:text-blue-500"><FaFacebookF /></a>
          <a href="#" className="hover:text-blue-400"><FaTwitter /></a>
          <a href="#" className="hover:text-blue-700"><FaLinkedinIn /></a>
          <a href="#" className="hover:text-pink-500"><FaInstagram /></a>
        </div>
      </div>
    </footer>
  );
}


