// React Router imports
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout for authentication pages
import { AuthLayout } from '../layouts/AuthLayout';

// Pages
import { Login } from '../features/auth/pages/Login';
import { Register } from '../pages/Register'; // New Register page

export const AppRoutes = () => {
  return (
    <Routes>
      
      {/* All auth pages wrapped inside AuthLayout */}
      <Route element={<AuthLayout />}>
        
        {/* Login page */}
        <Route path="/login" element={<Login />} />
        
        {/* Register page */}
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Catch-all route: redirect unknown paths to login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};
