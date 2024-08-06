import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import "../styles/EventDetail.css";

interface EventType {
  id: number;
  name: string;
  created: string;
  host_username: string;
  startdate: string;
  enddate: string;
}

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventType | null>(null);
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem("ACCESS_TOKEN");
        const response = await api.get(`/api/events/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvent(response.data.event);
        setJoined(response.data.is_participant);
      } catch (err) {
        setError("Failed to load event details. Please try again.");
      }
    };

    fetchEvent();
  }, [id]);

  const handleJoin = async () => {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      await api.post(
        `/api/events/${id}/join/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setJoined(true);
    } catch (err) {
      setError("Failed to join the event. Please try again.");
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="event-detail-container">
      <h2>{event.name}</h2>
      <p>Hosted by {event.host_username}</p>
      <p>Starts: {new Date(event.startdate).toLocaleString()}</p>
      <p>Ends: {new Date(event.enddate).toLocaleString()}</p>
      <p>Created on: {new Date(event.created).toLocaleString()}</p>
      {event.description && <p>Description: {event.description}</p>}
      {!joined ? (
        <button onClick={handleJoin} className="join-button">
          Join Event
        </button>
      ) : (
        <button className="join-button" disabled>
          Joined
        </button>
      )}
    </div>
  );
};

export default EventDetail;
