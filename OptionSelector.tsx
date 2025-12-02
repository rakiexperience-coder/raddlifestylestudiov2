import React from 'react';

interface OptionSelectorProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
}

const OptionSelector: React.FC<OptionSelectorProps> = ({
  label,
  value,
  options,
  onChange,
  placeholder = "Select..."
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-xs font-medium uppercase tracking-wider text-softCharcoal/60 ml-2">
        {label}
      </label>
      <div className="relative group">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-white text-softCharcoal border border-gray-200 rounded-full py-3.5 px-6 pr-10 focus:outline-none focus:border-raddGold focus:ring-1 focus:ring-raddGold transition-all cursor-pointer shadow-sm hover:border-raddGold/50 hover:shadow-md"
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        
        {/* Custom arrow icon */}
        <div className="absolute inset-y-0 right-0 flex items-center px-5 pointer-events-none text-raddGold group-hover:text-raddGold/80 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default OptionSelector;