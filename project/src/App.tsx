import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

// Faculty Pages
import FacultyDashboard from './pages/faculty/Dashboard';
import FacultyRooms from './pages/faculty/Rooms';
import FacultyRoomDetails from './pages/faculty/RoomDetails';
import FacultyBookings from './pages/faculty/Bookings';

// Incharge Pages
import InchargeDashboard from './pages/incharge/Dashboard';
import InchargeRooms from './pages/incharge/Rooms';
import InchargeRoomDetails from './pages/incharge/RoomDetails';
import InchargeBookings from './pages/incharge/Bookings';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminRooms from './pages/admin/Rooms';
import AdminRoomDetails from './pages/admin/RoomDetails';
import AdminUsers from './pages/admin/Users';
import AdminBookings from './pages/admin/Bookings';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) => {
  const { user, isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user?.role || '')) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

function App() {
  const { isAuthenticated, user } = useAuthStore();

  // Redirect to appropriate dashboard based on user role
  const getDashboardPath = () => {
    if (!isAuthenticated) return '/login';
    
    switch (user?.role) {
      case 'faculty':
        return '/faculty/dashboard';
      case 'incharge':
        return '/incharge/dashboard';
      case 'admin':
        return '/admin/dashboard';
      default:
        return '/login';
    }
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Dashboard Redirect */}
      <Route path="/dashboard" element={<Navigate to={getDashboardPath()} replace />} />

      {/* Faculty Routes */}
      <Route path="/faculty" element={
        <ProtectedRoute allowedRoles={['faculty']}>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<FacultyDashboard />} />
        <Route path="rooms" element={<FacultyRooms />} />
        <Route path="rooms/:id" element={<FacultyRoomDetails />} />
        <Route path="bookings" element={<FacultyBookings />} />
      </Route>

      {/* Incharge Routes */}
      <Route path="/incharge" element={
        <ProtectedRoute allowedRoles={['incharge']}>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<InchargeDashboard />} />
        <Route path="rooms" element={<InchargeRooms />} />
        <Route path="rooms/:id" element={<InchargeRoomDetails />} />
        <Route path="bookings" element={<InchargeBookings />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="rooms" element={<AdminRooms />} />
        <Route path="rooms/:id" element={<AdminRoomDetails />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="bookings" element={<AdminBookings />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;