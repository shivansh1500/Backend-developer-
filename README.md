
## ⚙️ Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone https://github.com/shivansh1500/Backend-developer-.git
cd Backend-developer-
# 🚀 Backend Developer Assignment - ToDo App with Authentication

A full-stack application demonstrating secure authentication, role-based access control, and CRUD operations for a To-Do system.

2️⃣ Backend Setup
cd backend
Create .env file:
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
npm install
npm run dev

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

---------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 📌 Project Overview

This project implements a scalable REST API with JWT-based authentication and role-based authorization. Users can register, log in, and manage their personal to-do tasks through a simple frontend interface.

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt (Password Hashing)

### Frontend
- React.js
- Axios

---

## 🔐 Features

### ✅ Authentication
- User Registration
- User Login
- Password hashing using bcrypt
- JWT-based authentication
- Secure protected routes

### ✅ Role-Based Access
- User and Admin roles
- Middleware-based route protection
- Admin can manage broader data (if implemented)

### ✅ To-Do Management (CRUD)
- Create To-Do
- View To-Do list
- Update To-Do
- Delete To-Do

### ✅ Frontend Functionality
- Register/Login UI
- Protected dashboard
- Perform CRUD operations
- Display API success/error messages

---

## 📁 Project Structure


backend/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── src/index.js

frontend/
├── src/
├── components/


🔗 API Endpoints
Auth Routes
POST /api/auth/register
POST /api/auth/login
To-Do Routes (Protected)
GET /api/todos
POST /api/todos
PUT /api/todos/:id
DELETE /api/todos/:id


🔐 Security Practices
Password hashing using bcrypt
JWT authentication
Protected routes using middleware
Input validation and error handling
⚡ Scalability & Design
Modular structure (controllers, routes, middleware)
Stateless authentication using JWT
Easily extendable for new modules
Clean separation of concerns
🚀 Future Improvements
Redis caching
Docker deployment
Role-based admin dashboard
Rate limiting & logging
