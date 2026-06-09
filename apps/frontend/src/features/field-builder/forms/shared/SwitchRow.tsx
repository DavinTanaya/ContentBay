import { Switch } from 'antd';

interface SwitchRowProps {
  title: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function SwitchRow({
  title,
  description,
  checked,
  onChange,
  disabled = false,
}: SwitchRowProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
        {description && (
          <p className="text-xs text-gray-500">{description}</p>
        )}
      </div>
      <Switch checked={checked} onChange={onChange} disabled={disabled} />
    </div>
  );
}
