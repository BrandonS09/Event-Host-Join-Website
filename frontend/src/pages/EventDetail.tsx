import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import "../styles/EventDetail.css";

// Register necessary Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

interface EventType {
  id: number;
  name: string;
  created: string;
  host_username: string;
  startdate: string;
  enddate: string;
  description?: string;
}

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventType | null>(null);
  const [joined, setJoined] = useState(false);
  const [ticketSalesData, setTicketSalesData] = useState<any>(null); // Change to appropriate type
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
        setTicketSalesData(response.data.ticket_sales_data); // Adjust based on your response data
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

  const chartData = {
    labels: ticketSalesData ? ticketSalesData.map((item: any) => item.ticket_type) : [],
    datasets: [
      {
        label: 'Tickets Sold',
        data: ticketSalesData ? ticketSalesData.map((item: any) => item.count) : [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="event-detail-container">
      <h2>{event.name}</h2>
      <p>Hosted by {event.host_username}</p>
      <p>Starts: {new Date(event.startdate).toLocaleString()}</p>
      <p>Ends: {new Date(event.enddate).toLocaleString()}</p>
      <p>Created on: {new Date(event.created).toLocaleString()}</p>
      {event.description && <p>Description: {event.description}</p>}
      <p>Tickets Sold: {ticketSalesData ? ticketSalesData.reduce((sum: number, item: any) => sum + item.count, 0) : "N/A"}</p>
      
      {ticketSalesData && (
        <div className="chart-container">
          <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      )}

      {!joined ? (
        <button onClick={handleJoin} className="join-button">
          Join Event
        </button>
      ) : (
        <button className="join-button" disabled>
          Joined
        </button>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default EventDetail;
