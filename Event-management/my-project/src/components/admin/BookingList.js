// src/components/user/BookingsList.js
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import Loader from '../common/Loader';
import { getBookingsByUser, getAllBookings } from '../../services/bookingService';

const BookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get current logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.role === 'ROLE_ADMIN';

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        let response;

        if (isAdmin) {
          // Admin sees all bookings
          response = await getAllBookings();
        } else {
          // Normal user sees only their bookings
          response = await getBookingsByUser();
        }

        console.log('Bookings API response:', response);

        // Normalize response to an array of bookings
        const rawList = Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response?.bookings)
          ? response.bookings
          : [];

        const mappedData = rawList.map((booking) => ({
          ...booking,
          id: booking.id || booking._id,
          bookingDate: booking.bookingDate
            ? new Date(booking.bookingDate).toLocaleString()
            : undefined,
        }));

        setBookings(mappedData);
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [isAdmin]);

  const columns = [
    { field: 'id', headerName: 'Booking ID', width: 180 },
    { field: 'eventId', headerName: 'Event ID', width: 150 },
    { field: 'numberOfTickets', headerName: 'Tickets', width: 120 },
    { field: 'totalAmount', headerName: 'Amount', width: 120 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'bookingDate', headerName: 'Booking Date', width: 180 },
  ];

  if (loading) return <Loader />;

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={bookings}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        autoHeight
      />
      <div className="mt-4 flex gap-3">
        <Button variant="contained" onClick={() => exportBookingsToExcel(bookings)}>Export Excel</Button>
        <Button variant="outlined" onClick={() => exportBookingsToPdf(bookings)}>Export PDF</Button>
      </div>
    </div>
  );
};

export default BookingsList;

// Helpers
function exportBookingsToExcel(bookings) {
  const rows = bookings.map(({ id, eventId, numberOfTickets, totalAmount, status, bookingDate }) => ({
    'Booking ID': id,
    'Event ID': eventId,
    Tickets: numberOfTickets,
    Amount: totalAmount,
    Status: status,
    'Booking Date': bookingDate,
  }));
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Bookings');
  XLSX.writeFile(workbook, 'bookings.xlsx');
}

function exportBookingsToPdf(bookings) {
  const doc = new jsPDF();
  const columns = ['Booking ID', 'Event ID', 'Tickets', 'Amount', 'Status', 'Booking Date'];
  const data = bookings.map(({ id, eventId, numberOfTickets, totalAmount, status, bookingDate }) => [
    id,
    eventId,
    numberOfTickets,
    totalAmount,
    status,
    bookingDate,
  ]);
  // @ts-ignore
  doc.autoTable({ head: [columns], body: data, styles: { fontSize: 8 } });
  doc.save('bookings.pdf');
}
