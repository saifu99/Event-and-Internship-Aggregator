import { useParams } from "react-router-dom";
import { mockInternships } from "./Internships";
import Card from "../components/Card";

export default function InternshipDetails() {
  const { id } = useParams();
  const internship = mockInternships.find(i => i.id === parseInt(id));

  if (!internship) return <p>Internship not found</p>;

  return (
    <div className="p-4">
      <Card title={internship.title} date={internship.duration} />
      <p>Description or additional details of the internship can go here.</p>
    </div>
  );
}
