import { useState, useCallback } from 'react';
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { LanguageSelector } from "./LanguageSelector";

/**
 * Login Component
 * Handles user authentication through a controlled form.
 * Supports both a Mock/Demo mode and a real API integration (currently commented out).
 */
export const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Component State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Handle Login Submission
   * Simulates a network request and stores mock session data in LocalStorage.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // --- MOCK AUTHENTICATION START ---
    // Simulate API delay for development testing
    console.log("Simulating API login request for:", email);

    setTimeout(() => {
      // Create a fake session in LocalStorage
      localStorage.setItem('token', 'fake-jwt-token-for-testing');
      localStorage.setItem('user', JSON.stringify({
        email: email,
        companyName: "ShipHub Partner",
        userType: 'customer',
        joinedDate: new Date().toISOString()
      }));

      setLoading(false);
      // Navigate to the protected dashboard area
      navigate("/dashboard"); 
    }, 1000);
    // --- MOCK AUTHENTICATION END ---

    /* // PRODUCTION API INTEGRATION (Enable when Backend is ready)
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate("/dashboard"); 
    } catch (err: any) {
      setError(err.response?.data?.error || "Authentication failed");
    } finally {
      setLoading(false);
    }
    */
  };

  return (
    <div className={styles["login-card"]}>
      {/* Header Section: Title & Language Switcher */}
      <div className={styles["login-header"]}>
        <h2 className={styles["login-title"]}>{t("login")}</h2>
        <LanguageSelector />
      </div>

      {/* Error Feedback */}
      {error && (
        <div className="text-red-500 text-sm mb-4 text-center animate-bounce">
          {error}
        </div>
      )}

      {/* Main Authentication Form */}
      <form className={styles["login-form"]} onSubmit={handleSubmit}>
        
        {/* Email Input Field */}
        <div className={styles["input-group"]}>
          <label className={styles["input-label"]}>{t("email")}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("email_placeholder")}
            className={styles["input-field"]}
            required
            autoComplete="email"
          />
        </div>

        {/* Password Input Field */}
        <div className={styles["input-group"]}>
          <label className={styles["input-label"]}>{t("password")}</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className={styles["input-field"]}
            required
            autoComplete="current-password"
          />
        </div>

        {/* Submit Action */}
        <button 
          type="submit" 
          disabled={loading}
          className={styles["submit-btn"]}
        >
          {loading ? t("loading...") : t("login")}
        </button>
      </form>

      {/* Registration Link */}
      <p className={styles["footer-text"]}>
        {t("dont_have_account")}
        <Link to="/register" className={styles["register-link"]}>
          {t("register_now")}
        </Link>
      </p>
    </div>
  );
};