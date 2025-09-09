// import { useState } from 'react';
// import { Button, Typography, Box, Paper } from '@mui/material';
// import { selectSeats } from '../../services/bookingService';
// import { VscCheck, VscChromeClose } from 'react-icons/vsc';

// const SeatSelection = ({ eventId }) => {
//   const [selectedSeats, setSelectedSeats] = useState([]);
  
//   const toggleSeat = (seat) => {
//     setSelectedSeats((prev) => 
//       prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
//     );
//   };

//   const onSubmit = async () => {
//     try {
//       await selectSeats({ eventId, seatNumbers: selectedSeats });
//     } catch (err) {
//       // Handle
//     }
//   };

//   // Assume seats from event.availableSeats
//   const seats = ['A1', 'A2', /* ... */]; // Fetch from event

//   return (
//     <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl">
//       <Paper 
//         elevation={8} 
//         className="bg-white bg-opacity-90 backdrop-blur-lg rounded-xl p-6 transform transition-all duration-300 hover:scale-[1.01]"
//       >
//         <div className="flex items-center mb-6">
//           <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mr-4">
//             <VscCheck className="h-6 w-6 text-white" />
//           </div>
//           <Typography 
//             variant="h5" 
//             className="text-xl font-bold text-gray-800"
//           >
//             Select Your Seats
//           </Typography>
//         </div>
        
//         <div className="mb-6">
//           <div className="flex items-center justify-center mb-4">
//             <div className="w-3/4 h-1 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full"></div>
//           </div>
//           <Typography 
//             variant="body2" 
//             className="text-center text-gray-600 mb-4"
//           >
//             Screen
//           </Typography>
//         </div>
        
//         <div className="grid grid-cols-10 gap-3 mb-8">
//           {seats.map((seat) => (
//             <Button
//               key={seat}
//               variant={selectedSeats.includes(seat) ? "contained" : "outlined"}
//               onClick={() => toggleSeat(seat)}
//               className={`h-12 rounded-lg transition-all duration-300 transform hover:scale-110 ${
//                 selectedSeats.includes(seat) 
//                   ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md' 
//                   : 'border-blue-300 text-blue-600 hover:bg-blue-50'
//               }`}
//             >
//               {seat}
//             </Button>
//           ))}
//         </div>
        
//         <div className="flex justify-between items-center mb-4">
//           <div className="flex items-center">
//             <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded mr-2"></div>
//             <Typography variant="body2" className="text-gray-600">Selected</Typography>
//           </div>
//           <div className="flex items-center">
//             <div className="w-4 h-4 border border-blue-300 rounded mr-2"></div>
//             <Typography variant="body2" className="text-gray-600">Available</Typography>
//           </div>
//         </div>
        
//         <Button 
//           onClick={onSubmit} 
//           variant="contained" 
//           fullWidth 
//           className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
//         >
//           Select Seats
//         </Button>
//       </Paper>
//     </div>
//   );
// };

// export default SeatSelection;

// import { useState, useMemo, useCallback, memo, useEffect } from 'react';
// import { Button, Typography, Box, Paper, CircularProgress, Alert } from '@mui/material';
// import { selectSeats, getBookingsByEventId } from '../../services/bookingService';
// import { VscCheck, VscChromeClose, VscRefresh } from 'react-icons/vsc';

// // Memoized seat component to prevent unnecessary re-renders
// const Seat = memo(({ seat, isSelected, isAvailable, onClick }) => (
//   <Button
//     variant={isSelected ? "contained" : "outlined"}
//     onClick={() => isAvailable && onClick(seat)}
//     disabled={!isAvailable}
//     className={`h-10 w-10 rounded transition-all duration-300 transform hover:scale-110 ${
//       isSelected 
//         ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md' 
//         : isAvailable 
//           ? 'border-blue-300 text-blue-600 hover:bg-blue-50' 
//           : 'border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed'
//     }`}
//   >
//     {seat}
//   </Button>
// ));

// const SeatSelection = ({ eventId }) => {
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [unavailableSeats, setUnavailableSeats] = useState([]);
//   const [isRefreshing, setIsRefreshing] = useState(false);
  
//   // Generate a large number of seats (26 rows x 20 seats = 520 seats)
//   const seats = useMemo(() => {
//     const rows = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//     const seatsPerRow = 20;
//     return Array.from({ length: rows.length * seatsPerRow }, (_, i) => {
//       const row = rows[Math.floor(i / seatsPerRow)];
//       const seatNumber = (i % seatsPerRow) + 1;
//       return `${row}${seatNumber}`;
//     });
//   }, []);

