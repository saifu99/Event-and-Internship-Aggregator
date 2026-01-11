import { useEffect, useState } from "react";
import Card from "../components/Card";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    //mock data 
    const mockEvents = [
      { id: 1, title: "Hackathon 2025", date: "2025-11-01" },
      { id: 2, title: "Tech Talk", date: "2025-11-15" },
    ];

    const mockInternships = [
      { id: 1, company: "Google", role: "Frontend Intern" },
      { id: 2, company: "Microsoft", role: "Backend Intern" },
    ];

    setEvents(mockEvents);
    setInternships(mockInternships);
  }, []);

  return (
    <div>
    <h1 className="text-2xl bg-green-500">Home Page – shows events & internships</h1>
      <h2>Events</h2>
      {events.map((e) => (
        <Card key={e.id} data={e} />
      ))}

      <h2>Internships</h2>
      {/* {internships.map((i) => (
        <Card key={i.id} data={i} />
      ))} */}

{[...Array(4)].map((_, idx) => ( //repeat 4 times 
  <div key={idx}>
    {internships.map((i) => (
      <Card key={i.id} data={i} />
    ))}
  </div>
))}

    </div>
  );
}


