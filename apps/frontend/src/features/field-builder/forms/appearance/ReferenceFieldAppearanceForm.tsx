import { Radio } from 'antd';
import type { ReferenceField } from '../../types';

interface ReferenceFieldAppearanceFormProps {
  data: ReferenceField;
  onChange: (updates: Partial<ReferenceField>) => void;
}

export function ReferenceFieldAppearanceForm({ data, onChange }: ReferenceFieldAppearanceFormProps) {
  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-4">Appearance</h3>
      <p className="text-sm text-gray-600 mb-4">Choose how the reference will be displayed.</p>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Display Mode</label>
        <Radio.Group
          value={data.appearance?.type || 'entryLink'}
          onChange={(e) => onChange({ appearance: { ...data.appearance, type: e.target.value } })}
        >
          <Radio value="entryLink">Entry Link</Radio>
          <Radio value="entryCard">Entry Card</Radio>
        </Radio.Group>
      </div>
    </div>
  );
}
