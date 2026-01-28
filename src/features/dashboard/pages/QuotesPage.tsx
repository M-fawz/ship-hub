import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdLocationOn, MdFlag, MdLocalShipping, MdArrowForward } from 'react-icons/md';
import { useTranslation } from 'react-i18next'; // استيراد الترجمة
import api from "../../../api"; 

export const QuotesPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isRtl = i18n.language === 'ar';

  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    cargoType: 'Standard Container'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/quotes/request', formData);
      if (response.status === 200) {
        alert(isRtl ? "تم بنجاح! تم إخطار شركات الشحن." : "Success! Forwarders are notified.");
        navigate('/dashboard');
      }
    } catch (error) {
      console.error("Quote Error:", error);
      alert(isRtl ? "حدث خطأ ما، حاول مرة أخرى." : "Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-[#F8FAFF] pb-24 ${isRtl ? 'font-arabic' : ''}`}>
      {/* Header */}
      <div className="bg-[#003580] p-8 pt-12 rounded-b-[3rem] shadow-lg mb-8 text-center md:text-start">
        <h1 className="text-white text-2xl font-black">
          {isRtl ? "طلب سعر شحن" : "Request Quote"}
        </h1>
        <p className="text-blue-100/70 text-sm mt-1">
          {isRtl ? "احصل على أفضل الأسعار في ثوانٍ." : "Get the best rates in seconds."}
        </p>
      </div>

      <div className="px-6 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-50 space-y-6">
          
          {/* Origin Input */}
          <div className="space-y-3 text-start">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">
              <MdLocationOn className="text-blue-500" size={14}/> 
              {isRtl ? "ميناء القيام" : "Origin Port"}
            </label>
            <input 
              required
              type="text" 
              dir={isRtl ? "rtl" : "ltr"}
              value={formData.origin}
              onChange={(e) => setFormData({...formData, origin: e.target.value})}
              placeholder={isRtl ? "الدولة أو المدينة" : "Country or City"} 
              className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-700 placeholder:text-slate-300" 
            />
          </div>

          {/* سهم الاتجاه - يلف 180 درجة في العربي */}
          <div className="flex justify-center -my-3">
             <div className="bg-blue-50 p-2 rounded-full border-4 border-white z-10 shadow-sm">
                <MdArrowForward className={`text-blue-600 ${isRtl ? 'rotate-180' : ''} md:rotate-0 rotate-90`} />
             </div>
          </div>

          {/* Destination Input */}
          <div className="space-y-3 text-start">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">
              <MdFlag className="text-emerald-500" size={14}/> 
              {isRtl ? "ميناء الوصول" : "Destination"}
            </label>
            <input 
              required
              type="text" 
              dir={isRtl ? "rtl" : "ltr"}
              value={formData.destination}
              onChange={(e) => setFormData({...formData, destination: e.target.value})}
              placeholder={isRtl ? "عنوان التوصيل" : "Delivery Address"} 
              className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-700 placeholder:text-slate-300" 
            />
          </div>

          {/* Cargo Type Select */}
          <div className="space-y-3 text-start">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">
              <MdLocalShipping className="text-orange-500" size={14}/> 
              {isRtl ? "نوع الشحنة" : "Cargo Type"}
            </label>
            <div className="relative">
              <select 
                dir={isRtl ? "rtl" : "ltr"}
                value={formData.cargoType}
                onChange={(e) => setFormData({...formData, cargoType: e.target.value})}
                className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none font-bold text-slate-700 appearance-none cursor-pointer pr-10"
              >
                <option value="Standard Container">{isRtl ? "حاوية قياسية" : "Standard Container"}</option>
                <option value="Flat Rack">{isRtl ? "فلات راك" : "Flat Rack"}</option>
                <option value="Refrigerated">{isRtl ? "شحنة مبردة" : "Refrigerated"}</option>
              </select>
            </div>
          </div>

          <button 
            disabled={loading}
            type="submit" 
            className="w-full py-5 bg-blue-600 text-white rounded-[1.5rem] font-black text-lg shadow-lg shadow-blue-200 active:scale-95 transition-all mt-4 disabled:bg-slate-300"
          >
            {loading ? (isRtl ? "جاري البحث..." : "Searching...") : (isRtl ? "احصل على عروض أسعار" : "Get Instant Quotes")}
          </button>
        </form>
      </div>
    </div>
  );
};