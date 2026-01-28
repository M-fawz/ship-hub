import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { MdLanguage, MdCloudUpload } from "react-icons/md";
import styles from "./Register.module.css";

/**
 * Register Component
 * Handles multi-role registration (Customer/Forwarder) with i18n support.
 * Currently uses a mock authentication flow for development purposes.
 */
export const Register = () => {
  const { t, i18n } = useTranslation(); 
  const navigate = useNavigate();
  
  // Local state for UI controls and form data
  const [role, setRole] = useState<'customer' | 'forwarder'>('customer');
  const [lang, setLang] = useState(i18n.language);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    companyName: '',
    phoneNumber: '',
    companyRegistrationNumber: '',
    businessType: '',
  });

  /**
   * Switches language between English and Arabic
   * Updates i18next instance and component local state
   */
  const toggleLang = useCallback(() => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang); 
    setLang(newLang); 
  }, [i18n]);

  // Sync document direction with current language
  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"; 
  }, [lang]);

  /**
   * Mock Registration Handler
   * Simulates an API call and stores mock user data in LocalStorage
   */
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log("Starting mock registration for:", formData.companyName);

    // Simulate network latency
    setTimeout(() => {
      try {
        // Persist mock auth session
        localStorage.setItem('token', 'mock_token_12345');
        localStorage.setItem('user', JSON.stringify({
          companyName: formData.companyName,
          email: formData.email,
          userType: role,
          joinedDate: new Date().toISOString(),
          trialDaysLeft: 90
        }));

        setLoading(false);
        navigate("/dashboard"); 
      } catch (err) {
        setError("Registration failed. Please try again.");
        setLoading(false);
      }
    }, 1500);
  };

  /**
   * Universal input change handler
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.container}>
      {/* Header with Branding and Language Switcher */}
      <div className={styles.header}>
        <h2 className="text-2xl font-black text-slate-800">{t("register_now")}</h2>
        <button className={styles.langButton} onClick={toggleLang} type="button">
          <MdLanguage size={20} />
          <span>{lang === "en" ? "العربية" : "English"}</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-3 mb-4 rounded-xl text-sm animate-pulse">
          {error}
        </div>
      )}

      {/* Role Selection (UX: Distinct visual feedback for active role) */}
      <div className={styles.roleSelector}>
        <button 
          type="button"
          className={`${styles.roleButton} ${role === 'customer' ? styles.active : ''}`} 
          onClick={() => setRole('customer')}
        >
          {lang === 'en' ? 'Shipper' : 'صاحب بضاعة'}
        </button>
        <button 
          type="button"
          className={`${styles.roleButton} ${role === 'forwarder' ? styles.active : ''}`} 
          onClick={() => setRole('forwarder')}
        >
          {lang === 'en' ? 'Forwarder' : 'وكيل شحن'}
        </button>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        {/* Core Identity Fields */}
        <input 
          name="companyName"
          type="text" 
          placeholder={lang === 'en' ? "Company Legal Name" : "اسم الشركة القانوني"} 
          className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-semibold"
          onChange={handleInputChange}
          required 
        />

        <input 
          name="email"
          type="email" 
          placeholder={lang === 'en' ? "Business Email" : "البريد الإلكتروني للعمل"} 
          className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-semibold"
          onChange={handleInputChange}
          required 
        />

        <input 
          name="password"
          type="password" 
          placeholder={lang === 'en' ? "Password" : "كلمة المرور"} 
          className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-semibold"
          onChange={handleInputChange}
          required 
        />

        {/* Dynamic Fields Based on Role Selection */}
        {role === 'customer' ? (
          <div className="space-y-4 animate-fadeIn">
            <input 
              name="companyRegistrationNumber"
              type="text" 
              placeholder="Commercial Registry (CR)" 
              className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              onChange={handleInputChange}
              required 
            />
            <select 
              name="businessType"
              className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none appearance-none font-bold text-slate-500"
              onChange={handleInputChange}
            >
              <option value="">{lang === 'en' ? "Team Size" : "حجم الفريق"}</option>
              <option value="Small">1-10 Employees</option>
              <option value="Medium">11-50 Employees</option>
              <option value="Large">Enterprise (100+)</option>
            </select>
          </div>
        ) : (
          <div className="space-y-4 animate-fadeIn">
            <input 
              name="businessType"
              type="text" 
              placeholder="Specialization (e.g., Cold Chain, Air Freight)" 
              className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              onChange={handleInputChange}
              required 
            />
            {/* File Upload Zone */}
            <label className="border-2 border-dashed border-slate-200 p-6 flex flex-col items-center justify-center rounded-2xl bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
              <input 
                type="file" 
                className="hidden"
                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
              />
              <MdCloudUpload size={32} className="text-slate-400 mb-2" />
              <p className="text-xs font-bold text-slate-500">
                {file ? file.name : (lang === 'en' ? "Upload Registration License" : "رفع رخصة السجل التجاري")}
              </p>
            </label>
          </div>
        )}

        {/* Legal Agreements */}
        <div className="flex items-start gap-3 py-2">
          <input type="checkbox" id="terms" className="mt-1 w-4 h-4 accent-indigo-600" required />
          <label htmlFor="terms" className="text-[11px] leading-tight text-slate-500 font-medium">
            {lang === 'en' 
              ? "I agree to the 1.5% commission policy applied after the 90-day free trial period." 
              : "أوافق على سياسة العمولة (1.5%) والتي تطبق بعد انتهاء الفترة التجريبية (90 يوم)."}
          </label>
        </div>

        {/* Action Button */}
        <button 
          type="submit" 
          className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Processing..." : t("register_now")}
        </button>
      </form>
    </div>
  );
};