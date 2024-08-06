import React, { useEffect, useState } from "react";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import api from "../api";
import Event from "../components/Event";

interface EventType {
  id: number;
  name: string;
  host_username: string;
  startdate: string;
  enddate: string;
  created: string;
}

const Dashboard: React.FC = () => {
  const [joinedEvents, setJoinedEvents] = useState<EventType[]>([]);
  const [createdEvents, setCreatedEvents] = useState<EventType[]>([]);

  const getJoinedEvents = () => {
    api
      .get("/api/joined-events/")
      .then((res) => setJoinedEvents(res.data))
      .catch((err) => alert(err));
  };

  const getCreatedEvents = () => {
    api
      .get("/api/created-events/")
      .then((res) => setCreatedEvents(res.data))
      .catch((err) => alert(err));
  };

  useEffect(() => {
    getJoinedEvents();
    getCreatedEvents();
  }, []);

  return (
    <Container>
      <Tabs defaultActiveKey="joined" id="dashboard-tabs">
        <Tab eventKey="joined" title="Joined Events">
          <Row>
            {joinedEvents.map((event) => (
              <Col key={event.id} xs={12} md={6} lg={4}>
                <Event e={event} />
              </Col>
            ))}
          </Row>
        </Tab>
        <Tab eventKey="created" title="Created Events">
          <Row>
            {createdEvents.map((event) => (
              <Col key={event.id} xs={12} md={6} lg={4}>
                <Event e={event} />
              </Col>
            ))}
          </Row>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Dashboard;
