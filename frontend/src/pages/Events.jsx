import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { mockEvents, mockInternships } from "../data/mockData";
import EventFilter from "../components/EventFilter";

export default function Events() {
  const [filterType, setFilterType] = useState("all");

  const allData = [...mockEvents, ...mockInternships];
  const filteredData = filterType === "all" ? allData : allData.filter(item => item.type === filterType);

  return (
    <div className="p-4">
      <EventFilter filterType={filterType} setFilterType={setFilterType} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredData.map(item => (
          <Link
            key={item.id}
            to={item.type === "internship" ? `/internship/${item.id}` : `/event/${item.id}`}
          >
            <Card data={item} />
          </Link>
        ))}
      </div>
    </div>
  );
}

