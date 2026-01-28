import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom"; // لإضافة التنقل بين الصفحات
import {
  MdDirectionsBoat,
  MdAir,
  MdDirectionsBus,
  MdPerson,
  MdHome,
  MdHistory,
  MdLocalShipping
} from "react-icons/md";

// تأكد أن هذا المسار يشير لملف الـ axios الخاص بك
import api from "../../../api"; 
import "./CustomerDashboard.css";

const SHIPPING_TYPES = [
  { label: "Sea", Icon: MdDirectionsBoat, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Road", Icon: MdDirectionsBus, color: "text-orange-500", bg: "bg-orange-50" },
  { label: "Air", Icon: MdAir, color: "text-cyan-500", bg: "bg-cyan-50" },
];

export const CustomerDashboard = memo(() => {
  const [stats, setStats] = useState({
    forwarders: "...",
    onTime: "...",
    loading: true
  });

  useEffect(() => {
    const getDashboardStats = async () => {
      try {
        // نداء الـ API الحقيقي
        const response = await api.get('/customer/dashboard-stats');
        
        // تحديث البيانات بناءً على رد السيرفر
        setStats({ 
          forwarders: (response.data?.count || 0) + "+", 
          onTime: (response.data?.rate || 0) + "%", 
          loading: false 
        });
      } catch (error) {
        console.error("خطأ في جلب البيانات من السيرفر:", error);
        // بيانات افتراضية (Fallback) عشان التصميم ميبوظش لو السيرفر مقفول
        setStats({ forwarders: "500+", onTime: "98%", loading: false });
      }
    };

    getDashboardStats();
  }, []);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-top">
          <h1 className="logo">Ship-Hub</h1>
          <div className="profile-icon">
            <MdPerson size={22} />
          </div>
        </div>

        <div className="header-content">
          <h2> Global Logistics <br /> Made Simple. </h2>
          <p>Instant quotes from top rated freight forwarders.</p>
        </div>
      </header>

      {/* زرار طلب الاقتباس - مربوط بصفحة الـ Quotes */}
      <div className="cta-wrapper">
        <Link to="/dashboard/quotes" className="w-full block">
          <button className="cta-btn">Get Shipping Quotes</button>
        </Link>
      </div>

      <section className="shipping-types-container">
        {SHIPPING_TYPES.map(({ label, Icon, color, bg }, index) => (
          <div key={index} className="shipping-card">
            <div className={`icon-wrapper ${bg} ${color}`}>
              <Icon size={26} />
            </div>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className="stats">
        <div className="stat-card">
          <span className={`stat-value ${stats.loading ? "animate-pulse" : ""}`}>
            {stats.forwarders}
          </span>
          <span className="stat-label">Forwarders</span>
        </div>

        <div className="stat-card">
          <span className={`stat-value success ${stats.loading ? "animate-pulse" : ""}`}>
            {stats.onTime}
          </span>
          <span className="stat-label">On Time</span>
        </div>
      </section>

      {/* شريط التنقل السفلي - روابط حقيقية */}
      <nav className="bottom-nav">
        <Link to="/dashboard" className="nav-item active"> 
          <MdHome size={24} /> <span>Home</span> 
        </Link>
        <Link to="/dashboard/quotes" className="nav-item"> 
          <MdLocalShipping size={24} /> <span>Quote</span> 
        </Link>
        <div className="nav-item"> 
          <MdHistory size={24} /> <span>Track</span> 
        </div>
        <div className="nav-item"> 
          <MdPerson size={24} /> <span>Profile</span> 
        </div>
      </nav>
    </div>
  );
});

CustomerDashboard.displayName = "CustomerDashboard";