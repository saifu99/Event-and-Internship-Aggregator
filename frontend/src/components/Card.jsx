export default function Card({ data }) { // Card.jsx – To display event or internship cards
  // For events
  return (
    <div className="border p-4 rounded shadow mb-4">
      {data.title && <h3 className="font-bold text-lg">{data.title}</h3>}
      {data.date && <p className="text-gray-500">{data.date}</p>}
      {data.location && <p className="text-gray-500">{data.location}</p>}
       {data.description && <p className="text-gray-500">{data.description}</p>}

      {/* For internships */}
      {data.company && <h3 className="font-bold text-lg">{data.company}</h3>}
      {data.category && <p className="text-red-500">{data.category}</p>}
    </div>
  );
}





// export default function Card({ data }) {
//   return (
//     <div className="border p-4 rounded-lg shadow hover:shadow-md transition">
//       <div className="flex items-center gap-3">
//         {data.logo && (
//           <img src={data.logo} alt={data.company} className="w-12 h-12 rounded" />
//         )}
//         <div>
//           <h3 className="font-bold text-lg">{data.title}</h3>
//           {data.company && <p className="text-gray-600">{data.company}</p>}
//         </div>
//       </div>

//       {data.category && <p className="text-blue-600 mt-2">{data.category}</p>}
//       {data.duration && <p>⏳ {data.duration}</p>}
//       {data.stipend && <p>💰 {data.stipend}</p>}
//       {data.location && <p>📍 {data.location}</p>}
//       {data.applyBy && <p>🗓️ Apply by: {data.applyBy}</p>}
//       {data.skills && (
//         <div className="mt-2 flex flex-wrap gap-2">
//           {data.skills.map((skill, index) => (
//             <span key={index} className="bg-gray-200 text-sm px-2 py-1 rounded">
//               {skill}
//             </span>
//           ))}
//         </div>
//       )}
//       {data.applyLink && (
//         <a
//           href={data.applyLink}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-white bg-green-600 hover:bg-green-700 px-3 py-2 mt-3 inline-block rounded"
//         >
//           Apply Now
//         </a>
//       )}
//     </div>
//   );
// }
