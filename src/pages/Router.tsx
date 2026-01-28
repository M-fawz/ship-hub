import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { Login } from '../features/auth/pages/Login';
import { Register } from '../pages/Register';

// الاستيراد بالأقواس { } لأننا استخدمنا export const
import { CustomerLayout } from '../features/dashboard/layouts/CustomerLayout'; 
import { CustomerDashboard } from '../features/dashboard/pages/CustomerDashboard';
import { QuotesPage } from '../features/dashboard/pages/QuotesPage';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<CustomerLayout />}>
        <Route index element={<CustomerDashboard />} />
        <Route path="quotes" element={<QuotesPage />} />
      </Route>

      {/* Default Redirects */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};