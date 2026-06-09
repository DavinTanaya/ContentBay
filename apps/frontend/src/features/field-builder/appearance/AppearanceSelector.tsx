import React from 'react';

interface AppearanceOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

interface AppearanceSelectorProps {
  options: AppearanceOption[];
  value: string;
  onChange: (val: string) => void;
}

export function AppearanceSelector({ options, value, onChange }: AppearanceSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {options.map((option) => {
        const isSelected = value === option.value;
        return (
          <div
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`cursor-pointer border rounded-lg p-4 transition-all duration-200 flex flex-col items-center justify-center gap-3 text-center
              ${isSelected 
                ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600" 
                : "border-gray-200 hover:border-gray-400 bg-white"
              }`}
          >
            {option.icon && (
              <div className={`text-2xl ${isSelected ? "text-blue-600" : "text-gray-500"}`}>
                {option.icon}
              </div>
            )}
            <div>
              <span className={`block text-sm font-semibold font-poppins ${isSelected ? 'text-blue-700' : 'text-gray-800'}`}>
                {option.label}
              </span>
              {option.description && (
                <span className="text-xs text-gray-500 mt-1 block font-poppins">
                  {option.description}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
