import React from 'react';
import UserProfileForm from '../components/profile/UserProfileForm';
import BookingHistory from '../components/profile/BookingHistory';

const ProfilePage = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">My Profile</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-xl font-semibold mb-2">Profile Information</h2>
                    <UserProfileForm />
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-2">My Bookings</h2>
                    <BookingHistory />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
