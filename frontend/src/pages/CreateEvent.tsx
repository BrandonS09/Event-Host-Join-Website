import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import api from "../api";
import { useTheme } from "../components/ThemeContext";
import "../styles/CreateEvent.css";

const EventCreate: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [tickets, setTickets] = useState([
    { ticket_type: "", price: "", quantity: "" },
  ]);
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleTicketChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const values = [...tickets];
    values[index][event.target.name] = event.target.value;
    setTickets(values);
  };

  const handleAddTicket = () => {
    setTickets([...tickets, { ticket_type: "", price: "", quantity: "" }]);
  };

  const handleRemoveTicket = (index: number) => {
    const values = [...tickets];
    values.splice(index, 1);
    setTickets(values);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const eventData = {
      name,
      description,
      startdate,
      enddate,
      tickets,
    };

    try {
      await api.post("/api/create-event/", eventData);
      navigate("/events");
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <Container className={`create-event-container ${theme}`}>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="formName">
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter event name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`form-input ${theme}`}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter event description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`form-input ${theme}`}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="formStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="datetime-local"
                value={startdate}
                onChange={(e) => setStartdate(e.target.value)}
                className={`form-input ${theme}`}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formEndDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="datetime-local"
                value={enddate}
                onChange={(e) => setEnddate(e.target.value)}
                className={`form-input ${theme}`}
              />
            </Form.Group>
          </Col>
        </Row>
        <h5>Tickets</h5>
        {tickets.map((ticket, index) => (
          <Row key={index} className="align-items-end">
            <Col>
              <Form.Group controlId={`formTicketType${index}`}>
                <Form.Label>Ticket Type</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter ticket type"
                  name="ticket_type"
                  value={ticket.ticket_type}
                  onChange={(e) => handleTicketChange(index, e)}
                  className={`form-input ${theme}`}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId={`formTicketPrice${index}`}>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter ticket price"
                  name="price"
                  value={ticket.price}
                  onChange={(e) => handleTicketChange(index, e)}
                  className={`form-input ${theme}`}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId={`formTicketQuantity${index}`}>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter ticket quantity"
                  name="quantity"
                  value={ticket.quantity}
                  onChange={(e) => handleTicketChange(index, e)}
                  className={`form-input ${theme}`}
                />
              </Form.Group>
            </Col>
            <Col>
              <Button
                variant="danger"
                type="button"
                onClick={() => handleRemoveTicket(index)}
              >
                Remove
              </Button>
            </Col>
          </Row>
        ))}
        <Button variant="primary" type="button" onClick={handleAddTicket}>
          Add Ticket
        </Button>
        <Button variant="primary" type="submit">
          Create Event
        </Button>
      </Form>
    </Container>
  );
};

export default EventCreate;
