// src/components/user/BookingsList.js
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
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

        // Map _id to id for DataGrid
        const mappedData = response.data.map((booking) => ({
          ...booking,
          id: booking._id,
          bookingDate: new Date(booking.bookingDate).toLocaleString(),
        }));

        setBookings(mappedData);
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
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
    </div>
  );
};

export default BookingsList;
