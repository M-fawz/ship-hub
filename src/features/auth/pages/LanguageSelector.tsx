import { useState, useEffect, useCallback } from "react";
import { MdLanguage } from "react-icons/md";
import { useTranslation } from "react-i18next";
import styles from "./Login.module.css";

/**
 * LanguageSelector Component
 * Provides a dropdown to switch between English (LTR) and Arabic (RTL).
 * Dynamically updates document attributes for layout and accessibility.
 */
export const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState(i18n.language);

  // Supported languages configuration
  const languages = [
    { code: "en", label: "English" },
    { code: "ar", label: "العربية" },
  ];

  /**
   * changeLang - Updates i18next instance and local UI state
   * @param code - Language code (e.g., 'en', 'ar')
   */
  const changeLang = useCallback((code: string) => {
    i18n.changeLanguage(code);
    setLang(code);
    setOpen(false);
  }, [i18n]);

  /**
   * Effect: Sync Document Metadata
   * Updates 'dir' (direction) and 'lang' attributes on the root HTML element.
   * This is critical for proper RTL support and Screen Readers.
   */
  useEffect(() => {
    const direction = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = direction;
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="relative inline-block">
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`${styles.button} ${styles["language-btn"]}`}
        title="Change Language"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <MdLanguage className="w-6 h-6" />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div 
          className={`${styles["language-dropdown"]} animate-fadeIn`}
          role="menu"
        >
          {languages.map((l) => (
            <button
              key={l.code}
              role="menuitem"
              onClick={() => changeLang(l.code)}
              className={`
                ${styles["language-option"]} 
                ${lang === l.code ? styles["active-lang"] : ""}
              `}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};