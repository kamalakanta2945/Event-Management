import React from 'react';
import { Link } from 'react-router-dom';

const Sitemap = () => {
    const routes = [
        { path: '/', name: 'Home' },
        { path: '/login', name: 'Login' },
        { path: '/signup', name: 'Signup' },
        { path: '/events', name: 'Events' },
        { path: '/dashboard', name: 'Dashboard' },
        { path: '/profile', name: 'Profile' },
        { path: '/my-events', name: 'My Events' },
        { path: '/seat-selection/:eventId', name: 'Seat Selection' },
        { path: '/payment/:bookingId', name: 'Payment' },
        { path: '/admin/users', name: 'Admin: Manage Users' },
        { path: '/admin/events', name: 'Admin: Manage Events' },
        { path: '/admin/bookings', name: 'Admin: Manage Bookings' },
        { path: '/admin/payments', name: 'Admin: Manage Payments' },
    ];

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Sitemap</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                    <h2 className="text-xl font-semibold mb-2">Frontend Routes</h2>
                    <ul>
                        {routes.map((route) => (
                            <li key={route.path} className="py-1">
                                <Link to={route.path} className="text-blue-500 hover:underline">
                                    {route.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-2">Backend API Documentation</h2>
                    <p>
                        The backend API documentation is available via Swagger UI.
                    </p>
                    <a
                        href="http://localhost:4041/swagger-ui/index.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        View API Docs
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Sitemap;
