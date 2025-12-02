import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { COLORS } from '../constants';

const VALID_LICENSE = "RADDVIP";

const LicenseGate: React.FC = () => {
  const [license, setLicense] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();

    if (!license.trim()) {
      setError("Please enter a license key.");
      return;
    }

    if (license.trim() !== VALID_LICENSE) {
      setError("Invalid license key.");
      return;
    }

    // Save license
    localStorage.setItem("radd_license", license.trim());
    navigate("/api-key");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLicense(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-ivory p-4 relative overflow-hidden">
      {/* Abstract Background Element (Subtle Glow) */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none blur-3xl"
        style={{ background: `radial-gradient(circle, ${COLORS.GOLD} 0%, transparent 70%)` }}
      />

      <main className="w-full max-w-md z-10">
        <div className="bg-white rounded-xl shadow-[0_20px_40px_-15px_rgba(164,130,63,0.1)] p-8 md:p-12 border border-raddGold/10 flex flex-col items-center text-center transition-all duration-500 ease-out hover:shadow-[0_25px_50px_-12px_rgba(164,130,63,0.15)]">
          
          {/* Logo / Brand Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-light tracking-widest text-raddGold uppercase">RADD</h1>
            <p className="text-xs tracking-[0.3em] text-softCharcoal/60 mt-1 uppercase">Lifestyle Studio</p>
          </div>

          <form onSubmit={handleContinue} className="w-full space-y-6">
            <div className="space-y-2 text-left">
              <label 
                htmlFor="license" 
                className="text-xs font-medium uppercase tracking-wider text-softCharcoal/50 ml-1"
              >
                License Key
              </label>
              <input
                id="license"
                type="text"
                value={license}
                onChange={handleInputChange}
                placeholder="Enter your license key"
                className={`w-full px-4 py-3 rounded-lg bg-ivory border ${error ? 'border-red-400' : 'border-gray-200'} text-softCharcoal placeholder-gray-400 focus:outline-none focus:ring-2 ${error ? 'focus:ring-red-400/50 focus:border-red-400' : 'focus:ring-raddGold/50 focus:border-raddGold'} transition-all duration-300`}
              />
              {error && (
                <p className="text-xs text-red-500 font-medium ml-1 animate-pulse">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg bg-raddGold text-white font-medium tracking-wide shadow-lg shadow-raddGold/20 hover:bg-[#8e6f32] hover:shadow-raddGold/30 hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0"
            >
              Continue
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-gray-100 w-full">
            <p className="text-sm text-softCharcoal/60 font-light leading-relaxed">
              Welcome to the exclusive studio experience. <br/> Please authenticate to proceed.
            </p>
          </div>
        </div>
      </main>

      <footer className="absolute bottom-6 w-full text-center">
        <p className="text-xs text-softCharcoal/40 font-light tracking-wide">
          Created by Raki AI Digital DEN © 2025
        </p>
      </footer>
    </div>
  );
};

export default LicenseGate;