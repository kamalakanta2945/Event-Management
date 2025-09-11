import { useForm } from 'react-hook-form';
import { Button, TextField, Typography, Box, Paper } from '@mui/material';
import { searchEvents } from '../../services/eventService';
import { useState, useEffect } from 'react';
import EventCard from './EventCard';
import { VscSearch, VscLocation, VscCalendar } from 'react-icons/vsc';

const EventSearch = () => {
  const { register, handleSubmit } = useForm();
  const [results, setResults] = useState([]);
  const [currentBg, setCurrentBg] = useState(0);
  
  const backgroundImages = [
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1540575467063-178a50fc2cf7?auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=2069&q=80'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const onSubmit = async (data) => {
    const res = await searchEvents(data);
    setResults(res);
  };

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
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <div className="p-5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full shadow-xl">
              <VscSearch className="h-12 w-12 text-white" />
            </div>
          </div>
          <Typography 
            variant="h3" 
            className="text-4xl font-bold text-white mb-4 tracking-wide"
          >
            Find Your Perfect Event
          </Typography>
          <Typography 
            variant="h6" 
            className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed"
          >
            Search through thousands of events to find your next unforgettable experience
          </Typography>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 mx-auto rounded-full mt-6"></div>
        </div>
        
        <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 mb-8 transform transition-all duration-300 hover:scale-[1.01]">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <Box sx={{ position: 'relative', flex: 1 }}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <VscSearch className="h-5 w-5 text-gray-400" />
              </div>
              <TextField 
                label="Event Name" 
                {...register('name')} 
                fullWidth 
                className="pl-10"
                InputProps={{
                  className: 'rounded-lg'
                }}
              />
            </Box>

            <Box sx={{ position: 'relative', flex: 1 }}>
              <TextField
                label="Category"
                {...register('category')}
                fullWidth
                InputProps={{
                  className: 'rounded-lg'
                }}
              />
            </Box>

            <Box sx={{ position: 'relative', flex: 1 }}>
              <TextField
                label="Start Date"
                type="date"
                {...register('startDate')}
                fullWidth
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  className: 'rounded-lg'
                }}
              />
            </Box>

            <Box sx={{ position: 'relative', flex: 1 }}>
              <TextField
                label="End Date"
                type="date"
                {...register('endDate')}
                fullWidth
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  className: 'rounded-lg'
                }}
              />
            </Box>
            
            <Box sx={{ position: 'relative', flex: 1 }}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <VscLocation className="h-5 w-5 text-gray-400" />
              </div>
              <TextField 
                label="Venue" 
                {...register('venue')} 
                fullWidth 
                className="pl-10"
                InputProps={{
                  className: 'rounded-lg'
                }}
              />
            </Box>
            
            <Button 
              type="submit" 
              variant="contained" 
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 px-8 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
            >
              <VscSearch className="mr-2" />
              Search Events
            </Button>
          </form>
        </div>
        
        {results.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full mr-4">
                <VscCalendar className="h-6 w-6 text-white" />
              </div>
              <Typography 
                variant="h4" 
                className="text-2xl font-bold text-white"
              >
                Search Results ({results.length})
              </Typography>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((event) => <EventCard key={event.id} event={event} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventSearch;