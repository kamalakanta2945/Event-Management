import PrivateRoute from './components/common/PrivateRoute';
import Layout from './components/common/Layout';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import Bookings from './pages/Bookings';
import AdminUsers from './pages/AdminUsers';
import AdminEvents from './pages/AdminEvents';
import AdminBookings from './pages/AdminBookings';
import AdminPayments from './pages/AdminPayments';
import NotFound from './pages/NotFound';
import ProfilePage from './pages/ProfilePage';
import MyEventsPage from './pages/MyEventsPage';
import EventForm from './components/event/EventForm';
import Sitemap from './pages/Sitemap';
import Scanner from './components/admin/Scanner';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />

          {/* User Routes */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/bookings" element={<PrivateRoute roles={['ROLE_USER', 'ROLE_ADMIN']}><Bookings /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />

          {/* Organizer Routes */}
          <Route path="/my-events" element={<PrivateRoute roles={['ROLE_ADMIN', 'ROLE_ORGANIZER']}><MyEventsPage /></PrivateRoute>} />
          <Route path="/create-event" element={<PrivateRoute roles={['ROLE_ADMIN', 'ROLE_ORGANIZER']}><EventForm /></PrivateRoute>} />
          <Route path="/edit-event/:id" element={<PrivateRoute roles={['ROLE_ADMIN', 'ROLE_ORGANIZER']}><EventForm /></PrivateRoute>} />

          {/* Admin Routes */}
          <Route path="/admin/users" element={<PrivateRoute roles={['ROLE_ADMIN']}><AdminUsers /></PrivateRoute>} />
          <Route path="/admin/events" element={<PrivateRoute roles={['ROLE_ADMIN']}><AdminEvents /></PrivateRoute>} />
          <Route path="/admin/bookings" element={<PrivateRoute roles={['ROLE_ADMIN']}><AdminBookings /></PrivateRoute>} />
          <Route path="/admin/payments" element={<PrivateRoute roles={['ROLE_ADMIN']}><AdminPayments /></PrivateRoute>} />
          <Route path="/admin/scanner" element={<PrivateRoute roles={['ROLE_ADMIN']}><Scanner /></PrivateRoute>} />

          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;     