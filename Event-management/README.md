# Event Management System

This is a full-stack event management application built with a Spring Boot backend and a React frontend. The system allows users to browse events, book tickets, and manage their bookings. Administrators have access to a dashboard to manage users, events, bookings, and payments.

## Features

- **User Authentication:** Secure user registration and login with JWT-based authentication.
- **Event Management:** Admins can create, update, and delete events.
- **Event Browsing:** Users can view a list of upcoming events and see details for each event.
- **Booking System:** Authenticated users can book tickets for events.
- **Payment Integration:** Payments are handled through Razorpay.
- **Admin Dashboard:** A comprehensive dashboard for administrators to manage the application's data.
- **Role-based Access Control:** Different levels of access for regular users and administrators.
- **PDF & Excel Generation:** The backend can generate reports and tickets in PDF and Excel formats.
- **Email Notifications:** The system can send email notifications for events like registration and booking confirmation.
- **Caching:** Redis is used for caching to improve performance.

## Technologies Used

### Backend (Event-Booking-System)

- **Java 17**
- **Spring Boot 3.5.5**
- **Spring Web**
- **Spring Security**
- **MongoDB:** NoSQL database for data storage.
- **JWT (Java Web Token):** For securing the API.
- **Razorpay:** For payment processing.
- **Spring Mail:** For sending emails.
- **Apache POI & OpenPDF:** For generating Excel and PDF files.
- **Redis:** For caching.
- **Swagger/OpenAPI:** For API documentation.
- **Maven:** For dependency management.

### Frontend (my-project)

- **React 19**
- **React Router:** For client-side routing.
- **Material-UI:** For UI components.
- **Axios:** For making HTTP requests to the backend.
- **React Hook Form & Yup:** For form handling and validation.
- **Tailwind CSS:** For utility-first CSS styling.
- **jsPDF:** For client-side PDF generation.

## Prerequisites

- **Java 17 or later**
- **Node.js 14 or later**
- **npm 6 or later**
- **MongoDB:** Make sure you have a running instance of MongoDB.
- **Redis:** Make sure you have a running instance of Redis.

## Getting Started

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd Event-management/Event-Booking-System
    ```

2.  **Configure the application:**
    Open `src/main/resources/application.properties` and update the following properties with your local configuration:
    - `spring.data.mongodb.uri`: Your MongoDB connection string.
    - `spring.data.redis.host`: Your Redis host.
    - `spring.data.redis.port`: Your Redis port.
    - `spring.mail.host`, `spring.mail.port`, `spring.mail.username`, `spring.mail.password`: Your email server settings.
    - `razorpay.key.id`, `razorpay.key.secret`: Your Razorpay API keys.
    - `jwt.secret`: Your JWT secret key.

3.  **Install dependencies and run the application:**
    ```bash
    ./mvnw spring-boot:run
    ```
    The backend will start on `http://localhost:8080`. You can access the API documentation at `http://localhost:8080/swagger-ui.html`.

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd Event-management/my-project
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the application:**
    ```bash
    npm start
    ```
    The frontend development server will start on `http://localhost:3000`.

## Project Structure

- `Event-management/Event-Booking-System`: The Spring Boot backend application.
- `Event-management/my-project`: The React frontend application.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
