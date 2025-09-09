import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/common/Loader';
import SeatSelection from '../components/booking/SeatSelection';
import BookingForm from '../components/booking/BookingForm';
import PaymentForm from '../components/payment/PaymentForm';
import { getEventById } from '../services/eventService';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentBg, setCurrentBg] = useState(0);
  
  const backgroundImages = [
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1540575467063-178a50fc2cf7?auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=2069&q=80'
  ];

  useEffect(() => {
    getEventById(id).then((data) => {
      setEvent(data);
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <Loader />;
  if (!event) return <p>Event not found</p>;

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
        <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 transform transition-all duration-300 hover:scale-[1.01]">
          {/* Event Header */}
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-3 tracking-wide">{event.name}</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 mx-auto rounded-full mb-4"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">{event.description}</p>
          </div>
          
          <div className="space-y-8">
            {/* Seat Selection Section */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100 shadow-sm">
              <div className="flex items-center mb-5">
                <div className="p-3 bg-purple-100 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Select Your Seats</h2>
              </div>
              <SeatSelection eventId={id} />
            </div>
            
            {/* Booking Form Section */}
            {/* <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100 shadow-sm">
              <div className="flex items-center mb-5">
                <div className="p-3 bg-blue-100 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Booking Information</h2>
              </div>
              <BookingForm eventId={id} />
            </div> */}
            
            {/* Payment Form Section */}
            {/* <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 shadow-sm">
              <div className="flex items-center mb-5">
                <div className="p-3 bg-green-100 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Payment Details</h2>
              </div>
              <PaymentForm bookingId="someBookingId" amount={event.ticketPrice * 1} />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;