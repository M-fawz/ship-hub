import { useState, useEffect, useCallback, useMemo } from 'react';

/**
 * ThemeSettings Component
 * Manages dynamic primary color switching and persistence in LocalStorage.
 */
export const ThemeSettings = () => {
  // Toggle state for the color selection menu
  const [isOpen, setIsOpen] = useState(false);

  // Memoized color palette to prevent unnecessary re-definitions on re-renders
  const colors = useMemo(() => [
    { name: 'Blue', primary: '#3b82f6', dark: '#1e40af' },
    { name: 'Emerald', primary: '#10b981', dark: '#047857' },
    { name: 'Violet', primary: '#8b5cf6', dark: '#5b21b6' },
    { name: 'Amber', primary: '#f59e0b', dark: '#b45309' },
  ], []);

  /**
   * Updates CSS Variables and persists selection to LocalStorage
   * @param primary - The main brand color
   * @param dark - The darker shade for hover/active states
   */
  const updateTheme = useCallback((primary: string, dark: string) => {
    try {
      // Inject colors into the root document style
      document.documentElement.style.setProperty('--primary-color', primary);
      document.documentElement.style.setProperty('--primary-dark', dark);

      // Save as JSON string for structured storage
      const themeData = JSON.stringify({ primary, dark });
      localStorage.setItem('app_theme_config', themeData);
    } catch (err) {
      console.error("Theme Engine: Failed to update style properties", err);
    }
  }, []);

  /**
   * Hydration Effect: Load saved theme from LocalStorage on mount
   * Includes error handling for invalid or corrupted data
   */
  useEffect(() => {
    const savedTheme = localStorage.getItem('app_theme_config');
    
    if (savedTheme) {
      try {
        const parsed = JSON.parse(savedTheme);
        
        // Validate object structure before applying
        if (parsed?.primary && parsed?.dark) {
          updateTheme(parsed.primary, parsed.dark);
        } else {
          throw new Error("Missing properties in stored theme");
        }
      } catch (error) {
        // Recovery mechanism: Clear corrupted data and fallback to default
        console.warn("Theme Engine: Recovery from invalid data...");
        localStorage.removeItem('app_theme_config');
        updateTheme(colors[0].primary, colors[0].dark);
      }
    } else {
      // Default fallback for first-time visitors
      updateTheme(colors[0].primary, colors[0].dark);
    }
  }, [colors, updateTheme]);

  return (
    <div className="fixed bottom-6 right-6 z-[999]">
      {/* Menu Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Theme Menu"
        className="
          p-3 rounded-full bg-white border border-slate-200 shadow-lg
          transition-all duration-300 hover:rotate-12 hover:shadow-xl active:scale-90
        "
      >
        <svg
          className={`w-5 h-5 text-indigo-500 transition-transform ${isOpen ? 'rotate-45' : ''}`}
          fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* Color Selection Palette */}
      <div
        className={`
          absolute bottom-16 right-0 bg-white p-4 rounded-2xl border border-slate-100 shadow-xl
          flex gap-3 transition-all duration-300 ease-out
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
              w-9 h-9 rounded-full border-2 border-white shadow-sm
              transition-all duration-200 hover:scale-110 hover:ring-4 hover:ring-indigo-300
              active:scale-95
            "
            style={{ backgroundColor: c.primary }}
            title={`${c.name} Theme`}
          />
        ))}
      </div>
    </div>
  );
};