import { useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  MdHome, MdLocalShipping, MdTranslate, MdLogout, 
  MdHistory, MdPerson, MdDarkMode, MdLightMode 
} from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import api from "../../../api"; 
import "./CustomerLayout.css";

export const CustomerLayout = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [trialDays, setTrialDays] = useState(0);
  
  // نظام الألوان (Dark/Light Mode)
  const [isDark, setIsDark] = useState(localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    // تطبيق الـ Theme على مستوى الـ HTML
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    const fetchTrialData = async () => {
      try {
        const response = await api.get('/customer/subscription-status');
        setTrialDays(response.data.remainingDays);
      } catch {
        setTrialDays(85); 
      }
    };
    fetchTrialData();
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  const isRtl = i18n.language === 'ar';

  return (
    <div className={`app-wrapper ${isRtl ? 'rtl' : 'ltr'}`}>
      {/* Navbar عصري (Glassmorphism Effect) */}
      <nav className="main-navbar">
        <div className="nav-container">
          <div className="nav-left">
            {/* اللوجو يعمل كزرار هوم رئيسي */}
            <Link to="/dashboard" className="brand-logo">SHIPHUB</Link>
            
            <div className="nav-links-desktop">
              <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
                <MdHome size={18} /> <span>{t("dashboard_home")}</span>
              </Link>
              <Link to="/dashboard/quotes" className={location.pathname === '/dashboard/quotes' ? 'active' : ''}>
                <MdLocalShipping size={18} /> <span>{t("quotes")}</span>
              </Link>
            </div>
          </div>

          <div className="nav-right">
            {/* زرار تغير الألوان - عصري جداً */}
            <button onClick={() => setIsDark(!isDark)} className="theme-toggle" title="Toggle Mode">
              {isDark ? <MdLightMode size={22} className="sun-icon" /> : <MdDarkMode size={22} className="moon-icon" />}
            </button>

            {/* زر تغيير اللغة */}
            <button onClick={toggleLanguage} className="icon-action-btn lang-switcher">
              <MdTranslate size={20} />
              <span className="lang-label">{i18n.language.toUpperCase()}</span>
            </button>

            {/* البروفايل والخروج */}
            <div className="user-actions">
              <Link to="/dashboard/profile" className="icon-action-btn"><MdPerson size={22} /></Link>
              <Link to="/login" className="icon-action-btn logout-accent"><MdLogout size={20} /></Link>
            </div>
          </div>
        </div>
      </nav>

      {/* منطقة المحتوى */}
      <main className="page-content">
        <div className="content-container">
          <Outlet />
        </div>
      </main>

      {/* كارت التجربة العائم */}
      <div className="floating-trial-card">
        <div className="trial-header">
           <span className="days-left">{trialDays}</span>
           <p>{t("days_remaining")}</p>
        </div>
        <div className="progress-track">
           <div className="progress-fill" style={{width: `${(trialDays/90)*100}%`}}></div>
        </div>
      </div>
    </div>
  );
};