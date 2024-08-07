import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Tile } from "carbon-components-react";
import { ThemeContext } from "./ThemeContext";
import "../styles/Event.css";

interface EventProps {
  e: {
    id: number;
    name: string;
    host_username: string;
    startdate: string;
    enddate: string;
    created: string;
  };
}

const Event: React.FC<EventProps> = ({ e }) => {
  const [dateDisplay, setDateDisplay] = useState<string>("");
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    const formattedStartDate = new Date(e.startdate).toLocaleDateString(
      "en-US"
    );
    const formattedEndDate = new Date(e.enddate).toLocaleDateString("en-US");

    if (formattedStartDate !== formattedEndDate) {
      setDateDisplay(`${formattedStartDate} - ${formattedEndDate}`);
    } else {
      setDateDisplay(formattedStartDate);
    }
  }, [e.startdate, e.enddate]);

  const formattedDate = new Date(e.created).toLocaleDateString("en-US");

  const handleClick = () => {
    navigate(`/events/${e.id}`);
  };

  return (
    <Tile className={`event-tile ${theme}`} onClick={handleClick}>
      <div className="event-content">
        <h3 className="event-title">{e.name}</h3>
        <p>Hosted by {e.host_username}</p>
        <p className="event-date">
          Created on {formattedDate} Occuring {dateDisplay}
        </p>
      </div>
    </Tile>
  );
};

export default Event;
