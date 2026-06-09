import { Input } from 'antd';
import { ValidationItem } from '../shared/ValidationItem';
import type { JsonField } from '../../types';

interface JsonFieldValidationFormProps {
  validations: JsonField['validations'];
  onChange: (validations: JsonField['validations']) => void;
}

export function JsonFieldValidationForm({ validations, onChange }: JsonFieldValidationFormProps) {
  const v = validations || { required: false };

  const update = (updates: Partial<NonNullable<JsonField['validations']>>) => {
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
          label="Limit number of properties"
          helper="Specify a minimum and/or maximum number of JSON properties"
          checked={!!v.numberOfProperties}
          onChange={(c) => update({ numberOfProperties: c ? { min: undefined, max: undefined } : undefined })}
        >
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-600 mb-1">Min</label>
              <Input
                type="number"
                size="small"
                value={v.numberOfProperties?.min ?? ''}
                onChange={(e) => update({ numberOfProperties: { ...v.numberOfProperties, min: e.target.value ? Number(e.target.value) : undefined } })}
                placeholder="No minimum"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-600 mb-1">Max</label>
              <Input
                type="number"
                size="small"
                value={v.numberOfProperties?.max ?? ''}
                onChange={(e) => update({ numberOfProperties: { ...v.numberOfProperties, max: e.target.value ? Number(e.target.value) : undefined } })}
                placeholder="No maximum"
              />
            </div>
          </div>
        </ValidationItem>
      </div>
    </div>
  );
}
