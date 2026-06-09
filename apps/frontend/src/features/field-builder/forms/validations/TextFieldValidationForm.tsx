import { Input } from 'antd';
import { ValidationItem } from '../shared/ValidationItem';
import type { TextField } from '../../types';

interface TextFieldValidationFormProps {
  validations: TextField['validations'];
  onChange: (validations: TextField['validations']) => void;
}

export function TextFieldValidationForm({ validations, onChange }: TextFieldValidationFormProps) {
  const v = validations || { required: false, unique: false };

  const update = (updates: Partial<NonNullable<TextField['validations']>>) => {
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
        <ValidationItem
          label="Match a specific pattern"
          helper="Make this field match a pattern: e-mail address, URI, or a custom regular expression"
          checked={!!v.matchPattern}
          onChange={(c) => update({ matchPattern: c ? '' : undefined })}
        >
          <Input
            size="small"
            value={v.matchPattern || ''}
            onChange={(e) => update({ matchPattern: e.target.value })}
            placeholder="e.g. ^[a-zA-Z]+$ or email"
          />
        </ValidationItem>
        <ValidationItem
          label="Prohibit a specific pattern"
          helper="Make this field invalid when a pattern is matched: custom regular expression (e.g. bad word list)"
          checked={!!v.prohibitPattern}
          onChange={(c) => update({ prohibitPattern: c ? '' : undefined })}
        >
          <Input
            size="small"
            value={v.prohibitPattern || ''}
            onChange={(e) => update({ prohibitPattern: e.target.value })}
            placeholder="e.g. badword|forbidden"
          />
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
            onChange={(e) => update({ specifiedValues: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
            placeholder="Comma-separated values"
          />
        </ValidationItem>
      </div>
    </div>
  );
}
