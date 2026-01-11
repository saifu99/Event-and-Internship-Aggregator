import { Link } from "react-router-dom";
import Card from "../components/Card";

const mockInternships = [
  { id: 1, title: "Frontend Intern at Google", duration: "3 months" },
  { id: 2, title: "Backend Intern at Amazon", duration: "6 months" },
  { id: 3, title: "Fullstack Intern at Microsoft", duration: "4 months" },
];

export default function Internships() {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      {mockInternships.map(intern => (
        <Link key={intern.id} to={`/internship/${intern.id}`}>
          <Card data={intern} />
        </Link>
      ))}
    </div>
  );
}

export { mockInternships }; // export for detail page
