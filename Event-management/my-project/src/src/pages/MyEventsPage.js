import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEventsByOrganizer, deleteEvent } from '../services/eventService';
import { toast } from 'react-toastify';
import { Button, Card, CardContent, Typography, CardActions } from '@mui/material';

const MyEventsPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getEventsByOrganizer();
                setEvents(data);
            } catch (error) {
                toast.error('Failed to fetch your events.');
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await deleteEvent(id);
                setEvents(events.filter(event => event.id !== id));
                toast.success('Event deleted successfully.');
            } catch (error) {
                toast.error('Failed to delete event.');
            }
        }
    };

    if (loading) {
        return <p>Loading your events...</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">My Events</h1>
                <Button component={Link} to="/create-event" variant="contained" color="primary">
                    Create Event
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.length === 0 ? (
                    <p>You have not created any events.</p>
                ) : (
                    events.map((event) => (
                        <Card key={event.id}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {event.name}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {new Date(event.eventDateTime).toLocaleDateString()}
                                </Typography>
                                <Typography variant="body2">
                                    {event.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button component={Link} to={`/edit-event/${event.id}`} size="small">Edit</Button>
                                <Button onClick={() => handleDelete(event.id)} size="small" color="error">Delete</Button>
                            </CardActions>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyEventsPage;
