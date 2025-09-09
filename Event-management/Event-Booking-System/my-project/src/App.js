import Header from './src/components/common/Header';
import Footer from './src/components/common/Footer';
import PrivateRoute from './src/components/common/PrivateRoute';

import Home from './src/pages/Home';
import Login from './src/pages/Login';
import Signup from './src/pages/Signup';
import ForgotPasswordPage from './src/pages/ForgotPasswordPage';
import ResetPasswordPage from './src/pages/ResetPasswordPage';
import Dashboard from './src/pages/Dashboard';
import Events from './src/pages/Events';
import EventDetails from './src/pages/EventDetails';
import Bookings from './src/pages/Bookings';
import AdminUsers from './src/pages/AdminUsers';
import AdminEvents from './src/pages/AdminEvents';
import AdminBookings from './src/pages/AdminBookings';
import AdminPayments from './src/pages/AdminPayments';
import NotFound from './src/pages/NotFound';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Header />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Login />} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} /> {/* Assume token in URL */}
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetails />} />
            {/* <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/bookings" element={<PrivateRoute roles={['ROLE_USER', 'ROLE_ADMIN']}><Bookings /></PrivateRoute>} />
            <Route path="/admin/users" element={<PrivateRoute roles={['ROLE_ADMIN']}><AdminUsers /></PrivateRoute>} />
            <Route path="/admin/events" element={<PrivateRoute roles={['ROLE_ADMIN']}><AdminEvents /></PrivateRoute>} />
            <Route path="/admin/bookings" element={<PrivateRoute roles={['ROLE_ADMIN']}><AdminBookings /></PrivateRoute>} /> */}
            <Route path="/admin/payments" element={<PrivateRoute roles={['ROLE_ADMIN']}><AdminPayments /></PrivateRoute>} /> 
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin/users" element={<AdminUsers />}/>
            <Route path="/admin/events" element={<AdminEvents />} />
            <Route path="/admin/bookings" element={<PrivateRoute roles={['ROLE_ADMIN']}><AdminBookings /></PrivateRoute>} />
            <Route path="/admin/payments" element={<PrivateRoute roles={['ROLE_ADMIN']}><AdminPayments /></PrivateRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;     