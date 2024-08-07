import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import "../styles/EventDetail.css";
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import TicketModal from '../components/TicketModal';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

interface EventType {
  id: number;
  name: string;
  created: string;
  host_username: string;
  startdate: string;
  enddate: string;
  description?: string;
}

interface Ticket {
  id: number;
  name: string;
  price: number;
  available: number;
}

interface SelectedTicket {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventType | null>(null);
  const [joined, setJoined] = useState(false);
  const [ticketSalesData, setTicketSalesData] = useState<any>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTickets, setSelectedTickets] = useState<SelectedTicket[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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
        setTicketSalesData(response.data.ticket_sales_data);
      } catch (err) {
        setError("Failed to load event details. Please try again.");
      }
    };

    fetchEvent();
  }, [id]);

  useEffect(() => {
    if (modalOpen) {
      const fetchTickets = async () => {
        try {
          const token = localStorage.getItem("ACCESS_TOKEN");
          const response = await api.get(`/api/events/${id}/tickets/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setTickets(response.data);
        } catch (err) {
          setError("Failed to load ticket options. Please try again.");
        }
      };

      fetchTickets();
    }
  }, [modalOpen, id]);

  const handleJoin = async () => {
    if (selectedTickets.length === 0) {
      setError("Please select at least one ticket before joining.");
      return;
    }

    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      await api.post(
        `/api/events/${id}/join/`,
        { tickets: selectedTickets },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setJoined(true);
      setModalOpen(false);
    } catch (err) {
      setError("Failed to join the event. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      await api.delete(
        `/api/events/${id}/delete/`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );
      //Add modal later that makes the user confirm their choice
      navigate(`/events/`);
    } catch (err){
      setError("Failed to delete event. Please try again");
    }
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleSelectTickets = (selectedTickets: SelectedTicket[]) => {
    setSelectedTickets(selectedTickets);
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: ticketSalesData
      ? ticketSalesData.map((item: any) => item.ticket_type)
      : [],
    datasets: [
      {
        label: "Tickets Sold",
        data: ticketSalesData
          ? ticketSalesData.map((item: any) => item.count)
          : [],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
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
      <p>
        {ticketSalesData ? (
          <span>
            Tickets Sold:{" "}
            {ticketSalesData.reduce(
              (sum: number, item: any) => sum + item.count,
              0
            )}
          </span>
        ) : (
          ""
        )}
      </p>

      {ticketSalesData && (
        <div className="chart-container">
          <Bar
            data={chartData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
      )}

      {!ticketSalesData ? (
        <div>
          {!joined ? (
            <Button variant="contained" color="primary" onClick={handleOpenModal}>
              Join Event
            </Button>
          ) : (
            <Button variant="contained" disabled>
              Joined
            </Button>
          )}
        </div>
      ) : (
        <Button variant="contained" color="secondary" onClick={handleDelete}>
          Delete Event
        </Button>
      )}

      <TicketModal 
        open={modalOpen} 
        handleClose={handleCloseModal} 
        tickets={tickets} 
        onSelectTickets={handleSelectTickets} 
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleJoin} 
        disabled={selectedTickets.length === 0}
      >
        Confirm Ticket Selection
      </Button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default EventDetail;
