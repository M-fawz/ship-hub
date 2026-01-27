// React Router imports
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { AuthLayout } from '../layouts/AuthLayout';
// تأكد أن الحرف C كبير في الكلمتين هنا
import { CustomerLayout } from '../features/dashboard/layouts/CustomerLayout'; 

// Pages
import { Login } from '../features/auth/pages/Login';
import { Register } from '../pages/Register'; 
import { CustomerDashboard } from '../features/dashboard/pages/CustomerDashboard';
import { QuotesPage } from '../features/dashboard/pages/QuotesPage';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* 1. مسارات الـ Auth */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* 2. مسارات الـ Dashboard والـ Business Model */}
      {/* استخدمنا CustomerLayout هنا عشان الـ Sidebar وعداد الـ 3 شهور المجانية يظهروا */}
      <Route path="/dashboard" element={<CustomerLayout />}>
        {/* الصفحة الرئيسية للداشبورد وفيها إحصائيات الـ 500 وكيل */}
        <Route index element={<CustomerDashboard />} />
        
        {/* صفحة الـ Quotes للتعامل مع الشحنات وعمولة الـ 1.5% */}
        <Route path="quotes" element={<QuotesPage />} />
      </Route>

      {/* Redirects */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};