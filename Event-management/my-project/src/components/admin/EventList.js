// src/components/admin/EventList.js
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Loader from '../common/Loader';
import { getAllEvents } from '../../services/eventService';
import { format } from 'date-fns';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEvents(); // returns array of events
        const mappedEvents = data.map((event, index) => {
          // Calculate available seats dynamically if seats array exists
          const bookedSeats = event.seats?.filter(seat => seat.status === 'BOOKED').length || 0;
          const availableSeats = event.totalSeats - bookedSeats;

          return {
            ...event,
            id: event._id || `event-${index}-${Math.random().toString(36).substr(2, 5)}`, // unique ID
            eventDateTime: event.eventDateTime
              ? format(new Date(event.eventDateTime), 'dd/MM/yyyy, hh:mm a')
              : '-',
            bookingStartDate: event.bookingStartDate
              ? format(new Date(event.bookingStartDate), 'dd/MM/yyyy, hh:mm a')
              : '-',
            bookingEndDate: event.bookingEndDate
              ? format(new Date(event.bookingEndDate), 'dd/MM/yyyy, hh:mm a')
              : '-',
            isActive: event.isActive ? 'Yes' : 'No',
            availableSeats,
          };
        });
        setEvents(mappedEvents);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 180 },
    { field: 'name', headerName: 'Name', width: 250 },
    { field: 'venue', headerName: 'Venue', width: 200 },
    { field: 'eventDateTime', headerName: 'Event Date', width: 180 },
    { field: 'totalSeats', headerName: 'Total Seats', width: 120 },
    { field: 'availableSeats', headerName: 'Available Seats', width: 140 },
    { field: 'ticketPrice', headerName: 'Price', width: 120 },
    { field: 'isActive', headerName: 'Active', width: 100 },
  ];

  if (loading) return <Loader />;

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={events}
        columns={columns}
        getRowId={(row) => row.id} // ensures unique row ID
        autoHeight
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </div>
  );
};

export default EventList;
