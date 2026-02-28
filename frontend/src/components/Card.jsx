export default function Card({ item, onClick }) {
  return (
    <div
      onClick={onClick}
      className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer"
    >
      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
      {item.company && <p className="text-gray-600 mb-1">{item.company}</p>}
      <p className="text-gray-500 mb-2">Platform: {item.platform || "N/A"}</p>
      {item.deadline && (
        <p className="text-gray-500 mb-2">
          Deadline: {new Date(item.deadline).toLocaleDateString()}
        </p>
      )}
      {item.applyLink && (
        <span
          onClick={(e) => {
            e.stopPropagation(); //PREVENT OUTER ONCLICK
            window.open(item.applyLink, "_blank");
          }}
          className="text-blue-600 font-semibold hover:underline cursor-pointer"
        >
          Apply Now
        </span>
      )}
    </div>
  );
}