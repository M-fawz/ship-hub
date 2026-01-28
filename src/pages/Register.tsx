import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { MdLanguage } from "react-icons/md";
import styles from "./Register.module.css";
// import api from "../api"; // معطل مؤقتاً لعدم توفر السيرفر

export const Register = () => {
  const { t, i18n } = useTranslation(); 
  const navigate = useNavigate();
  const [role, setRole] = useState<'customer' | 'forwarder'>('customer');
  const [lang, setLang] = useState(i18n.language);

  // 1. تخزين بيانات المدخلات
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    companyName: '',
    phoneNumber: '',
    companyRegistrationNumber: '',
    businessType: '',
  });
  
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleLang = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang); 
    setLang(newLang); 
  };

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"; 
  }, [lang]);

  // 2. الفنكشن السحرية للتسجيل (بدون سيرفر)
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // --- محاكاة السيرفر (Mocking) ---
    console.log("جارٍ التسجيل التجريبي لشركة:", formData.companyName);

    setTimeout(() => {
      // حفظ بيانات "وهمية" في المتصفح عشان الداشبورد يقرأها
      localStorage.setItem('token', 'mock_token_12345');
      localStorage.setItem('user', JSON.stringify({
        companyName: formData.companyName,
        email: formData.email,
        userType: role,
        joinedDate: new Date().toISOString(),
        trialDaysLeft: 90
      }));

      setLoading(false);
      navigate("/dashboard"); // التوجه للداشبورد
    }, 1500);
    // -------------------------------
  };

  return (
    <div className={styles.container}>
      {/* الهيدر */}
      <div className={styles.header}>
        <h2 className="text-2xl font-bold text-indigo-700">{t("register_now")}</h2>
        <button className={styles.langButton} onClick={toggleLang}>
          <MdLanguage /> {lang === "en" ? "العربية" : "English"}
        </button>
      </div>

      {error && <div className="bg-red-100 text-red-600 p-2 mb-4 rounded text-center">{error}</div>}

      {/* اختيار الرتبة (تاجر أو وكيل) */}
      <div className={styles.roleSelector}>
        <button 
          className={`${styles.roleButton} ${role === 'customer' ? styles.active : ''}`} 
          onClick={() => setRole('customer')}
        >
          {lang === 'en' ? 'Customer' : 'عميل شحن'}
        </button>
        <button 
          className={`${styles.roleButton} ${role === 'forwarder' ? styles.active : ''}`} 
          onClick={() => setRole('forwarder')}
        >
          {lang === 'en' ? 'Forwarder' : 'وكيل شحن'}
        </button>
      </div>

      <form onSubmit={handleRegister}>
        {/* اسم الشركة */}
        <div className={styles.formField}>
          <input 
            type="text" 
            placeholder={lang === 'en' ? "Company Name" : "اسم الشركة"} 
            className="w-full p-3 border rounded-lg"
            onChange={(e) => setFormData({...formData, companyName: e.target.value})}
            required 
          />
        </div>

        {/* البريد الإلكتروني */}
        <div className={styles.formField}>
          <input 
            type="email" 
            placeholder={lang === 'en' ? "Email Address" : "البريد الإلكتروني"} 
            className="w-full p-3 border rounded-lg"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required 
          />
        </div>

        {/* كلمة المرور */}
        <div className={styles.formField}>
          <input 
            type="password" 
            placeholder={lang === 'en' ? "Password" : "كلمة المرور"} 
            className="w-full p-3 border rounded-lg"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required 
          />
        </div>

        {/* الحقول المتغيرة حسب الرتبة */}
        {role === 'customer' ? (
          <>
            <div className={styles.formField}>
              <input 
                type="text" 
                placeholder="CR Number (سجل تجاري)" 
                className="w-full p-3 border rounded-lg"
                onChange={(e) => setFormData({...formData, companyRegistrationNumber: e.target.value})}
                required 
              />
            </div>
            <div className={styles.formField}>
              <select 
                className="w-full p-3 rounded-lg border bg-white"
                onChange={(e) => setFormData({...formData, businessType: e.target.value})}
              >
                <option value="">{lang === 'en' ? "Company Size" : "حجم الشركة"}</option>
                <option value="Small">1-10</option>
                <option value="Medium">11-50</option>
                <option value="Large">100+</option>
              </select>
            </div>
          </>
        ) : (
          <>
            <div className={styles.formField}>
              <input 
                type="text" 
                placeholder="Specialization (Air, Sea, Land)" 
                className="w-full p-3 border rounded-lg"
                onChange={(e) => setFormData({...formData, businessType: e.target.value})}
                required 
              />
            </div>
            <div className="border-dashed border-2 p-4 text-center cursor-pointer mb-4 rounded-lg bg-gray-50">
              <input 
                type="file" 
                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                className="block w-full text-sm"
              />
              <p className="text-xs mt-2 text-gray-500">
                {lang === 'en' ? "Upload CR Document" : "رفع السجل التجاري"}
              </p>
            </div>
          </>
        )}

        {/* الموافقة على العمولة 1.5% */}
        <div className="flex items-start mb-6">
          <input type="checkbox" id="terms" className="mt-1" required />
          <label htmlFor="terms" className="text-xs ml-2 italic text-gray-600 px-2">
            {lang === 'en' 
              ? "I agree to the Terms & 1.5% commission policy after 3 months trial." 
              : "أوافق على الشروط وسياسة عمولة 1.5% بعد فترة التجربة (3 شهور)."}
          </label>
        </div>

        {/* زر الإرسال */}
        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? "..." : t("register_now")}
        </button>
      </form>
    </div>
  );
};