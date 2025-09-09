import { Typography, Box, Link } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => (
  <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 px-4">
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <Typography 
            variant="h5" 
            className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
          >
            Event Booking
          </Typography>
          <Typography variant="body2" className="text-gray-300">
            &copy; {new Date().getFullYear()} Event Booking App. All rights reserved.
          </Typography>
        </div>
        
        <div className="flex space-x-4 mb-4 md:mb-0">
          <Link href="#" color="inherit" className="hover:text-blue-400 transition-colors">
            <Facebook />
          </Link>
          <Link href="#" color="inherit" className="hover:text-blue-400 transition-colors">
            <Twitter />
          </Link>
          <Link href="#" color="inherit" className="hover:text-pink-500 transition-colors">
            <Instagram />
          </Link>
          <Link href="#" color="inherit" className="hover:text-blue-400 transition-colors">
            <LinkedIn />
          </Link>
        </div>
        
        <div className="flex flex-col items-center md:items-end">
          <Typography variant="body2" className="text-gray-300 mb-1">
            Contact Us
          </Typography>
          <Typography variant="body2" className="text-gray-400">
            info@eventbooking.com
          </Typography>
        </div>
      </div>
      
      <Box className="mt-6 pt-4 border-t border-gray-700 text-center">
        <Typography variant="body2" className="text-gray-400">
          Designed with ❤️ for unforgettable experiences
        </Typography>
      </Box>
    </div>
  </footer>
);

export default Footer;