//   // Fetch unavailable seats on component mount
//   useEffect(() => {
//     fetchUnavailableSeats();
//   }, [eventId]);

//   const fetchUnavailableSeats = useCallback(async () => {
//     try {
//       // Get existing bookings for this event to determine unavailable seats
//       const response = await getBookingsByEventId(eventId);
      
//       // Ensure response is an array, default to empty array if not
//       const bookings = Array.isArray(response) ? response : [];
      
//       // Extract all booked seats from all bookings
//       const bookedSeats = bookings.reduce((acc, booking) => {
//         // Check if booking has seatNumbers and it's an array
//         if (booking && booking.seatNumbers && Array.isArray(booking.seatNumbers)) {
//           return [...acc, ...booking.seatNumbers];
//         }
//         return acc;
//       }, []);
      
//       setUnavailableSeats(bookedSeats);
//       setError(null);
//     } catch (err) {
//       console.error('Failed to fetch unavailable seats:', err);
//       setError('Failed to load seat availability');
//       // Default to no unavailable seats on error
//       setUnavailableSeats([]);
//     }
//   }, [eventId]);

//   const toggleSeat = useCallback((seat) => {
//     // Don't allow selection of unavailable seats
//     if (unavailableSeats.includes(seat)) return;
    
//     setSelectedSeats(prev => 
//       prev.includes(seat) ? prev.filter(s => s !== seat) : [...prev, seat]
//     );
//     // Clear error when user interacts
//     if (error) setError(null);
//   }, [error, unavailableSeats]);

//   const refreshSeatAvailability = useCallback(async () => {
//     setIsRefreshing(true);
//     try {
//       await fetchUnavailableSeats();
      
//       // Remove any selected seats that are now unavailable
//       const stillAvailable = selectedSeats.filter(
//         seat => !unavailableSeats.includes(seat)
//       );
//       setSelectedSeats(stillAvailable);
      
//       setError(null);
//     } catch (err) {
//       setError('Failed to refresh seat availability');
//     } finally {
//       setIsRefreshing(false);
//     }
//   }, [fetchUnavailableSeats, selectedSeats, unavailableSeats]);

//   const onSubmit = async () => {
//     if (selectedSeats.length === 0) {
//       setError('Please select at least one seat');
//       return;
//     }

//     setIsLoading(true);
//     setError(null);
    
//     try {
//       // Get user from localStorage
//       const user = JSON.parse(localStorage.getItem('user'));
//       if (!user) {
//         setError('User not logged in');
//         setIsLoading(false);
//         return;
//       }
      
//       await selectSeats({ 
//         eventId, 
//         seatNumbers: selectedSeats,
//         userId: user.id
//       });
      
//       // Handle success (e.g., navigate to next step)
//       // You might want to call a success callback or navigate to payment
//     } catch (err) {
//       console.error('Seat selection error:', err);
      
//       // Handle 409 Conflict specifically
//       if (err.response?.status === 409) {
//         const conflictData = err.response.data || {};
        
//         // If API returns which seats are unavailable
//         if (conflictData.unavailableSeats && Array.isArray(conflictData.unavailableSeats)) {
//           setUnavailableSeats(prev => [...prev, ...conflictData.unavailableSeats]);
          
//           // Remove unavailable seats from selection
//           const stillAvailable = selectedSeats.filter(
//             seat => !conflictData.unavailableSeats.includes(seat)
//           );
//           setSelectedSeats(stillAvailable);
          
//           setError(
//             `Some seats are no longer available: ${conflictData.unavailableSeats.join(', ')}. ` +
//             'Please select different seats.'
//           );
//         } else {
//           setError('Some of your selected seats have been taken. Please choose different seats.');
//           // Refresh to get updated availability
//           refreshSeatAvailability();
//         }
//       } else {
//         setError(err.response?.data?.message || err.message || 'Failed to select seats');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl">
//       <Paper 
//         elevation={8} 
//         className="bg-white bg-opacity-90 backdrop-blur-lg rounded-xl p-6 transform transition-all duration-300 hover:scale-[1.01]"
//       >
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center">
//             <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mr-4">
//               <VscCheck className="h-6 w-6 text-white" />
//             </div>
//             <Typography 
//               variant="h5" 
//               className="text-xl font-bold text-gray-800"
//             >
//               Select Your Seats
//             </Typography>
//           </div>
          
