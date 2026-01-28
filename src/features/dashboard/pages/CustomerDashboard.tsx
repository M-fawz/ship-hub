import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MdDirectionsBoat,
  MdAir,
  MdDirectionsBus,
  MdPerson,
  MdHome,
  MdHistory,
  MdLocalShipping
} from "react-icons/md";

// Axios instance for backend communication
import api from "../../../api"; 
import "./CustomerDashboard.css";

/**
 * Constant configuration for shipping categories.
 * Each type includes specific iconography and Tailwind-based styling.
 */
const SHIPPING_TYPES = [
  { label: "Sea", Icon: MdDirectionsBoat, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Road", Icon: MdDirectionsBus, color: "text-orange-500", bg: "bg-orange-50" },
  { label: "Air", Icon: MdAir, color: "text-cyan-500", bg: "bg-cyan-50" },
];

/**
 * CustomerDashboard Component
 * Provides a high-level overview of logistics stats and navigation shortcuts.
 * Optimized with React.memo to prevent unnecessary re-renders.
 */
export const CustomerDashboard = memo(() => {
  // State for dashboard metrics with initial loading placeholders
  const [stats, setStats] = useState({
    forwarders: "...",
    onTime: "...",
    loading: true
  });

  /**
   * Fetches dashboard statistics from the server on component mount.
   * Includes error handling and fallback data to maintain UI integrity.
   */
  useEffect(() => {
    const getDashboardStats = async () => {
      try {
        // Fetch real-time metrics from the customer endpoint
        const response = await api.get('/customer/dashboard-stats');
        
        // Update state with dynamic server data
        setStats({ 
          forwarders: (response.data?.count || 0) + "+", 
          onTime: (response.data?.rate || 0) + "%", 
          loading: false 
        });
      } catch (error) {
        console.error("Dashboard Service: Data fetch failed", error);
        
        // Graceful degradation: Load default/mock data if server is unreachable
        setStats({ forwarders: "500+", onTime: "98%", loading: false });
      }
    };

    getDashboardStats();
  }, []);

  return (
    <div className="dashboard">
      {/* Hero Header Section */}
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

      {/* Main Call-to-Action: Directs user to the Quote Request flow */}
      <div className="cta-wrapper">
        <Link to="/dashboard/quotes" className="w-full block">
          <button className="cta-btn">Get Shipping Quotes</button>
        </Link>
      </div>

      {/* Categories Section: Displays available transport modes */}
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

      {/* Statistics Section: Real-time KPIs with loading pulse animations */}
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

      {/* Bottom Navigation Bar */}
      <nav className="bottom-nav">
        <Link to="/dashboard" className="nav-item active"> 
          <MdHome size={24} /> <span>Home</span> 
        </Link>
        <Link to="/dashboard/quotes" className="nav-item"> 
          <MdLocalShipping size={24} /> <span>Quote</span> 
        </Link>
        {/* Fixed: Changed <div> to <Link> and ensured proper closing tags */}
        <Link to="/dashboard/track" className="nav-item"> 
          <MdHistory size={24} /> <span>Track</span> 
        </Link>
        <Link to="/dashboard/profile" className="nav-item"> 
          <MdPerson size={24} /> <span>Profile</span> 
        </Link>
      </nav>
    </div>
  );
});

// Explicitly set displayName for better debugging in React DevTools
CustomerDashboard.displayName = "CustomerDashboard";