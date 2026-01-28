import { useState, useEffect } from 'react';

export const ThemeSettings = () => {
  // للتحكم في فتح وإغلاق قائمة الألوان
  const [isOpen, setIsOpen] = useState(false);

  // قائمة الألوان العصرية
  const colors = [
    { name: 'Blue', primary: '#3b82f6', dark: '#1e40af' },
    { name: 'Emerald', primary: '#10b981', dark: '#047857' },
    { name: 'Violet', primary: '#8b5cf6', dark: '#5b21b6' },
    { name: 'Amber', primary: '#f59e0b', dark: '#b45309' },
  ];

  // دالة تحديث الألوان في الموقع وحفظها
  const updateTheme = (primary: string, dark: string) => {
    try {
      document.documentElement.style.setProperty('--primary-color', primary);
      document.documentElement.style.setProperty('--primary-dark', dark);

      // بنخزن البيانات كـ JSON string عشان نعرف نقرأها بعدين كـ Object
      const themeData = JSON.stringify({ primary, dark });
      localStorage.setItem('theme', themeData);
    } catch (err) {
      console.error("Failed to update theme styles", err);
    }
  };

  // تحميل الثيم عند فتح الموقع لأول مرة
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      try {
        // بنحاول نحول النص لـ Object
        const parsed = JSON.parse(savedTheme);
        
        // بنتأكد إن البيانات اللي جوه الـ Object كاملة ومش ناقصة
        if (parsed && parsed.primary && parsed.dark) {
          updateTheme(parsed.primary, parsed.dark);
        } else {
          // لو البيانات ناقصة، بنمسحها وبنحط الافتراضي
          throw new Error("Invalid theme structure");
        }
      } catch (error) {
        // لو حصل أي خطأ (زي مشكلة 'light' اللي كانت عندك)
        // بنمسح الداتا القديمة فوراً ونشغل اللون الأزرق الافتراضي
        console.warn("Recovering from invalid theme data...");
        localStorage.removeItem('theme');
        updateTheme(colors[0].primary, colors[0].dark);
      }
    } else {
      // لو مفيش ثيم متسجل أصلاً، بنستخدم الأزرق
      updateTheme(colors[0].primary, colors[0].dark);
    }
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[999]">
      {/* زرار فتح القائمة */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          p-3 rounded-full bg-white border border-slate-200 shadow-lg
          transition-all duration-300
          hover:rotate-12 hover:shadow-xl
          active:scale-90
        "
      >
        <svg
          className="w-5 h-5 text-indigo-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>

      {/* قائمة اختيار الألوان */}
      <div
        className={`
          absolute bottom-16 right-0
          bg-white p-4 rounded-2xl border border-slate-100 shadow-xl
          flex gap-3
          transition-all duration-300 ease-out
          ${isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 translate-y-2 pointer-events-none'}
        `}
      >
        {colors.map((c) => (
          <button
            key={c.name}
            onClick={() => updateTheme(c.primary, c.dark)}
            className="
              w-9 h-9 rounded-full
              border-2 border-white shadow-sm
              transition-all duration-200
              hover:scale-110 hover:ring-4 hover:ring-indigo-300
              active:scale-95
            "
            style={{ backgroundColor: c.primary }}
            title={c.name}
          />
        ))}
      </div>
    </div>
  );
};