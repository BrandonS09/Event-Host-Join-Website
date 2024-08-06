import React, { useEffect, useState } from "react";
import api from "../api";
import Event from "../components/Event";
import "../styles/Events.css";

interface EventType {
  id: number;
  name: string;
  host_username: string;
  created: string;
}

const Events: React.FC = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const getEvents = () => {
    api
      .get("/api/events/")
      .then((res) => res.data)
      .then((data) => {
        setEvents(data);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    getEvents();
  }, []);

  // Filter events based on search term
  const filteredEvents = events.filter((event) => {
    if (searchTerm.startsWith("host:")) {
      const hostSearch = searchTerm.slice(5).toLowerCase().trim();
      return event.host_username.toLowerCase().includes(hostSearch);
    }
    return event.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="events-page">
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="event-container">
        {filteredEvents.map((e) => {
          return <Event e={e} key={e.id} />;
        })}
      </div>
    </div>
  );
};

export default Events;
