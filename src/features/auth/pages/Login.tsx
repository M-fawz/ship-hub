import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { LanguageSelector } from "./LanguageSelector";
// import api from "../../../api"; // عطلناه مؤقتاً عشان ميعملش Error والسيرفر مقفول

export const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // --- بداية الجزء الوهمي (Mocking) ---
    console.log("Login attempt with:", email);

    // بنمثل إننا بنكلم السيرفر وبياخد وقت ثانية واحدة
    setTimeout(() => {
      // بنسيف بيانات وهمية في الـ LocalStorage عشان الداشبورد يشتغل
      localStorage.setItem('token', 'fake-jwt-token-for-testing');
      localStorage.setItem('user', JSON.stringify({
        email: email,
        companyName: "ShipHub Partner", // اسم افتراضي
        userType: 'customer', // أو forwarder حسب التجربة
        joinedDate: new Date().toISOString()
      }));

      setLoading(false);
      navigate("/dashboard"); // دخوله على الداشبورد فوراً
    }, 1000);
    // --- نهاية الجزء الوهمي ---

    /* // ده الكود الحقيقي (هتفعله لما السيرفر يشتغل)
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate("/dashboard"); 
    } catch (err: any) {
      setError(err.response?.data?.error || "حدث خطأ ما");
    } finally {
      setLoading(false);
    }
    */
  };

  return (
    <div className={styles["login-card"]}>
      <div className={styles["login-header"]}>
        <h2 className={styles["login-title"]}>{t("login")}</h2>
        <LanguageSelector />
      </div>

      {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}

      <form className={styles["login-form"]} onSubmit={handleSubmit}>
        <div className={styles["input-group"]}>
          <label className={styles["input-label"]}>{t("email")}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("email_placeholder")}
            className={styles["input-field"]}
            required
          />
        </div>

        <div className={styles["input-group"]}>
          <label className={styles["input-label"]}>{t("password")}</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className={styles["input-field"]}
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className={styles["submit-btn"]}
        >
          {loading ? t("loading...") : t("login")}
        </button>
      </form>

      <p className={styles["footer-text"]}>
        {t("dont_have_account")}
        <Link to="/register" className={styles["register-link"]}>
          {t("register_now")}
        </Link>
      </p>
    </div>
  );
};