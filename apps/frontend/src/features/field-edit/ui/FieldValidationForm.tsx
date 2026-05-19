import { Checkbox } from 'antd';

interface FieldValidationFormProps {
  required: boolean;
  setRequired: (v: boolean) => void;
  unique: boolean;
  setUnique: (v: boolean) => void;
}

interface ValidationItemProps {
  label: string;
  helper: string;
  helperBlue?: boolean;
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}

function ValidationItem({
  label,
  helper,
  helperBlue = false,
  checked,
  onChange,
  disabled = false,
}: ValidationItemProps) {
  return (
    <div className="py-3 border-b border-gray-100 last:border-b-0">
      <label className="flex items-start gap-2 cursor-pointer select-none">
        <Checkbox
          checked={checked}
          disabled={disabled}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          className="mt-0.5"
        />
        <span
          className={`text-sm font-medium ${
            disabled ? 'text-gray-400' : 'text-gray-800'
          }`}
        >
          {label}
        </span>
      </label>
      <p
        className={`text-sm ml-6 mt-0.5 leading-snug ${
          helperBlue ? 'text-blue-500' : 'text-gray-400'
        }`}
      >
        {helper}
      </p>
    </div>
  );
}

export function FieldValidationForm({
  required,
  setRequired,
  unique,
  setUnique,
}: FieldValidationFormProps) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Validation</h2>

      <div>
        <ValidationItem
          label="Required field"
          helper="You won't be able to publish an entry if this field is empty"
          helperBlue
          checked={required}
          onChange={setRequired}
        />
        <ValidationItem
          label="Unique field"
          helper="You won't be able to publish an entry if there is an existing entry with identical content"
          helperBlue
          checked={unique}
          onChange={setUnique}
        />
        <ValidationItem
          label="Limit character count"
          helper="Specify a minimum and/or maximum allowed number of characters"
          checked={false}
          onChange={() => {}}
          disabled
        />
        <ValidationItem
          label="Match a specific pattern"
          helper="Make this field match a pattern: e-mail address, URI, or a custom regular expression"
          checked={false}
          onChange={() => {}}
          disabled
        />
        <ValidationItem
          label="Prohibit a specific pattern"
          helper="Make this field invalid when a pattern is matched: custom regular expression (e.g. bad word list)"
          checked={false}
          onChange={() => {}}
          disabled
        />
        <ValidationItem
          label="Accept only specified values"
          helper="You won't be able to publish an entry if the field value is not in the list of specified values"
          checked={false}
          onChange={() => {}}
          disabled
        />
      </div>
    </div>
  );
}