//           <Button 
//             onClick={refreshSeatAvailability}
//             variant="outlined"
//             size="small"
//             startIcon={<VscRefresh />}
//             disabled={isRefreshing}
//             className="text-blue-600 border-blue-300"
//           >
//             {isRefreshing ? 'Refreshing...' : 'Refresh'}
//           </Button>
//         </div>
        
//         <div className="mb-6">
//           <div className="flex items-center justify-center mb-4">
//             <div className="w-3/4 h-1 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full"></div>
//           </div>
//           <Typography 
//             variant="body2" 
//             className="text-center text-gray-600 mb-4"
//           >
//             Screen
//           </Typography>
//         </div>
        
//         {/* Scrollable seat grid */}
//         <div className="mb-8 border border-gray-200 rounded-lg p-4 bg-gray-50">
//           <div className="flex justify-between items-center mb-4">
//             <Typography variant="subtitle2" className="text-gray-600">
//               {selectedSeats.length} seat{selectedSeats.length !== 1 ? 's' : ''} selected
//             </Typography>
//             <Typography variant="subtitle2" className="text-gray-600">
//               {seats.length - unavailableSeats.length} available of {seats.length} total
//             </Typography>
//           </div>
          
//           <div className="overflow-auto max-h-96">
//             <div className="grid grid-cols-10 gap-2">
//               {seats.map((seat) => {
//                 const isSelected = selectedSeats.includes(seat);
//                 const isUnavailable = unavailableSeats.includes(seat);
//                 const isAvailable = !isUnavailable;
                
//                 return (
//                   <Seat
//                     key={seat}
//                     seat={seat}
//                     isSelected={isSelected}
//                     isAvailable={isAvailable}
//                     onClick={toggleSeat}
//                   />
//                 );
//               })}
//             </div>
//           </div>
//         </div>
        
//         <div className="flex justify-between items-center mb-4">
//           <div className="flex items-center">
//             <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded mr-2"></div>
//             <Typography variant="body2" className="text-gray-600">Selected</Typography>
//           </div>
//           <div className="flex items-center">
//             <div className="w-4 h-4 border border-blue-300 rounded mr-2"></div>
//             <Typography variant="body2" className="text-gray-600">Available</Typography>
//           </div>
//           <div className="flex items-center">
//             <div className="w-4 h-4 border border-gray-300 rounded mr-2 bg-gray-100"></div>
//             <Typography variant="body2" className="text-gray-600">Unavailable</Typography>
//           </div>
//         </div>
        
//         {error && (
//           <Alert 
//             severity="error" 
//             className="mb-4"
//             action={
//               <Button 
//                 color="inherit" 
//                 size="small" 
//                 onClick={refreshSeatAvailability}
//                 startIcon={<VscRefresh />}
//                 disabled={isRefreshing}
//               >
//                 Refresh
//               </Button>
//             }
//           >
//             {error}
//           </Alert>
//         )}
        
//         <Button 
//           onClick={onSubmit} 
//           variant="contained" 
//           fullWidth 
//           disabled={isLoading || selectedSeats.length === 0}
//           className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
//         >
//           {isLoading ? (
//             <div className="flex items-center justify-center">
//               <CircularProgress size={20} className="mr-2 text-white" />
//               Processing...
//             </div>
//           ) : (
//             `Select ${selectedSeats.length} Seat${selectedSeats.length !== 1 ? 's' : ''}`
//           )}
//         </Button>
//       </Paper>
//     </div>
//   );
// };










import { useState, useMemo, useCallback, memo, useEffect } from 'react';
import { Button, Typography, Box, Paper, CircularProgress, Stepper, Step, StepLabel, TextField, Grid, Card, CardContent } from '@mui/material';
import { VscCheck, VscRefresh, VscArrowLeft, VscSearch } from 'react-icons/vsc';

// Mock events data
const mockEvents = [
  { id: 'event-1', name: 'Summer Music Festival', venue: 'Central Park', date: '2023-07-15', time: '18:00', price: 50 },
  { id: 'event-2', name: 'Tech Conference 2023', venue: 'Convention Center', date: '2023-08-20', time: '09:00', price: 120 },
  { id: 'event-3', name: 'Broadway Show: Hamilton', venue: 'Majestic Theater', date: '2023-09-10', time: '20:00', price: 85 },
  { id: 'event-4', name: 'Sports Championship', venue: 'City Stadium', date: '2023-10-05', time: '15:30', price: 75 },
  { id: 'event-5', name: 'Art Exhibition', venue: 'Modern Art Museum', date: '2023-11-12', time: '11:00', price: 25 },
];

