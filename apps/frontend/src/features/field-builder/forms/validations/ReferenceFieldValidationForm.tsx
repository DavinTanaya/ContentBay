import { Input } from 'antd';
import { ValidationItem } from '../shared/ValidationItem';
import type { ReferenceField } from '../../types';

interface ReferenceFieldValidationFormProps {
  validations: ReferenceField['validations'];
  onChange: (validations: ReferenceField['validations']) => void;
}

export function ReferenceFieldValidationForm({ validations, onChange }: ReferenceFieldValidationFormProps) {
  const v = validations || { required: false, allowedEntryTypes: [] };

  const update = (updates: Partial<NonNullable<ReferenceField['validations']>>) => {
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
          label="Accept only specified entry types"
          helper="Restrict which content types can be referenced"
          checked={v.allowedEntryTypes.length > 0}
          onChange={(c) => update({ allowedEntryTypes: c ? v.allowedEntryTypes : [] })}
        >
          <Input
            size="small"
            value={v.allowedEntryTypes.join(', ')}
            onChange={(e) => update({ allowedEntryTypes: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
            placeholder="Comma-separated content type API IDs"
          />
        </ValidationItem>
      </div>
    </div>
  );
}
