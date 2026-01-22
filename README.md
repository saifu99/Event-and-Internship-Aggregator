# Event & Internship Aggregator Platform

A full-stack MERN-based Event & Internship Aggregator Platform designed to centralize college events, hackathons, and internship opportunities.
This project demonstrates JWT-based authentication, role-based access, and frontend–backend integration for a real-world application.

---

## Features

### Authentication & Authorization
- User registration and login (Students & Admins)
- JWT-based authentication
- Role-based access control (Admin vs Student)
- Protected frontend and backend routes

### Events & Internships
- Create, read, update, delete events/internships (Admin)
- Browse, search, and filter listings (Student)
- Real-time updates and dashboard analytics
- Responsive and modern UI

### Security & Scalability
- Password hashing using bcrypt
- JWT verification middleware
- Centralized error handling
- Modular backend architecture

---

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, React Router DOM
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose, MongoDB Atlas)
- **Authentication:** JWT, bcryptjs
- **Tools:** Postman, Git & GitHub

---

## Project Structure

```bash
event-and-internship-aggregator/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── EventCard.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── EventDetails.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
│
└── README.md


## Setup Instructions

1. Clone the repository
git clone https://github.com/your-username/Event-and-Internship-Aggregator.git
cd Event-and-Internship-Aggregator

2. Backend Setup
cd backend
npm install
npm run dev

3. Frontend Setup
cd frontend
npm install
npm run dev
