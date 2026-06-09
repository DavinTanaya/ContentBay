import { AppearanceSelector } from '../../appearance/AppearanceSelector';
import { APPEARANCE_OPTIONS } from '../../constants/appearance-options';
import type { NumberField } from '../../types';

interface NumberFieldAppearanceFormProps {
  data: NumberField;
  onChange: (updates: Partial<NumberField>) => void;
}

export function NumberFieldAppearanceForm({ data, onChange }: NumberFieldAppearanceFormProps) {
  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-4">Appearance</h3>
      <p className="text-sm text-gray-600 mb-4">Choose how editors will interact with this field.</p>
      <AppearanceSelector
        value={data.appearance?.type || 'number'}
        onChange={(val) => onChange({ appearance: { ...data.appearance, type: val as any } })}
        options={APPEARANCE_OPTIONS.number}
      />
    </div>
  );
}
