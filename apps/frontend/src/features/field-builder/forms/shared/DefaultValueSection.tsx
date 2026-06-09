import { useState } from 'react';
import { Input } from 'antd';

const DEFAULT_MAX = 256;

interface DefaultValueSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export function DefaultValueSection({ value, onChange }: DefaultValueSectionProps) {
  const [showInfo, setShowInfo] = useState(true);

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-5">Default value</h2>

      {/* Info alert */}
      {showInfo && (
        <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded p-3 mb-4 text-sm text-gray-600 leading-snug">
          <svg
            className="text-blue-500 mt-0.5 flex-shrink-0"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm1 14H11v-6h2v6zm0-8H11V6h2v2z" />
          </svg>
          <p className="flex-1">
            This setting allows you to set a default value for this field,
            which will be automatically inserted to new content entries. It
            can help editors avoid content entry altogether, or just give them
            a helpful prompt for how to structure their content.
          </p>
          <button
            onClick={() => setShowInfo(false)}
            className="text-gray-400 hover:text-gray-600 flex-shrink-0 leading-none"
          >
            ✕
          </button>
        </div>
      )}

      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={DEFAULT_MAX}
        size="large"
        className="rounded-sm mb-1"
      />
      <div className="flex justify-between text-xs text-gray-400">
        <span>{value.length} characters</span>
        <span>Maximum {DEFAULT_MAX} characters</span>
      </div>
    </div>
  );
}
