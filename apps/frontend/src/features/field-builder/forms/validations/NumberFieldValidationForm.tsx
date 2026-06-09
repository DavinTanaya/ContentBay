import { Input } from 'antd';
import { ValidationItem } from '../shared/ValidationItem';
import type { NumberField } from '../../types';

interface NumberFieldValidationFormProps {
  validations: NumberField['validations'];
  onChange: (validations: NumberField['validations']) => void;
}

export function NumberFieldValidationForm({ validations, onChange }: NumberFieldValidationFormProps) {
  const v = validations || { required: false, unique: false };

  const update = (updates: Partial<NonNullable<NumberField['validations']>>) => {
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
          label="Unique field"
          helper="You won't be able to publish an entry if there is an existing entry with identical content"
          helperBlue
          checked={v.unique}
          onChange={(c) => update({ unique: c })}
        />
        <ValidationItem
          label="Limit number range"
          helper="Specify a minimum and/or maximum allowed value"
          checked={!!v.numberRange}
          onChange={(c) => update({ numberRange: c ? { min: undefined, max: undefined } : undefined })}
        >
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-600 mb-1">Min</label>
              <Input
                type="number"
                size="small"
                value={v.numberRange?.min ?? ''}
                onChange={(e) => update({ numberRange: { ...v.numberRange, min: e.target.value ? Number(e.target.value) : undefined } })}
                placeholder="No minimum"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-600 mb-1">Max</label>
              <Input
                type="number"
                size="small"
                value={v.numberRange?.max ?? ''}
                onChange={(e) => update({ numberRange: { ...v.numberRange, max: e.target.value ? Number(e.target.value) : undefined } })}
                placeholder="No maximum"
              />
            </div>
          </div>
        </ValidationItem>
        <ValidationItem
          label="Accept only specified values"
          helper="You won't be able to publish an entry if the field value is not in the list of specified values"
          checked={!!v.specifiedValues}
          onChange={(c) => update({ specifiedValues: c ? [] : undefined })}
        >
          <Input
            size="small"
            value={(v.specifiedValues || []).join(', ')}
            onChange={(e) => update({ specifiedValues: e.target.value.split(',').map((s) => s.trim()).filter(Boolean).map(Number).filter((n) => !isNaN(n)) })}
            placeholder="Comma-separated numbers"
          />
        </ValidationItem>
      </div>
    </div>
  );
}
