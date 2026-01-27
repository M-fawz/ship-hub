// React Router
import { BrowserRouter } from 'react-router-dom';
// App Routes 
import { AppRoutes } from './pages/Router';
// i18n for translations
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

function App() {
  const { i18n } = useTranslation(); // Translation functions

  // Automatically update page direction (RTL / LTR) when language changes
  useEffect(() => {
    const currentLang = i18n.language || 'en';
    // Set text direction based on current language
    document.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    // Set HTML lang attribute
    document.documentElement.lang = currentLang;
  }, [i18n.language]);

  return (
    <BrowserRouter>
      {/* AppRoutes decides which page (Login/Register) to show based on the URL */}
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
