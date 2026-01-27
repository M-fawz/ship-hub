import { MdLocalShipping, MdCheckCircle, MdDirectionsBoat } from "react-icons/md";

// تأكد من وجود كلمة export قبل const
export const CustomerDashboard = () => {
  return (
    <div className="animate-in fade-in duration-700">
      <h1 className="text-3xl font-black text-slate-800 mb-8">Dashboard Overview</h1>
      
      {/* كروت الإحصائيات (Business Model) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* كارت الوكلاء */}
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
          <div className="text-blue-600 bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-4">
            <MdLocalShipping size={28} />
          </div>
          <p className="text-3xl font-black text-slate-800">500+</p>
          <p className="text-slate-500 font-bold text-sm uppercase tracking-wide">Forwarders</p>
        </div>

        {/* كارت الدقة في المواعيد */}
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
          <div className="text-green-600 bg-green-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-4">
            <MdCheckCircle size={28} />
          </div>
          <p className="text-3xl font-black text-slate-800">98%</p>
          <p className="text-slate-500 font-bold text-sm uppercase tracking-wide">On-time Delivery</p>
        </div>

        {/* كارت الشحنات النشطة */}
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
          <div className="text-orange-600 bg-orange-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-4">
            <MdDirectionsBoat size={28} />
          </div>
          <p className="text-3xl font-black text-slate-800">03</p>
          <p className="text-slate-500 font-bold text-sm uppercase tracking-wide">Active Shipments</p>
        </div>
      </div>
    </div>
  );
};