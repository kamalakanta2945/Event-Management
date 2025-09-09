import { AppBar, Toolbar, Typography, Button, IconButton, Box, Menu, MenuItem, Avatar } from '@mui/material';
import { useState } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EventIcon from '@mui/icons-material/Event';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import PaymentIcon from '@mui/icons-material/Payment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link, useNavigate } from 'react-router-dom';
import { removeToken, isAuthenticated, getUserRole } from '../../utils/authUtils';
import { ROLES } from '../../utils/constants';
import { toast } from 'react-toastify';

const Header = () => {
  const navigate = useNavigate();
  const role = getUserRole();
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const logout = () => {
    removeToken();
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/login');
    handleClose();
  };

  return (
    <AppBar position="fixed" className="bg-gray-900/80 backdrop-blur-xl shadow-lg z-50">
      <Toolbar className="container mx-auto px-4">
        <Typography 
          variant="h5" 
          component={Link} 
          to="/" 
          className="no-underline text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-200 font-bold flex items-center"
        >
          <EventIcon className="mr-2 text-amber-300" />
          EVENT HORIZON
        </Typography>
        
        <Box className="flex items-center space-x-1 md:space-x-2">
          <Button 
            color="inherit" 
            component={Link} 
            to="/events"
            className="text-amber-100 hover:bg-amber-900/30 rounded-lg px-3 py-1 transition-all duration-300 flex items-center"
          >
            <EventIcon className="mr-1 text-sm text-amber-300" />
            <span className="hidden sm:inline">Events</span>
          </Button>
          
          {isAuthenticated() ? (
            <>
              <Button 
                color="inherit" 
                component={Link} 
                to="/dashboard"
                className="text-amber-100 hover:bg-amber-900/30 rounded-lg px-3 py-1 transition-all duration-300 flex items-center"
              >
                <DashboardIcon className="mr-1 text-sm text-amber-300" />
                <span className="hidden sm:inline">Dashboard</span>
              </Button>
              
              <Button 
                color="inherit" 
                component={Link} 
                to="/bookings"
                className="text-amber-100 hover:bg-amber-900/30 rounded-lg px-3 py-1 transition-all duration-300"
              >
                <span className="hidden sm:inline">My Bookings</span>
              </Button>
              
              {role === ROLES.ADMIN && (
                <>
                  <Button 
                    color="inherit" 
                    component={Link} 
                    to="/admin/users"
                    className="text-amber-100 hover:bg-amber-900/30 rounded-lg px-3 py-1 transition-all duration-300 flex items-center"
                  >
                    <PeopleIcon className="mr-1 text-sm text-amber-300" />
                    <span className="hidden sm:inline">Users</span>
                  </Button>
                  
                  <Button 
                    color="inherit" 
                    component={Link} 
                    to="/admin/events"
                    className="text-amber-100 hover:bg-amber-900/30 rounded-lg px-3 py-1 transition-all duration-300 flex items-center"
                  >
                    <EventIcon className="mr-1 text-sm text-amber-300" />
                    <span className="hidden sm:inline">Events</span>
                  </Button>
                  
                  <Button 
                    color="inherit" 
                    component={Link} 
                    to="/admin/bookings"
                    className="text-amber-100 hover:bg-amber-900/30 rounded-lg px-3 py-1 transition-all duration-300"
                  >
                    <span className="hidden sm:inline">Bookings</span>
                  </Button>
                  
                  <Button 
                    color="inherit" 
                    component={Link} 
                    to="/admin/payments"
                    className="text-amber-100 hover:bg-amber-900/30 rounded-lg px-3 py-1 transition-all duration-300 flex items-center"
                  >
                    <PaymentIcon className="mr-1 text-sm text-amber-300" />
                    <span className="hidden sm:inline">Payments</span>
                  </Button>
                </>
              )}
              
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                  className="hover:bg-amber-900/30 rounded-full transition-all duration-300"
                >
                  <Avatar className="bg-gradient-to-r from-amber-600 to-amber-800">
                    <AccountCircle />
                  </Avatar>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  className="mt-10"
                  PaperProps={{
                    className: "bg-gray-800/90 backdrop-blur-xl border border-gray-700/50 text-amber-100"
                  }}
                >
                  <MenuItem 
                    component={Link} 
                    to="/dashboard" 
                    onClick={handleClose} 
                    className="flex items-center hover:bg-amber-900/30"
                  >
                    <DashboardIcon className="mr-2 text-amber-300" />
                    Dashboard
                  </MenuItem>
                  <MenuItem 
                    onClick={logout} 
                    className="flex items-center hover:bg-amber-900/30"
                  >
                    <ExitToAppIcon className="mr-2 text-red-400" />
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            </>
          ) : (
            <>
              <Button 
                color="inherit" 
                component={Link} 
                to="/login"
                className="text-amber-100 hover:bg-amber-900/30 rounded-lg px-3 py-1 transition-all duration-300"
              >
                Login
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/signup"
                className="bg-gradient-to-r from-amber-600 to-amber-800 text-amber-100 hover:from-amber-700 hover:to-amber-900 rounded-lg px-4 py-1 font-medium transition-all duration-300 shadow-md"
              >
                Signup
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;