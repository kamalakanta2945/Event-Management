import React, { useState, useEffect } from 'react';
import { getBookingsByUser } from '../../services/bookingService';
import { toast } from 'react-toastify';

const BookingHistory = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const { data } = await getBookingsByUser();
                setBookings(data);
            } catch (error) {
                toast.error('Failed to fetch booking history.');
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    if (loading) {
        return <p>Loading booking history...</p>;
    }

    return (
        <div className="space-y-4">
            {bookings.length === 0 ? (
                <p>You have no bookings.</p>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {bookings.map((booking) => (
                        <li key={booking.id} className="py-4">
                            <div className="flex space-x-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold">{booking.event.name}</h3>
                                    <p className="text-sm text-gray-500">
                                        {new Date(booking.event.date).toLocaleDateString()} at {booking.event.location}
                                    </p>
                                    <p className="text-sm">
                                        Status: <span className={`font-medium ${booking.status === 'CONFIRMED' ? 'text-green-600' : 'text-red-600'}`}>{booking.status}</span>
                                    </p>
                                    <p className="text-sm">
                                        Seats: {booking.seats.map(seat => seat.seatNumber).join(', ')}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold">${booking.totalPrice}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BookingHistory;
