import { Input } from 'antd';
import { ValidationItem } from '../shared/ValidationItem';
import type { RichTextField } from '../../types';

interface RichTextFieldValidationFormProps {
  validations: RichTextField['validations'];
  onChange: (validations: RichTextField['validations']) => void;
}

export function RichTextFieldValidationForm({ validations, onChange }: RichTextFieldValidationFormProps) {
  const v = validations || { required: false };

  const update = (updates: Partial<NonNullable<RichTextField['validations']>>) => {
    onChange({ ...v, ...updates });
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Validation</h2>

      <div>
        <ValidationItem
          label="Required field"
          helper="You won't be able to publish an entry if this field is empty"
          helperBlue
          checked={v.required}
          onChange={(c) => update({ required: c })}
        />
        <ValidationItem
          label="Limit character count"
          helper="Specify a minimum and/or maximum allowed number of characters"
          checked={!!v.characterCount}
          onChange={(c) => update({ characterCount: c ? { min: undefined, max: undefined } : undefined })}
        >
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-600 mb-1">Min</label>
              <Input
                type="number"
                size="small"
                value={v.characterCount?.min ?? ''}
                onChange={(e) => update({ characterCount: { ...v.characterCount, min: e.target.value ? Number(e.target.value) : undefined } })}
                placeholder="No minimum"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-600 mb-1">Max</label>
              <Input
                type="number"
                size="small"
                value={v.characterCount?.max ?? ''}
                onChange={(e) => update({ characterCount: { ...v.characterCount, max: e.target.value ? Number(e.target.value) : undefined } })}
                placeholder="No maximum"
              />
            </div>
          </div>
        </ValidationItem>
      </div>
    </div>
  );
}
