import { Radio } from 'antd';
import type { NumberField } from '../../types';

interface NumberFieldSettingsFormProps {
  data: NumberField;
  onChange: (updates: Partial<NumberField>) => void;
  readOnly?: boolean;
}

export function NumberFieldSettingsForm({ data, onChange, readOnly = false }: NumberFieldSettingsFormProps) {
  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-4">Settings</h3>
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Number Type</label>
          <Radio.Group
            value={data.settings?.numberType || 'integer'}
            onChange={(e) => onChange({ settings: { ...data.settings, numberType: e.target.value } })}
            disabled={readOnly}
          >
            <Radio value="integer">Integer</Radio>
            <Radio value="decimal">Decimal</Radio>
          </Radio.Group>
          {readOnly && (
            <p className="text-xs text-gray-400 mt-2">
              Number type cannot be changed after field creation.
            </p>
          )}
          {!readOnly && (
            <p className="text-xs text-gray-500 mt-2">
              Choose integer for whole numbers, decimal for fractions.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
