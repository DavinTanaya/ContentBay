import { Radio } from 'antd';
import type { DateField } from '../../types';

interface DateFieldAppearanceFormProps {
  data: DateField;
  onChange: (updates: Partial<DateField>) => void;
}

export function DateFieldAppearanceForm({ data, onChange }: DateFieldAppearanceFormProps) {
  const appearance = data.appearance || { format: 'dateOnly' as const, hourFormat: '24h' as const };

  const updateAppearance = (updates: Partial<NonNullable<DateField['appearance']>>) => {
    onChange({ appearance: { ...appearance, ...updates } });
  };

  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-4">Appearance</h3>
      <p className="text-sm text-gray-600 mb-4">Choose how the date picker will be presented.</p>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Format</label>
        <Radio.Group
          value={appearance.format}
          onChange={(e) => updateAppearance({ format: e.target.value })}
          className="flex flex-col gap-2"
        >
          <Radio value="dateOnly">Date Only (e.g. 1990-10-24)</Radio>
          <Radio value="dateTime">Date and Time (without timezone)</Radio>
          <Radio value="dateTimeWithTimezone">Date and Time (with timezone)</Radio>
        </Radio.Group>
      </div>

      {(appearance.format === 'dateTime' || appearance.format === 'dateTimeWithTimezone') && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Hour Format</label>
          <Radio.Group
            value={appearance.hourFormat}
            onChange={(e) => updateAppearance({ hourFormat: e.target.value })}
            optionType="button"
            buttonStyle="solid"
          >
            <Radio.Button value="12h">12-hour (AM/PM)</Radio.Button>
            <Radio.Button value="24h">24-hour</Radio.Button>
          </Radio.Group>
        </div>
      )}
    </div>
  );
}
