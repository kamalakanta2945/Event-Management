import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../../utils/authUtils';
import { Box, CircularProgress, Typography } from '@mui/material';
import { VscLock, VscError } from 'react-icons/vsc';

const PrivateRoute = ({ roles = [] }) => {
  if (!isAuthenticated()) {
    return (
      <Box className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-md w-full transform transition-all duration-300 hover:scale-[1.01]">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-lg">
              <VscLock className="h-10 w-10 text-white" />
            </div>
          </div>
          <Typography 
            variant="h4" 
            className="text-2xl font-bold text-gray-800 mb-4 text-center"
          >
            Access Restricted
          </Typography>
          <Typography 
            variant="body1" 
            className="text-gray-600 mb-6 text-center"
          >
            You need to be logged in to access this page
          </Typography>
          <Box className="flex justify-center">
            <CircularProgress className="text-blue-600" />
          </Box>
          <Typography 
            variant="body2" 
            className="text-gray-500 mt-4 text-center"
          >
            Redirecting to login page...
          </Typography>
        </div>
      </Box>
    );
  }

  const userRole = getUserRole();
  if (roles.length > 0 && !roles.includes(userRole)) {
    return (
      <Box className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
        <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-md w-full transform transition-all duration-300 hover:scale-[1.01]">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full shadow-lg">
              <VscError className="h-10 w-10 text-white" />
            </div>
          </div>
          <Typography 
            variant="h4" 
            className="text-2xl font-bold text-gray-800 mb-4 text-center"
          >
            Access Denied
          </Typography>
          <Typography 
            variant="body1" 
            className="text-gray-600 mb-6 text-center"
          >
            You don't have permission to access this page
          </Typography>
          <Box className="flex justify-center">
            <CircularProgress className="text-purple-600" />
          </Box>
          <Typography 
            variant="body2" 
            className="text-gray-500 mt-4 text-center"
          >
            Redirecting to dashboard...
          </Typography>
        </div>
      </Box>
    );
  }

  return <Outlet />;
};

export default PrivateRoute;