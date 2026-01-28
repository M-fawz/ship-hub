import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { Login } from '../features/auth/pages/Login';
import { Register } from '../pages/Register';

// Dashboard Components and Layouts
import { CustomerLayout } from '../features/dashboard/layouts/CustomerLayout'; 
import { CustomerDashboard } from '../features/dashboard/pages/CustomerDashboard';
import RequestQuote from '../features/dashboard/pages/RequestQuote/RequestQuote'; 

/**
 * Temporary Placeholder Components
 * Used to prevent routing errors while features are under development.
 */
const TrackShipment = () => <div style={{padding: '20px'}}><h2>🚚 Shipment Tracking (Coming Soon)</h2></div>;
const ShipmentHistory = () => <div style={{padding: '20px'}}><h2>📜 Shipment History (Coming Soon)</h2></div>;
const ProfilePage = () => <div style={{padding: '20px'}}><h2>👤 Profile Settings</h2></div>;

/**
 * Main Application Routing Engine
 * Defines the hierarchy of accessible pages and their shared layouts.
 */
export const AppRoutes = () => {
  return (
    <Routes>
      
      {/* --- Authentication Group --- */}
      {/* Shared Layout: Backgrounds, Logo, and Language Switchers for Auth pages */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* --- Protected Dashboard Group --- */}
      {/* Shared Layout: Sidebar, Top Navigation, and Main Content Wrapper */}
      <Route path="/dashboard" element={<CustomerLayout />}>
        
        {/* Default Dashboard Landing: /dashboard */}
        <Route index element={<CustomerDashboard />} />
        
        {/* Quote Management: /dashboard/quotes */}
        <Route path="quotes" element={<RequestQuote />} /> 
        
        {/* Real-time Tracking: /dashboard/track */}
        <Route path="track" element={<TrackShipment />} />

        {/* Archives: /dashboard/history */}
        <Route path="history" element={<ShipmentHistory />} />

        {/* User Account: /dashboard/profile */}
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      {/* --- Redirect Fallbacks --- */}
      {/* Root Path Redirect */}
      <Route path="/" element={<Navigate to="/login" />} />
      
      {/* 404 - Not Found Redirect (Safety Net) */}
      <Route path="*" element={<Navigate to="/login" />} />

    </Routes>
  );
};