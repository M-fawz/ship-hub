import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdLocationOn, MdFlag, MdLocalShipping, MdArrowForward } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import api from "../../../api"; 

/**
 * QuotesPage Component
 * Provides a specialized form for requesting shipping quotes with RTL support.
 * Styled using Tailwind CSS for high responsiveness and modern UI.
 */
export const QuotesPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  
  // Local state for loading and form data
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    cargoType: 'Standard Container'
  });

  // Derived state to check direction and language
  const isRtl = useMemo(() => i18n.language === 'ar', [i18n.language]);

  /**
   * Memoized Change Handler
   * Efficiently updates form fields based on input name attributes
   */
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  /**
   * Form Submission Logic
   * Sends data to the /quotes/request endpoint and handles UI feedback
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // API call to post quote request
      const response = await api.post('/quotes/request', formData);
      
      if (response.status === 200) {
        alert(isRtl ? "تم بنجاح! تم إخطار شركات الشحن." : "Success! Forwarders are notified.");
        navigate('/dashboard');
      }
    } catch (error) {
      console.error("Critical Quote Submission Error:", error);
      alert(isRtl ? "حدث خطأ ما، حاول مرة أخرى." : "Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-[#F8FAFF] pb-24 ${isRtl ? 'font-arabic' : ''}`} dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* --- Visual Header Section --- */}
      <div className="bg-[#003580] p-8 pt-12 rounded-b-[3rem] shadow-lg mb-8 text-center md:text-start">
        <h1 className="text-white text-2xl font-black tracking-tight">
          {isRtl ? "طلب سعر شحن" : "Request Quote"}
        </h1>
        <p className="text-blue-100/70 text-sm mt-1">
          {isRtl ? "احصل على أفضل الأسعار في ثوانٍ." : "Get the best rates in seconds."}
        </p>
      </div>

      <div className="px-6 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-50 space-y-6">
          
          {/* --- Origin Port Field --- */}
          <div className="space-y-3 text-start">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">
              <MdLocationOn className="text-blue-500" size={14}/> 
              {isRtl ? "ميناء القيام" : "Origin Port"}
            </label>
            <input 
              required
              name="origin"
              type="text" 
              value={formData.origin}
              onChange={handleChange}
              placeholder={isRtl ? "الدولة أو المدينة" : "Country or City"} 
              className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-700" 
            />
          </div>

          {/* --- Directional Indicator (Responsive Rotation) --- */}
          <div className="flex justify-center -my-3">
             <div className="bg-blue-50 p-2 rounded-full border-4 border-white z-10 shadow-sm">
                <MdArrowForward className={`text-blue-600 transition-transform ${isRtl ? 'rotate-180' : ''} md:rotate-0 rotate-90`} />
             </div>
          </div>

          {/* --- Destination Field --- */}
          <div className="space-y-3 text-start">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">
              <MdFlag className="text-emerald-500" size={14}/> 
              {isRtl ? "ميناء الوصول" : "Destination"}
            </label>
            <input 
              required
              name="destination"
              type="text" 
              value={formData.destination}
              onChange={handleChange}
              placeholder={isRtl ? "عنوان التوصيل" : "Delivery Address"} 
              className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-700" 
            />
          </div>

          {/* --- Cargo Category Selector --- */}
          <div className="space-y-3 text-start">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">
              <MdLocalShipping className="text-orange-500" size={14}/> 
              {isRtl ? "نوع الشحنة" : "Cargo Type"}
            </label>
            <div className="relative group">
              <select 
                name="cargoType"
                value={formData.cargoType}
                onChange={handleChange}
                className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none font-bold text-slate-700 appearance-none cursor-pointer"
              >
                <option value="Standard Container">{isRtl ? "حاوية قياسية" : "Standard Container"}</option>
                <option value="Flat Rack">{isRtl ? "فلات راك" : "Flat Rack"}</option>
                <option value="Refrigerated">{isRtl ? "شحنة مبردة" : "Refrigerated"}</option>
              </select>
              <div className={`absolute inset-y-0 ${isRtl ? 'left-4' : 'right-4'} flex items-center pointer-events-none text-slate-400`}>
                <MdArrowForward className="rotate-90" />
              </div>
            </div>
          </div>

          {/* --- Submit Button --- */}
          <button 
            disabled={loading}
            type="submit" 
            className="w-full py-5 bg-blue-600 text-white rounded-[1.5rem] font-black text-lg shadow-lg shadow-blue-200 active:scale-[0.98] hover:bg-blue-700 transition-all mt-4 disabled:bg-slate-300 disabled:shadow-none"
          >
            {loading ? (isRtl ? "جاري البحث..." : "Searching...") : (isRtl ? "احصل على عروض أسعار" : "Get Instant Quotes")}
          </button>
        </form>
      </div>
    </div>
  );
};