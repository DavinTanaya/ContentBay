import { Input } from 'antd';

const HELP_MAX = 255;

interface HelpTextInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function HelpTextInput({ value, onChange }: HelpTextInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        Help text
      </label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={HELP_MAX}
        size="large"
        className="rounded-sm mb-1"
      />
      <div className="flex justify-between text-xs text-gray-400">
        <span>This help text will show up below the field</span>
        <span>
          {value.length} / {HELP_MAX}
        </span>
      </div>
    </div>
  );
}
