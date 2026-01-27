// React imports
import { useState, useEffect } from "react";
// i18next for translations
import { useTranslation } from "react-i18next";
// Language icon
import { MdLanguage } from "react-icons/md";
// CSS Module import
import styles from "./Register.module.css";

// Register Page Component
export const Register = () => {
  const { t, i18n } = useTranslation(); // Translation functions
  const [role, setRole] = useState<'customer' | 'forwarder'>('customer'); // User role state
  const [lang, setLang] = useState(i18n.language); // Current language state

  // Toggle language between English and Arabic
  const toggleLang = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang); // Change i18next language
    setLang(newLang); // Update state
  };

  // Update page direction & dark mode based on language/system preference
  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"; // Set RTL for Arabic
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.body.classList.toggle("dark", prefersDark); // Apply dark mode if system prefers
  }, [lang]);

  return (
    <div className={`${styles.container} ${document.body.classList.contains('dark') ? 'dark' : ''}`}>
      
      {/* Header: Title + Language Button */}
      <div className={styles.header}>
        <h2>{t("register_now")}</h2>
        <button className={styles.langButton} onClick={toggleLang}>
          <MdLanguage /> {lang === "en" ? "العربية" : "English"}
        </button>
      </div>

      {/* Role Selector Buttons */}
      <div className={styles.roleSelector}>
        <button 
          className={`${styles.roleButton} ${role === 'customer' ? 'active' : ''}`} 
          onClick={() => setRole('customer')}
        >
          {lang === 'en' ? 'Customer' : 'عميل شحن'}
        </button>
        <button 
          className={`${styles.roleButton} ${role === 'forwarder' ? 'active' : ''}`} 
          onClick={() => setRole('forwarder')}
        >
          {lang === 'en' ? 'Forwarder' : 'وكيل شحن'}
        </button>
      </div>

      {/* Registration Form */}
      <form>
        {/* Company Name */}
        <div className={styles.formField}>
          <input type="text" placeholder="Company Name" required />
        </div>

        {/* Email */}
        <div className={styles.formField}>
          <input type="email" placeholder="Email Address" required />
        </div>

        {/* Conditional fields based on role */}
        {role === 'customer' ? (
          <>
            {/* Customer-specific fields */}
            <div className={styles.formField}>
              <input type="text" placeholder="CR Number (سجل تجاري)" required />
            </div>
            <div className={styles.formField}>
              <select>
                <option>Company Size</option>
                <option>01-10</option>
                <option>11-50</option>
                <option>100+</option>
              </select>
            </div>
          </>
        ) : (
          <>
            {/* Forwarder-specific fields */}
            <div className={styles.formField}>
              <input type="text" placeholder="Specialization (Air, Sea, Land)" required />
            </div>
            <div className={styles.uploadBox}>
              Upload CR Document & License
            </div>
          </>
        )}

        {/* Terms & Conditions Checkbox */}
        <div className={styles.checkboxContainer}>
          <input type="checkbox" required />
          <p>I agree to the Terms & Conditions and 1.5% commission policy after trial.</p>
        </div>

        {/* Submit Button */}
        <button type="submit" className={styles.submitButton}>
          {t("register_now")}
        </button>
      </form>
    </div>
  );
};
