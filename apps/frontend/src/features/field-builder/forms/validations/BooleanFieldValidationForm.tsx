import { ValidationItem } from '../shared/ValidationItem';
import type { BooleanField } from '../../types';

interface BooleanFieldValidationFormProps {
  validations: BooleanField['validations'];
  onChange: (validations: BooleanField['validations']) => void;
}

export function BooleanFieldValidationForm({ validations, onChange }: BooleanFieldValidationFormProps) {
  const v = validations || { required: false };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Validation</h2>

      <div>
        <ValidationItem
          label="Required field"
          helper="You won't be able to publish an entry if this field is empty"
          helperBlue
          checked={v.required}
          onChange={(c) => onChange({ ...v, required: c })}
        />
      </div>
    </div>
  );
}
