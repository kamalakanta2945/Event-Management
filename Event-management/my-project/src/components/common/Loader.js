import { CircularProgress, Box, Typography } from '@mui/material';
import { VscLoading } from 'react-icons/vsc';

const Loader = () => (
  <Box className="flex flex-col justify-center items-center h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl">
    <div className="relative">
      <CircularProgress 
        size={60} 
        thickness={4}
        className="text-blue-600"
      />
      <VscLoading className="absolute inset-0 m-auto h-8 w-8 text-blue-600 animate-spin" />
    </div>
    <Typography 
      variant="h6" 
      className="mt-4 text-gray-700 font-medium"
    >
      Loading...
    </Typography>
  </Box>
);

export default Loader;