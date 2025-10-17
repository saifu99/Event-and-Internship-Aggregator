//old footer
// export default function Footer() {
//   return (
//     <footer className="bg-gray-800 text-white py-6 mt-10">
//       <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
//         <p className="text-sm">&copy; 2025 CEIA. All rights reserved.</p>
//         <div className="flex space-x-4 mt-2 md:mt-0">
//           <a href="#" className="hover:text-gray-400">
//             Privacy Policy
//           </a>
//           <a href="#" className="hover:text-gray-400">
//             Terms of Service
//           </a>
//           <a href="#" className="hover:text-gray-400">
//             Contact
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// }

//new footer
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section */}
        <div className="mb-4 md:mb-0">
          <h1 className="font-bold text-xl">CEIA</h1>
          <p className="text-sm text-gray-400">&copy; 2025 CEIA. All rights reserved.</p>
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


