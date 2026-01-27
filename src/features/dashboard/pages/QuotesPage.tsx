import { useState } from 'react';

export const QuotesPage = () => {
  // تفعيل الـ useState لتخزين بيانات الفورم
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    cargoType: 'Standard Container'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data to be sent to forwarders:", formData);
    alert("Searching for the best quotes from 500+ forwarders...");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-black text-slate-800">Request a Quote</h1>
        <p className="text-slate-500 font-medium">Fill in the details to get competitive offers.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Origin</label>
            <input 
              type="text" 
              value={formData.origin}
              onChange={(e) => setFormData({...formData, origin: e.target.value})}
              placeholder="e.g. Shanghai" 
              className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Destination</label>
            <input 
              type="text" 
              value={formData.destination}
              onChange={(e) => setFormData({...formData, destination: e.target.value})}
              placeholder="e.g. Alexandria" 
              className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>
        </div>

        <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-lg hover:bg-blue-700 transition-all">
          Get Instant Quotes
        </button>
      </form>
    </div>
  );
};