import { Input } from 'antd';
import type { BooleanField } from '../../types';

interface BooleanFieldSettingsFormProps {
  data: BooleanField;
  onChange: (updates: Partial<BooleanField>) => void;
}

export function BooleanFieldSettingsForm({ data, onChange }: BooleanFieldSettingsFormProps) {
  const updateLabels = (updates: Partial<NonNullable<NonNullable<BooleanField['settings']>['labels']>>) => {
    const currentLabels = data.settings?.labels || { trueLabel: 'Yes', falseLabel: 'No' };
    onChange({ settings: { ...data.settings, labels: { ...currentLabels, ...updates } } });
  };

  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-4">Settings</h3>
      <p className="text-sm text-gray-600 mb-4">Choose the labels for true/false states.</p>
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">True Label</label>
          <Input
            value={data.settings?.labels?.trueLabel || 'Yes'}
            onChange={(e) => updateLabels({ trueLabel: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">False Label</label>
          <Input
            value={data.settings?.labels?.falseLabel || 'No'}
            onChange={(e) => updateLabels({ falseLabel: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
