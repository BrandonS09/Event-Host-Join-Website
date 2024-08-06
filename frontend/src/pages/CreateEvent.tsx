import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // Import the configured axios instance
import { Form, Button, Container, Alert } from "react-bootstrap";
import { ACCESS_TOKEN } from "../constants";
import { useTheme } from "../components/ThemeContext"; // Import useTheme
import "../styles/CreateEvent.css"; // Import your custom CSS for additional styling

interface EventData {
  name: string;
  startdate: string;
  enddate: string;
  description?: string;
}

const CreateEvent: React.FC = () => {
  const [eventData, setEventData] = useState<EventData>({
    name: "",
    startdate: "",
    enddate: "",
    description: "",
  });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const navigate = useNavigate(); // Hook for navigation
  const { theme } = useTheme(); // Get the current theme from context

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const token = localStorage.getItem(ACCESS_TOKEN);

    try {
      await api.post("api/create-event/", eventData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess("Event created successfully!");
      setEventData({
        name: "",
        startdate: "",
        enddate: "",
        description: "",
      });
      navigate("/events"); // Redirect to /events
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <Container className={`create-event-container ${theme}`}>
      {" "}
      {/* Apply theme class here */}
      <h1 className={`create-event-title ${theme}`}>Create Event</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEventName">
          <Form.Label>Event Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={eventData.name}
            onChange={handleChange}
            required
            className={`form-input ${theme}`} // Apply theme class here
          />
        </Form.Group>
        <Form.Group controlId="formEventStartDate">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="datetime-local"
            name="startdate"
            value={eventData.startdate}
            onChange={handleChange}
            required
            className={`form-input ${theme}`} // Apply theme class here
          />
        </Form.Group>
        <Form.Group controlId="formEventEndDate">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="datetime-local"
            name="enddate"
            value={eventData.enddate}
            onChange={handleChange}
            required
            className={`form-input ${theme}`} // Apply theme class here
          />
        </Form.Group>
        <Form.Group controlId="formEventDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={eventData.description}
            onChange={handleChange}
            rows={3}
            className={`form-input ${theme}`} // Apply theme class here
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className={`form-button ${theme}`}
        >
          {" "}
          {/* Apply theme class here */}
          Create Event
        </Button>
      </Form>
    </Container>
  );
};

export default CreateEvent;
