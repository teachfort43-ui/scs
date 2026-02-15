import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Layouts
import MainLayout from './components/layouts/MainLayout';
import AuthLayout from './components/layouts/AuthLayout';

// Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import Students from './pages/academics/Students';
import StudentDetail from './pages/academics/StudentDetail';
import Teachers from './pages/academics/Teachers';
import Classes from './pages/academics/Classes';
import Subjects from './pages/academics/Subjects';
import Attendance from './pages/academics/Attendance';
import Grades from './pages/academics/Grades';
import Fees from './pages/finance/Fees';
import FeeCollection from './pages/finance/FeeCollection';
import Library from './pages/library/Library';
import Transport from './pages/transport/Transport';
import Announcements from './pages/communication/Announcements';
import Settings from './pages/settings/Settings';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Public Route Component (redirect if logged in)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={
          <PublicRoute><Login /></PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute><Register /></PublicRoute>
        } />
      </Route>

      {/* Protected Routes */}
      <Route element={
        <ProtectedRoute><MainLayout /></ProtectedRoute>
      }>
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Academic Routes */}
        <Route path="/students" element={<Students />} />
        <Route path="/students/:id" element={<StudentDetail />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/grades" element={<Grades />} />
        
        {/* Finance Routes */}
        <Route path="/fees" element={<Fees />} />
        <Route path="/fees/collection" element={<FeeCollection />} />
        
        {/* Library */}
        <Route path="/library" element={<Library />} />
        
        {/* Transport */}
        <Route path="/transport" element={<Transport />} />
        
        {/* Communication */}
        <Route path="/announcements" element={<Announcements />} />
        
        {/* Settings */}
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
