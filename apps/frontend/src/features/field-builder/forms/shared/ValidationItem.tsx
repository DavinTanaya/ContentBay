import { Checkbox } from 'antd';

interface ValidationItemProps {
  label: string;
  helper: string;
  helperBlue?: boolean;
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function ValidationItem({
  label,
  helper,
  helperBlue = false,
  checked,
  onChange,
  disabled = false,
  children,
}: ValidationItemProps) {
  return (
    <div className="py-3 border-b border-gray-100 last:border-b-0">
      <label className="flex items-start gap-2 cursor-pointer select-none">
        <Checkbox
          checked={checked}
          disabled={disabled}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          className="mt-0.5"
        />
        <span
          className={`text-sm font-medium ${
            disabled ? 'text-gray-400' : 'text-gray-800'
          }`}
        >
          {label}
        </span>
      </label>
      <p
        className={`text-sm ml-6 mt-0.5 leading-snug ${
          helperBlue ? 'text-blue-500' : 'text-gray-400'
        }`}
      >
        {helper}
      </p>
      {checked && children && (
        <div className="ml-6 mt-3">
          {children}
        </div>
      )}
    </div>
  );
}
