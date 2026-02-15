# SchoolPro - Professional School Management System

A comprehensive school management platform for K-12 institutions (500-2,000 students) built with MERN Stack.

## Features

- **User Management**: Multi-role authentication (Admin, Teacher, Student, Parent)
- **Student Management**: Registration, profiles, class assignment
- **Teacher Management**: Profiles, department/subject assignment
- **Attendance System**: Daily marking, reports, notifications
- **Grade Management**: Grade entry, automatic calculation, GPA
- **Fee Management**: Fee structures, online payments, receipts
- **Library Management**: Book catalog, issue/return tracking
- **Transport Management**: Routes, vehicle tracking
- **Announcements**: Broadcast to classes/roles

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Frontend**: React.js, Redux Toolkit, Material-UI
- **Authentication**: JWT with refresh tokens

## Prerequisites

Before running the application, make sure you have:

1. **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
2. **MongoDB** (v6 or higher) - [Download](https://www.mongodb.com/try/download/community)
3. **npm** or **yarn** package manager

## Quick Setup Guide

### Step 1: Extract the Project
Extract the project folder to your desired location.

### Step 2: Install Dependencies

**Option A: Using Setup Script (Recommended)**
```bash
double-click setup.bat
```

**Option B: Manual Installation**
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 3: Configure MongoDB

Make sure MongoDB is running. By default, it runs on `localhost:27017`.

If you need to change the connection string, edit `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/schoolpro
```

### Step 4: Run the Application

**Start Backend Server:**
```bash
double-click run-backend.bat
```
Or manually:
```bash
cd backend
npm run dev
```
Backend runs on: http://localhost:5000

**Start Frontend Server:**
```bash
double-click run-frontend.bat
```
Or manually:
```bash
cd frontend
npm start
```
Frontend runs on: http://localhost:3000

### Step 5: Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:3000
- **API Health Check**: http://localhost:5000/api/v1/health

## Batch Files Included

| File | Description |
|------|-------------|
| `setup.bat` | Installs all dependencies for backend and frontend |
| `run-backend.bat` | Starts the backend server (requires MongoDB) |
| `run-frontend.bat` | Starts the frontend development server |

## Default Login Credentials

After starting the application, you can register a new user through the registration form. The system supports the following roles:

- `super_admin` - Full system access
- `principal` - School administration
- `registrar` - Student records management
- `accountant` - Finance management
- `librarian` - Library management
- `teacher` - Teacher portal
- `student` - Student portal
- `parent` - Parent portal

## Project Structure

```
schoolpro/
├── SPEC.md              # Technical specification
├── setup.bat            # Setup script
├── run-backend.bat      # Run backend
├── run-frontend.bat     # Run frontend
├── backend/             # Express API
│   ├── src/
│   │   ├── config/     # Database config
│   │   ├── controllers/
│   │   ├── middleware/ # Auth middleware
│   │   ├── models/     # MongoDB models
│   │   └── routes/     # API routes
│   └── package.json
└── frontend/            # React App
    ├── public/
    └── src/
        ├── components/  # Reusable components
        ├── pages/      # Page components
        ├── services/   # API services
        ├── slices/     # Redux slices
        └── store/      # Redux store
```

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB service is running
- Check the connection string in `backend/.env`

### Port Already in Use
- Backend default port: 5000
- Frontend default port: 3000
- Stop any other application using these ports

### Node Modules Issues
- Delete `node_modules` folder and `package-lock.json`
- Run `npm install` again

## API Endpoints

Base URL: `http://localhost:5000/api/v1`

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/auth/login` | POST | User login |
| `/auth/register` | POST | User registration |
| `/auth/refresh-token` | POST | Refresh access token |
| `/users` | GET | Get all users |
| `/students` | GET/POST | Students CRUD |
| `/teachers` | GET/POST | Teachers CRUD |
| `/classes` | GET/POST | Classes CRUD |
| `/subjects` | GET/POST | Subjects CRUD |
| `/attendance/mark` | POST | Mark attendance |
| `/grades` | GET/POST | Grades CRUD |
| `/fees` | GET/POST | Fee structures |
| `/fees/collect` | POST | Collect payment |

## License

MIT License

---

For more information, see the technical specification in `SPEC.md`.
