import { Card, CardContent, Typography, Button, Box, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import { VscCalendar, VscLocation, VscTag } from 'react-icons/vsc';

const EventCard = ({ event }) => (
  <Card 
    className="shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-2xl overflow-hidden bg-gradient-to-br from-white to-gray-50"
  >
    <CardMedia 
      component="img" 
      height="180"
      image={event.image || "/assets/icons/event-icon.svg"}
      alt={event.name}
      className="object-cover"
    />
    <CardContent className="p-5">
      <Typography 
        variant="h5" 
        className="text-xl font-bold mb-3 text-gray-800 line-clamp-1"
      >
        {event.name}
      </Typography>
      
      <Box className="flex items-center mb-2 text-gray-600">
        <VscCalendar className="mr-2 text-blue-500" />
        <Typography variant="body2" className="font-medium">
          {new Date(event.eventDateTime).toLocaleString()}
        </Typography>
      </Box>
      
      <Box className="flex items-center mb-2 text-gray-600">
        <VscLocation className="mr-2 text-green-500" />
        <Typography variant="body2" className="font-medium">
          {event.venue}
        </Typography>
      </Box>
      
      <Box className="flex items-center mb-4 text-gray-600">
        <VscTag className="mr-2 text-purple-500" />
        <Typography variant="body2" className="font-medium">
          ${event.ticketPrice}
        </Typography>
      </Box>
      
      <Button 
        component={Link} 
        to={`/events/${event.id}`} 
        variant="contained" 
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 w-full"
      >
        View Details
      </Button>
    </CardContent>
  </Card>
);

export default EventCard;