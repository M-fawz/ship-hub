import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import { LanguageSelector } from "./LanguageSelector";

export const Login = () => {
  const { t } = useTranslation();

  return (
    <div className={styles["login-card"]}>
      {/* Header */}
      <div className={styles["login-header"]}>
        <h2 className={styles["login-title"]}>{t("login")}</h2>
        <LanguageSelector />
      </div>

      {/* Login Form */}
      <form className={styles["login-form"]} onSubmit={(e) => e.preventDefault()}>
       <div className={styles["input-group"]}>
          <label className={styles["input-label"]}>{t("email")}</label>
          <input
            type="email"
            placeholder={t("email_placeholder")} // هنا التعديل الصح
            className={styles["input-field"]}
            required
          />
        </div>

        <div className={styles["input-group"]}>
          <label className={styles["input-label"]}>{t("password")}</label>
          <input
            type="password"
            placeholder="••••••••"
            className={styles["input-field"]}
            required
          />
        </div>

        <button type="submit" className={styles["submit-btn"]}>
          {t("login")}
        </button>
      </form>

      {/* Footer */}
      <p className={styles["footer-text"]}>
        {t("dont_have_account")}
        <Link to="/register" className={styles["register-link"]}>
          {t("register_now")}
        </Link>
      </p>
    </div>
  );
};