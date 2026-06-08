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
    <div className="flex flex-col gap-3">
      {options.map((option) => (
        <label
          key={option.value}
          className={`
            relative flex items-center p-4 cursor-pointer rounded-lg border-2 transition-all duration-200
            ${
              value === option.value
                ? 'border-blue-500 bg-blue-50/50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }
          `}
        >
          <input
            type="radio"
            name="appearance"
            className="sr-only"
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
          />
          <div className="flex flex-col flex-1">
            <span className={`text-sm font-semibold font-poppins ${value === option.value ? 'text-blue-700' : 'text-gray-900'}`}>
              {option.label}
            </span>
            {option.description && (
              <span className="text-xs text-gray-500 mt-1 font-poppins">{option.description}</span>
            )}
          </div>
          <div className={`
            w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
            ${value === option.value ? 'border-blue-500' : 'border-gray-300'}
          `}>
            {value === option.value && <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />}
          </div>
        </label>
      ))}
    </div>
  );
}
