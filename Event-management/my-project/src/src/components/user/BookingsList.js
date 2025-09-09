import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, Box, Chip } from '@mui/material';
import Loader from '../common/Loader';
import { getBookingsByUser } from '../../services/bookingService';
import { VscCalendar, VscCheck, VscError, VscWatch } from 'react-icons/vsc';

const BookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentBg, setCurrentBg] = useState(0);
  
  const backgroundImages = [
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1540575467063-178a50fc2cf7?auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=2069&q=80'
  ];

  // Background carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Fetch bookings
  useEffect(() => {
    getBookingsByUser()
      .then((res) => {
        console.log("Bookings API response:", res);

        if (Array.isArray(res)) {
          setBookings(res);
        } else if (Array.isArray(res?.data)) {
          setBookings(res.data);
        } else if (Array.isArray(res?.bookings)) {
          setBookings(res.bookings);
        } else {
          setBookings([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
        setBookings([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'CONFIRMED':
        return <VscCheck className="text-green-600" />;
      case 'CANCELLED':
        return <VscError className="text-red-600" />;
      default:
        return <VscWatch className="text-yellow-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Carousel */}
      <div 
        className="fixed inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${backgroundImages[currentBg]})` }}
      ></div>
      
      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-60"></div>
      
      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 transform transition-all duration-300 hover:scale-[1.01]">
          <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mr-4">
              <VscCalendar className="h-7 w-7 text-white" />
            </div>
            <Typography 
              variant="h4" 
              className="text-2xl font-bold text-gray-800"
            >
              My Bookings
            </Typography>
          </div>
          
          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-lg">
                  <VscCalendar className="h-10 w-10 text-white" />
                </div>
              </div>
              <Typography 
                variant="h6" 
                className="text-xl font-bold text-gray-800 mb-2"
              >
                No Bookings Found
              </Typography>
              <Typography 
                variant="body1" 
                className="text-gray-600"
              >
                You haven't made any bookings yet. Explore our events and book your first experience!
              </Typography>
            </div>
          ) : (
            <Paper elevation={0} className="overflow-hidden rounded-xl">
              <Table className="min-w-full">
                <TableHead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <TableRow>
                    <TableCell className="font-bold text-gray-700">Booking ID</TableCell>
                    <TableCell className="font-bold text-gray-700">Event ID</TableCell>
                    <TableCell className="font-bold text-gray-700">Status</TableCell>
                    <TableCell className="font-bold text-gray-700">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow 
                      key={booking.id} 
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <TableCell className="font-medium text-gray-800">
                        #{booking.id}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {booking.eventId}
                      </TableCell>
                      <TableCell>
                        <Box className="flex items-center">
                          <span className="mr-2">{getStatusIcon(booking.status)}</span>
                          <Chip 
                            label={booking.status} 
                            size="small"
                            className={getStatusColor(booking.status)}
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                            View
                          </button>
                          <button className="text-green-600 hover:text-green-800 font-medium transition-colors">
                            Confirm
                          </button>
                          <button className="text-red-600 hover:text-red-800 font-medium transition-colors">
                            Cancel
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingsList;
