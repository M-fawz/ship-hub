import { useState, useEffect } from "react";
import { MdLanguage } from "react-icons/md";
import { useTranslation } from "react-i18next";
import styles from "./Login.module.css";

export const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState(i18n.language); // current language

  const languages = [
    { code: "en", label: "English" },
    { code: "ar", label: "العربية" },
  ];

  const changeLang = (code: string) => {
    i18n.changeLanguage(code);
    setLang(code); // just update state
    setOpen(false);
  };

  // Effect to update document.dir safely
 useEffect(() => {
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = lang; // ضيف السطر ده كمان
}, [lang]);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`${styles.button} ${styles["language-btn"]}`}
        title="Change Language"
      >
        <MdLanguage className="w-6 h-6" />
      </button>

      {open && (
        <div className={`${styles["language-dropdown"]}`}>
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => changeLang(l.code)}
              className={`${styles["language-option"]}`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
