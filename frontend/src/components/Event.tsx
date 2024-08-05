import React from 'react';
import { Tile } from 'carbon-components-react';
import './Event.css'; // Import your custom CSS for additional styling

interface EventProps {
    e: {
        id: number;
        name: string;
        host_username: string;
        created: string;
    }
}

const Event: React.FC<EventProps> = ({ e }) => {
    const formattedDate = new Date(e.created).toLocaleDateString("en-US");

    return (
        <Tile className="event-tile">
            <div className="event-content">
                <h3 className="event-title">{e.name}</h3>
                <p>Hosted by {e.host_username}</p>
                <p className="event-date">created on {formattedDate}</p>
            </div>
        </Tile>
    );
}

export default Event;
