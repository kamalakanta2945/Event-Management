// src/components/admin/EventList.js
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Loader from '../common/Loader';
import { getAllEvents } from '../../services/eventService';
import { format } from 'date-fns';
import * as XLSX from 'xlsx';

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
      <div className="mt-4 flex gap-3">
        <Button variant="contained" onClick={() => exportEventsToExcel(events)}>Export Excel</Button>
        <Button variant="outlined" onClick={() => exportEventsToPdf(events)}>Export PDF</Button>
      </div>
    </div>
  );
};

export default EventList;

// Helpers
function exportEventsToExcel(events) {
  const rows = events.map(({ id, name, venue, eventDateTime, totalSeats, availableSeats, ticketPrice, isActive }) => ({
    ID: id,
    Name: name,
    Venue: venue,
    'Event Date': eventDateTime,
    'Total Seats': totalSeats,
    'Available Seats': availableSeats,
    Price: ticketPrice,
    Active: isActive,
  }));
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Events');
  XLSX.writeFile(workbook, 'events.xlsx');
}

function exportEventsToPdf(events) {
  const doc = new jsPDF();
  const columns = ['ID', 'Name', 'Venue', 'Event Date', 'Total Seats', 'Available Seats', 'Price', 'Active'];
  const data = events.map(({ id, name, venue, eventDateTime, totalSeats, availableSeats, ticketPrice, isActive }) => [
    id,
    name,
    venue,
    eventDateTime,
    totalSeats,
    availableSeats,
    ticketPrice,
    isActive,
  ]);
  // @ts-ignore
  doc.autoTable({ head: [columns], body: data, styles: { fontSize: 8 } });
  doc.save('events.pdf');
}
