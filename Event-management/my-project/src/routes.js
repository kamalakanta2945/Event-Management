import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import PrivateRoute from './components/common/PrivateRoute';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import UserProfile from './components/user/UserProfile';
import UpdateProfile from './components/user/UpdateProfile';
import EventList from './components/event/EventList';
import EventDetails from './components/event/EventDetails';
import BookingList from './components/booking/BookingList';
import BookingDetails from './components/booking/BookingDetails';
import SeatSelection from './components/booking/SeatSelection';
import PaymentForm from './components/payment/PaymentForm';
import AdminDashboard from './components/admin/AdminDashboard';
import UserManagement from './components/admin/UserManagement';
import EventManagement from './components/admin/EventManagement';
import BookingManagement from './components/admin/BookingManagement';
import BulkImport from './components/admin/BulkImport';
import Sitemap from './pages/Sitemap';

const AppRoutes = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              
              <Route path="/profile" element={
                <PrivateRoute>
                  <UserProfile />
                </PrivateRoute>
              } />
              <Route path="/update-profile" element={
                <PrivateRoute>
                  <UpdateProfile />
                </PrivateRoute>
              } />
              
              <Route path="/events" element={<EventList />} />
              <Route path="/events/:id" element={<EventDetails />} />
              
              <Route path="/bookings" element={
                <PrivateRoute>
                  <BookingList />
                </PrivateRoute>
              } />
              <Route path="/bookings/:id" element={
                <PrivateRoute>
                  <BookingDetails />
                </PrivateRoute>
              } />
              <Route path="/seat-selection/:eventId" element={
                <PrivateRoute>
                  <SeatSelection />
                </PrivateRoute>
              } />
              
              <Route path="/payment/:bookingId" element={
                <PrivateRoute>
                  <PaymentForm />
                </PrivateRoute>
              } />

              <Route path="/sitemap" element={<Sitemap />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={
                <PrivateRoute roles={['ROLE_ADMIN']}>
                  <AdminDashboard />
                </PrivateRoute>
              } />
              <Route path="/admin/users" element={
                <PrivateRoute roles={['ROLE_ADMIN']}>
                  <UserManagement />
                </PrivateRoute>
              } />
              <Route path="/admin/events" element={
                <PrivateRoute roles={['ROLE_ADMIN']}>
                  <EventManagement />
                </PrivateRoute>
              } />
              <Route path="/admin/bookings" element={
                <PrivateRoute roles={['ROLE_ADMIN']}>
                  <BookingManagement />
                </PrivateRoute>
              } />
              <Route path="/admin/import" element={
                <PrivateRoute roles={['ROLE_ADMIN']}>
                  <BulkImport />
                </PrivateRoute>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;