import React, { useState, useEffect } from 'react';
import { Tile } from 'carbon-components-react';
import './Event.css'; // Import your custom CSS for additional styling

interface EventProps {
    e: {
        id: number;
        name: string;
        host_username: string;
        startdate: string;
        enddate: string;
        created: string;
    }
}

const Event: React.FC<EventProps> = ({ e }) => {
    const [dateDisplay, setDateDisplay] = useState<string>('');

    useEffect(() => {
        const formattedStartDate = new Date(e.startdate).toLocaleDateString("en-US");
        const formattedEndDate = new Date(e.enddate).toLocaleDateString("en-US");

        if (formattedStartDate !== formattedEndDate) {
            setDateDisplay(`${formattedStartDate} - ${formattedEndDate}`);
        } else {
            setDateDisplay(formattedStartDate);
        }
    }, [e.startdate, e.enddate]);

    const formattedDate = new Date(e.created).toLocaleDateString("en-US");

    return (
        <Tile className="event-tile">
            <div className="event-content">
                <h3 className="event-title">{e.name}</h3>
                <p>Hosted by {e.host_username}</p>
                <p className="event-date">Created on {formattedDate} Occuring {dateDisplay}</p>
            </div>
        </Tile>
    );
}

export default Event;