// Event Search Step Component
const EventSearchStep = ({ onEventSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [venueFilter, setVenueFilter] = useState('');
  const [filteredEvents, setFilteredEvents] = useState(mockEvents);

  const handleSearch = useCallback(() => {
    let results = mockEvents;
    
    if (searchTerm) {
      results = results.filter(event => 
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (venueFilter) {
      results = results.filter(event => 
        event.venue.toLowerCase().includes(venueFilter.toLowerCase())
      );
    }
    
    setFilteredEvents(results);
  }, [searchTerm, venueFilter]);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, venueFilter, handleSearch]);

  return (
    <div>
      <Typography variant="h5" className="mb-6 text-gray-800">Find Your Event</Typography>
      
      <div className="mb-6">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Event Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by event name..."
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Venue"
              value={venueFilter}
              onChange={(e) => setVenueFilter(e.target.value)}
              placeholder="Search by venue..."
              variant="outlined"
            />
          </Grid>
        </Grid>
      </div>
      
      <div className="mb-6">
        <Typography variant="h6" className="mb-4 text-gray-700">Available Events</Typography>
        
        {filteredEvents.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No events found matching your search criteria.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <Typography variant="h6" className="font-bold text-gray-800">{event.name}</Typography>
                      <Typography variant="body2" className="text-gray-600">{event.venue}</Typography>
                      <Typography variant="body2" className="text-gray-600">
                        {event.date} at {event.time}
                      </Typography>
                      <Typography variant="body1" className="font-bold text-blue-600 mt-1">
                        ${event.price} per ticket
                      </Typography>
                    </div>
                    <Button 
                      variant="contained" 
                      onClick={() => onEventSelect(event)}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      Select
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Seat Selection Component
const SeatSelectionStep = ({ event, onSeatsSelected, onBack }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unavailableSeats, setUnavailableSeats] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [pendingSeats, setPendingSeats] = useState([]);
  const [retryDelay, setRetryDelay] = useState(1000);
  
  // Generate a large number of seats (26 rows x 20 seats = 520 seats)
  const seats = useMemo(() => {
    const rows = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const seatsPerRow = 20;
    return Array.from({ length: rows.length * seatsPerRow }, (_, i) => {
      const row = rows[Math.floor(i / seatsPerRow)];
      const seatNumber = (i % seatsPerRow) + 1;
      return `${row}${seatNumber}`;
    });
  }, []);

  // Simulate fetching unavailable seats
  useEffect(() => {
    // In a real app, this would fetch from the backend
    // For now, we'll simulate some unavailable seats
    const mockUnavailableSeats = [
      'A5', 'A6', 'B3', 'B4', 'C7', 'C8', 'D10', 'E1', 'E2', 'F9'
    ];
    setUnavailableSeats(mockUnavailableSeats);
  }, []);

  // Auto-retry with exponential backoff when there's a conflict
  useEffect(() => {
    let retryTimer;
    
    if (retryCount > 0 && retryCount <= 5) {
      retryTimer = setTimeout(() => {
        // Only retry if we still have selected seats
        if (selectedSeats.length > 0) {
          handleSeatSelection(true); // Pass true to indicate this is a retry
        }
      }, retryDelay);
      
      // Exponential backoff: double the delay each time
      setRetryDelay(prev => prev * 2);
    }
    
    return () => {
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, [retryCount, selectedSeats, retryDelay]);

  const toggleSeat = useCallback((seat) => {
    // Don't allow selection of unavailable or pending seats
    if (unavailableSeats.includes(seat) || pendingSeats.includes(seat)) return;
    
    setSelectedSeats(prev => 
      prev.includes(seat) ? prev.filter(s => s !== seat) : [...prev, seat]
    );
    // Clear error when user interacts
    if (error) setError(null);
  }, [error, unavailableSeats, pendingSeats]);

  const refreshSeatAvailability = useCallback(async () => {
    setIsRefreshing(true);
    try {
      // Simulate API call to refresh seat availability
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate some seats becoming unavailable
      const newUnavailableSeats = [...unavailableSeats];
      if (Math.random() > 0.7) {
        const randomSeat = seats[Math.floor(Math.random() * seats.length)];
        if (!newUnavailableSeats.includes(randomSeat)) {
          newUnavailableSeats.push(randomSeat);
        }
      }
      
      setUnavailableSeats(newUnavailableSeats);
      
      // Remove any selected seats that are now unavailable
      const stillAvailable = selectedSeats.filter(
        seat => !newUnavailableSeats.includes(seat)
      );
      setSelectedSeats(stillAvailable);
      
      setError(null);
    } catch (err) {
      setError('Failed to refresh seat availability');
    } finally {
      setIsRefreshing(false);
    }
  }, [seats, selectedSeats, unavailableSeats]);

  const handleSeatSelection = useCallback(async (isRetry = false) => {
    if (selectedSeats.length === 0) {
      setError('Please select at least one seat');
      return;
    }

    // If this is a retry, don't set loading state again
    if (!isRetry) {
      setIsLoading(true);
      setError(null);
      setRetryCount(0);
      setRetryDelay(1000);
    }
    
    // Mark seats as pending (optimistic update)
    setPendingSeats(selectedSeats);
    
    try {
      // Simulate API call to select seats
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate conflict (randomly)
      if (Math.random() > 0.8 && !isRetry) {
        throw { response: { status: 409, data: { unavailableSeats: ['A5', 'B3', 'C7'] } } };
      }
      
      // If successful, proceed to booking information
      const bookingData = {
        eventId: event.id,
        eventName: event.name,
        venue: event.venue,
        date: event.date,
        time: event.time,
        seatNumbers: selectedSeats,
        pricePerSeat: event.price,
        totalAmount: selectedSeats.length * event.price,
        bookingId: `booking-${Date.now()}`,
        bookingDate: new Date().toISOString()
      };
      
      onSeatsSelected(bookingData);
      setPendingSeats([]);
    } catch (err) {
      console.error('Seat selection error:', err);
      setPendingSeats([]);
      
      // Handle 409 Conflict specifically
      if (err.response?.status === 409) {
        const conflictData = err.response.data || {};
        
        // If API returns which seats are unavailable
        if (conflictData.unavailableSeats && Array.isArray(conflictData.unavailableSeats)) {
          // Update unavailable seats state
          setUnavailableSeats(prev => [...prev, ...conflictData.unavailableSeats]);
          
          // Remove unavailable seats from selection
          const stillAvailable = selectedSeats.filter(
            seat => !conflictData.unavailableSeats.includes(seat)
          );
          setSelectedSeats(stillAvailable);
          
          // If no seats left after filtering, show error
          if (stillAvailable.length === 0) {
            setError('All selected seats are no longer available. Please select different seats.');
            setIsLoading(false);
            return;
          }
        } else {
          // If no specific seats returned, refresh availability
          refreshSeatAvailability();
        }
        
        // Increment retry count
        const newRetryCount = retryCount + 1;
        setRetryCount(newRetryCount);
        
        // If we've reached max retries, show error
        if (newRetryCount > 5) {
          setError('Unable to select seats due to high demand. Please try again later.');
          setIsLoading(false);
        } else {
          // Otherwise, we'll retry automatically
          console.log(`Retrying seat selection (attempt ${newRetryCount})...`);
        }
      } else {
        // For other errors, show the error popup
        setError(err.response?.data?.message || err.message || 'Failed to select seats');
        setIsLoading(false);
      }
    }
  }, [event, selectedSeats, retryCount, refreshSeatAvailability]);

  // Memoized seat component to prevent unnecessary re-renders
  const Seat = memo(({ seat, isSelected, isAvailable, isPending, onClick }) => (
    <Button
      variant={isSelected ? "contained" : "outlined"}
      onClick={() => isAvailable && !isPending && onClick(seat)}
      disabled={!isAvailable || isPending}
      className={`h-10 w-10 rounded transition-all duration-300 transform hover:scale-110 ${
        isSelected 
          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md' 
          : isPending
            ? 'bg-yellow-100 border-yellow-400 text-yellow-700'
            : isAvailable 
              ? 'border-blue-300 text-blue-600 hover:bg-blue-50' 
              : 'border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed'
      }`}
    >
      {seat}
    </Button>
  ));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <Typography variant="h5" className="text-gray-800">Select Your Seats</Typography>
          <Typography variant="body2" className="text-gray-600">
            {event.name} at {event.venue}
          </Typography>
        </div>
        
        <Button 
          onClick={onBack}
          variant="outlined"
          size="small"
          startIcon={<VscArrowLeft />}
          className="text-blue-600 border-blue-300"
        >
          Back to Events
        </Button>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center justify-center mb-4">
          <div className="w-3/4 h-1 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full"></div>
        </div>
        <Typography 
          variant="body2" 
          className="text-center text-gray-600 mb-4"
        >
          Screen
        </Typography>
      </div>
      
      {/* Retry indicator */}
      {retryCount > 0 && retryCount <= 5 && (
        <div className="mb-4 p-3 bg-yellow-50 text-yellow-700 rounded-lg flex items-center justify-center">
          <CircularProgress size={16} className="mr-2" />
          <Typography variant="body2">
            Retrying seat selection (attempt {retryCount}/5)...
          </Typography>
        </div>
      )}
      
      {/* Scrollable seat grid */}
      <div className="mb-8 border border-gray-200 rounded-lg p-4 bg-gray-50">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="subtitle2" className="text-gray-600">
            {selectedSeats.length} seat{selectedSeats.length !== 1 ? 's' : ''} selected
          </Typography>
          <Typography variant="subtitle2" className="text-gray-600">
            ${selectedSeats.length * event.price} total
          </Typography>
        </div>
        
        <div className="overflow-auto max-h-96">
          <div className="grid grid-cols-10 gap-2">
            {seats.map((seat) => {
              const isSelected = selectedSeats.includes(seat);
              const isUnavailable = unavailableSeats.includes(seat);
              const isPending = pendingSeats.includes(seat);
              const isAvailable = !isUnavailable && !isPending;
              
              return (
                <Seat
                  key={seat}
                  seat={seat}
                  isSelected={isSelected}
                  isAvailable={isAvailable}
                  isPending={isPending}
                  onClick={toggleSeat}
                />
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded mr-2"></div>
          <Typography variant="body2" className="text-gray-600">Selected</Typography>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 border border-blue-300 rounded mr-2"></div>
          <Typography variant="body2" className="text-gray-600">Available</Typography>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 border border-gray-300 rounded mr-2 bg-gray-100"></div>
          <Typography variant="body2" className="text-gray-600">Unavailable</Typography>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-100 border border-yellow-400 rounded mr-2"></div>
          <Typography variant="body2" className="text-gray-600">Pending</Typography>
        </div>
      </div>
      
      {/* Error popup */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center">
          <VscArrowLeft className="mr-2" />
          <Typography variant="body2">{error}</Typography>
        </div>
      )}
      
      <Button 
        onClick={() => handleSeatSelection(false)} 
        variant="contained" 
        fullWidth 
        disabled={isLoading || selectedSeats.length === 0 || pendingSeats.length > 0}
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <CircularProgress size={20} className="mr-2 text-white" />
            Processing...
          </div>
        ) : (
          `Continue to Booking Information (${selectedSeats.length} Seat${selectedSeats.length !== 1 ? 's' : ''})`
        )}
      </Button>
    </div>
  );
};

// Booking Information Step Component
const BookingInformationStep = ({ bookingData, onBookingConfirmed, onBack }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <Typography variant="h5" className="text-gray-800">Booking Information</Typography>
          <Typography variant="body2" className="text-gray-600">
            {bookingData.eventName} at {bookingData.venue}
          </Typography>
        </div>
        
        <Button 
          onClick={onBack}
          variant="outlined"
          size="small"
          startIcon={<VscArrowLeft />}
          className="text-blue-600 border-blue-300"
        >
          Back to Seats
        </Button>
      </div>
      
      <div className="mb-8 p-6 bg-gray-50 rounded-lg">
        <Typography variant="h6" className="mb-4">Booking Details</Typography>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <Typography variant="body2" className="text-gray-600">Event:</Typography>
            <Typography variant="body2">{bookingData.eventName}</Typography>
          </div>
          <div className="flex justify-between">
            <Typography variant="body2" className="text-gray-600">Venue:</Typography>
            <Typography variant="body2">{bookingData.venue}</Typography>
          </div>
          <div className="flex justify-between">
            <Typography variant="body2" className="text-gray-600">Date & Time:</Typography>
            <Typography variant="body2">{bookingData.date} at {bookingData.time}</Typography>
          </div>
          <div className="flex justify-between">
            <Typography variant="body2" className="text-gray-600">Seats:</Typography>
            <Typography variant="body2">{bookingData.seatNumbers.join(', ')}</Typography>
          </div>
          <div className="flex justify-between">
            <Typography variant="body2" className="text-gray-600">Number of Tickets:</Typography>
            <Typography variant="body2">{bookingData.seatNumbers.length}</Typography>
          </div>
          <div className="flex justify-between">
            <Typography variant="body2" className="text-gray-600">Price per Seat:</Typography>
            <Typography variant="body2">${bookingData.pricePerSeat.toFixed(2)}</Typography>
          </div>
          <div className="flex justify-between font-bold">
            <Typography variant="body2">Total Amount:</Typography>
            <Typography variant="body2">${bookingData.totalAmount.toFixed(2)}</Typography>
          </div>
        </div>
      </div>
      
      <Button 
        onClick={onBookingConfirmed}
        variant="contained" 
        fullWidth
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
      >
        Continue to Payment
      </Button>
    </div>
  );
};

// Payment Step Component
const PaymentStep = ({ bookingData, onPaymentComplete, onBack }) => {
  const [cardNumber, setCardNumber] = useState('1234 5678 9012 3456');
  const [expiryDate, setExpiryDate] = useState('12/25');
  const [cvv, setCvv] = useState('123');
  const [cardName, setCardName] = useState('John Doe');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    // Basic validation
    if (!cardNumber || !expiryDate || !cvv || !cardName) {
      setError('Please fill in all payment details');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Payment successful
      const paymentData = {
        ...bookingData,
        paymentId: `pay-${Date.now()}`,
        paymentDate: new Date().toISOString(),
        paymentStatus: 'completed',
        cardNumber: cardNumber.slice(-4), // Only store last 4 digits
        cardName: cardName
      };

      onPaymentComplete(paymentData);
    } catch (err) {
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <Typography variant="h5" className="text-gray-800">Complete Your Booking</Typography>
          <Typography variant="body2" className="text-gray-600">
            {bookingData.eventName} at {bookingData.venue}
          </Typography>
        </div>
        
        <Button 
          onClick={onBack}
          variant="outlined"
          size="small"
          startIcon={<VscArrowLeft />}
          className="text-blue-600 border-blue-300"
        >
          Back to Booking Information
        </Button>
      </div>
      
      <div className="mb-8 p-6 bg-gray-50 rounded-lg">
        <Typography variant="h6" className="mb-4">Payment Information</Typography>
        
        <div className="space-y-4">
          <div>
            <Typography variant="body2" className="text-gray-600 mb-1">Cardholder Name</Typography>
            <TextField
              fullWidth
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="John Doe"
              variant="outlined"
            />
          </div>
          
          <div>
            <Typography variant="body2" className="text-gray-600 mb-1">Card Number</Typography>
            <TextField
              fullWidth
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="1234 5678 9012 3456"
              variant="outlined"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Typography variant="body2" className="text-gray-600 mb-1">Expiry Date</Typography>
              <TextField
                fullWidth
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="MM/YY"
                variant="outlined"
              />
            </div>
            <div>
              <Typography variant="body2" className="text-gray-600 mb-1">CVV</Typography>
              <TextField
                fullWidth
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="123"
                variant="outlined"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Error popup */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center">
          <VscArrowLeft className="mr-2" />
          <Typography variant="body2">{error}</Typography>
        </div>
      )}
      
      <Button 
        onClick={handlePayment} 
        variant="contained" 
        fullWidth 
        disabled={isProcessing}
        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
      >
        {isProcessing ? (
          <div className="flex items-center justify-center">
            <CircularProgress size={20} className="mr-2 text-white" />
            Processing Payment...
          </div>
        ) : (
          `Pay $${bookingData.totalAmount.toFixed(2)}`
        )}
      </Button>
    </div>
  );
};

// Confirmation Step Component
const ConfirmationStep = ({ bookingData, onNewBooking }) => {
  // Add a useEffect to log when the component mounts
  useEffect(() => {
    console.log('ConfirmationStep mounted with data:', bookingData);
  }, [bookingData]);

  if (!bookingData) {
    return (
      <div className="text-center py-8">
        <Typography variant="h6" className="text-red-500 mb-2">Error Loading Booking Details</Typography>
        <Typography variant="body2" className="text-gray-600">
          We couldn't load your booking information. Please try again.
        </Typography>
        <Button 
          onClick={onNewBooking}
          variant="contained"
          className="mt-4 bg-blue-500 hover:bg-blue-600"
        >
          Start Over
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-center mb-6">
        <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mr-4">
          <VscCheck className="h-6 w-6 text-white" />
        </div>
        <Typography 
          variant="h5" 
          className="text-xl font-bold text-gray-800"
        >
          Booking Confirmed!
        </Typography>
      </div>
      
      <div className="mb-8 p-6 bg-green-50 rounded-lg">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <VscCheck className="h-8 w-8 text-green-600" />
          </div>
          <Typography variant="h6" className="text-green-700 mb-2">
            Payment Successful
          </Typography>
          <Typography variant="body2" className="text-green-600">
            Your booking has been confirmed and payment has been processed.
          </Typography>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <Typography variant="body2" className="text-gray-600">Booking ID:</Typography>
            <Typography variant="body2" className="font-medium">{bookingData.bookingId}</Typography>
          </div>
          <div className="flex justify-between">
            <Typography variant="body2" className="text-gray-600">Event:</Typography>
            <Typography variant="body2">{bookingData.eventName}</Typography>
          </div>
          <div className="flex justify-between">
            <Typography variant="body2" className="text-gray-600">Venue:</Typography>
            <Typography variant="body2">{bookingData.venue}</Typography>
          </div>
          <div className="flex justify-between">
            <Typography variant="body2" className="text-gray-600">Date & Time:</Typography>
            <Typography variant="body2">{bookingData.date} at {bookingData.time}</Typography>
          </div>
          <div className="flex justify-between">
            <Typography variant="body2" className="text-gray-600">Seats:</Typography>
            <Typography variant="body2">{bookingData.seatNumbers.join(', ')}</Typography>
          </div>
          <div className="flex justify-between">
            <Typography variant="body2" className="text-gray-600">Payment ID:</Typography>
            <Typography variant="body2">{bookingData.paymentId}</Typography>
          </div>
          <div className="flex justify-between">
            <Typography variant="body2" className="text-gray-600">Amount Paid:</Typography>
            <Typography variant="body2" className="font-medium">
              ${bookingData.totalAmount ? Number(bookingData.totalAmount).toFixed(2) : '0.00'}
            </Typography>
          </div>
          <div className="flex justify-between">
            <Typography variant="body2" className="text-gray-600">Booking Date:</Typography>
            <Typography variant="body2">
              {new Date(bookingData.bookingDate || Date.now()).toLocaleDateString()}
            </Typography>
          </div>
        </div>
      </div>
      
      <Button 
        onClick={onNewBooking}
        variant="outlined"
        fullWidth
        className="border-blue-300 text-blue-600 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-300"
      >
        Book Another Event
      </Button>
    </div>
  );
};

// Main Event Booking Flow Component
const EventBookingFlow = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  const steps = ['Search Event', 'Select Seats', 'Booking Information', 'Payment', 'Confirmation'];

  const handleEventSelect = (event) => {
    console.log('Event selected:', event);
    setSelectedEvent(event);
    setActiveStep(1);
  };

  const handleSeatsSelected = (data) => {
    console.log('Seats selected:', data);
    setBookingData(data);
    setActiveStep(2);
  };

  const handleBookingConfirmed = () => {
    console.log('Booking confirmed:', bookingData);
    setActiveStep(3);
  };

  const handlePaymentComplete = (data) => {
    console.log('Payment complete:', data);
    setPaymentData(data);
    setActiveStep(4);
  };

  const handleBack = () => {
    console.log('Going back from step', activeStep);
    setActiveStep(prev => Math.max(prev - 1, 0));
  };

  const handleNewBooking = () => {
    console.log('Starting new booking');
    setActiveStep(0);
    setSelectedEvent(null);
    setBookingData(null);
    setPaymentData(null);
  };

  const getStepContent = (step) => {
    console.log('Rendering step', step, 'with data:', {
      selectedEvent,
      bookingData,
      paymentData
    });
    
    switch (step) {
      case 0:
        return <EventSearchStep onEventSelect={handleEventSelect} />;
      case 1:
        return (
          <SeatSelectionStep 
            event={selectedEvent} 
            onSeatsSelected={handleSeatsSelected}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <BookingInformationStep 
            bookingData={bookingData}
            onBookingConfirmed={handleBookingConfirmed}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <PaymentStep 
            bookingData={bookingData}
            onPaymentComplete={handlePaymentComplete}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <ConfirmationStep 
            bookingData={paymentData}
            onNewBooking={handleNewBooking}
          />
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Paper 
          elevation={8} 
          className="bg-white bg-opacity-90 backdrop-blur-lg rounded-xl p-6 transform transition-all duration-300 hover:scale-[1.01]"
        >
          <Stepper activeStep={activeStep} className="mb-8">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          <div key={activeStep} className="min-h-[500px]">
            {getStepContent(activeStep)}
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default EventBookingFlow;