import React, { useState, useCallback } from 'react';
import { MdLocalShipping, MdLocationOn, MdInventory, MdSend } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import "./RequestQuote.css";

/**
 * RequestQuote Component
 * Renders a multi-section form for logistics quote requests.
 * Features: Responsive grid, dynamic mode selection, and theme-aware styling.
 */
const RequestQuote: React.FC = () => {
  const { t } = useTranslation();

  // Unified form state for centralized data management
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    weight: '',
    dimensions: '',
    cargoType: 'general',
    shippingMode: 'sea' // Options: sea | air | land
  });

  /**
   * Generic input change handler to minimize code duplication
   * @param e - Change event from input, select, or radio
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Handles form submission
   * Prevents default browser behavior and logs data for API integration
   */
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting Quote Request:", formData);
    
    // Placeholder for future API integration
    alert("Quote request sent successfully!");
  }, [formData]);

  return (
    <div className="quote-page">
      {/* Header Section */}
      <header className="quote-header">
        <h1>{t("request_quote_title") || "Request a New Quote"}</h1>
        <p>{t("quote_subtitle") || "Real-time logistics rates at your fingertips"}</p>
      </header>

      <form onSubmit={handleSubmit} className="quote-form">
        <div className="form-grid">
          
          {/* Section: Route Details */}
          <section className="form-card">
            <div className="card-title">
              <MdLocationOn className="icon" /> 
              <h3>Route Details</h3>
            </div>
            <div className="input-group">
              <label>Origin City/Port</label>
              <input 
                name="origin"
                type="text" 
                placeholder="e.g. Shanghai, CN"
                value={formData.origin}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Destination City/Port</label>
              <input 
                name="destination"
                type="text" 
                placeholder="e.g. Dubai, UAE"
                value={formData.destination}
                onChange={handleInputChange}
                required
              />
            </div>
          </section>

          {/* Section: Cargo Details */}
          <section className="form-card">
            <div className="card-title">
              <MdInventory className="icon" /> 
              <h3>Cargo Details</h3>
            </div>
            <div className="input-row">
              <div className="input-group">
                <label>Weight (KG)</label>
                <input 
                  name="weight"
                  type="number" 
                  placeholder="0.00"
                  value={formData.weight}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <label>Cargo Type</label>
                <select name="cargoType" value={formData.cargoType} onChange={handleInputChange}>
                  <option value="general">General Cargo</option>
                  <option value="dangerous">Dangerous Goods</option>
                  <option value="perishable">Perishable</option>
                </select>
              </div>
            </div>
            <div className="input-group">
              <label>Dimensions (L x W x H cm)</label>
              <input 
                name="dimensions"
                type="text" 
                placeholder="120 x 80 x 100"
                value={formData.dimensions}
                onChange={handleInputChange}
              />
            </div>
          </section>

          {/* Section: Shipping Mode (Full Width) */}
          <section className="form-card full-width">
            <div className="card-title">
              <MdLocalShipping className="icon" /> 
              <h3>Shipping Mode</h3>
            </div>
            <div className="mode-selector">
              {['sea', 'air', 'land'].map((mode) => (
                <label key={mode} className={formData.shippingMode === mode ? 'active' : ''}>
                  <input 
                    type="radio" 
                    name="shippingMode" 
                    value={mode} 
                    checked={formData.shippingMode === mode}
                    onChange={handleInputChange} 
                  />
                  <span>
                    {mode === 'sea' && '🚢 Sea Freight'}
                    {mode === 'air' && '✈️ Air Freight'}
                    {mode === 'land' && '🚛 Land Freight'}
                  </span>
                </label>
              ))}
            </div>
          </section>
        </div>

        {/* Action Button */}
        <button type="submit" className="submit-quote-btn">
          <MdSend /> Get Instant Rates
        </button>
      </form>
    </div>
  );
};

export default RequestQuote;