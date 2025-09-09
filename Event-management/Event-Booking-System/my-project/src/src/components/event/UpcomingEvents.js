import { useEffect, useState } from 'react';
import Loader from '../common/Loader';
import EventCard from './EventCard';
import { getUpcomingEvents } from '../../services/eventService';
import { Typography, Box, Paper } from '@mui/material';
import { VscCalendar, VscStarFull } from 'react-icons/vsc';

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    getUpcomingEvents()
      .then((data) => {
        setEvents(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error('Failed to fetch events', err);
        setEvents([]);
      })
      .finally(() => setLoading(false));
  }, []);

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
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <div className="p-5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full shadow-xl">
              <VscCalendar className="h-12 w-12 text-white" />
            </div>
          </div>
          <Typography 
            variant="h3" 
            className="text-4xl font-bold text-white mb-4 tracking-wide"
          >
            Upcoming Events
          </Typography>
          <Typography 
            variant="h6" 
            className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed"
          >
            Discover amazing events happening near you
          </Typography>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 mx-auto rounded-full mt-6"></div>
        </div>
        
        {events.length === 0 ? (
          <Paper 
            elevation={12} 
            className="bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl p-12 text-center transform transition-all duration-300 hover:scale-[1.01]"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg">
                <VscStarFull className="h-10 w-10 text-white" />
              </div>
            </div>
            <Typography 
              variant="h5" 
              className="text-2xl font-bold text-gray-800 mb-3"
            >
              No Upcoming Events
            </Typography>
            <Typography 
              variant="body1" 
              className="text-gray-600 max-w-md mx-auto"
            >
              There are no upcoming events at the moment. Check back later for new events!
            </Typography>
          </Paper>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingEvents;
