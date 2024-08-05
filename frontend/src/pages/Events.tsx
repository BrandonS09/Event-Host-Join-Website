import React, { useEffect, useState } from "react"
import api from "../api";
import Event from "../components/Event";


interface EventType {
    id: number;
    name: string;
    created: string;
}

const Events: React.FC = () => {
    const [events, setEvents] = useState<EventType[]>([]);

    const getEvents = () => {
        api.get("/api/events/").then((res) => res.data).then((data) => {
            setEvents(data);
            console.log(data);
        }).catch((err) => alert(err));
    }

    useEffect(() => {
        getEvents();
    }, []);
    return (
        <div>
           <div>
            <h2>Events</h2>
            <div className="event-container">
                
            </div>
            {events.map((e) => (
                //Event Component here
                <Event e={e} key={e.id}/>
            ))}
            </div> 
        </div>
    )
}

export default Events