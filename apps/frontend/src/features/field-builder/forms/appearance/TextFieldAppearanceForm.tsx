import { AppearanceSelector } from '../../appearance/AppearanceSelector';
import { APPEARANCE_OPTIONS } from '../../constants/appearance-options';
import type { TextField } from '../../types';

interface TextFieldAppearanceFormProps {
  data: TextField;
  onChange: (updates: Partial<TextField>) => void;
}

export function TextFieldAppearanceForm({ data, onChange }: TextFieldAppearanceFormProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Appearance</h3>
        <p className="text-sm text-gray-600 mb-4">Choose how editors will interact with this field.</p>
        <AppearanceSelector
          value={data.appearance?.type || 'singleLine'}
          onChange={(val) => onChange({ appearance: { ...data.appearance, type: val as any } })}
          options={APPEARANCE_OPTIONS.text}
        />
      </div>
    </div>
  );
}
