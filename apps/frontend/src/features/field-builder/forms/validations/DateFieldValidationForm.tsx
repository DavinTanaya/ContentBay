import { Input } from 'antd';
import { ValidationItem } from '../shared/ValidationItem';
import type { DateField } from '../../types';

interface DateFieldValidationFormProps {
  validations: DateField['validations'];
  onChange: (validations: DateField['validations']) => void;
}

export function DateFieldValidationForm({ validations, onChange }: DateFieldValidationFormProps) {
  const v = validations || { required: false };

  const update = (updates: Partial<NonNullable<DateField['validations']>>) => {
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
          label="Limit date range"
          helper="Specify an earliest and/or latest allowed date"
          checked={!!v.dateRange}
          onChange={(c) => update({ dateRange: c ? { earlyDate: undefined, latestDate: undefined } : undefined })}
        >
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-600 mb-1">Earliest date</label>
              <Input
                type="date"
                size="small"
                value={v.dateRange?.earlyDate || ''}
                onChange={(e) => update({ dateRange: { ...v.dateRange, earlyDate: e.target.value || undefined } })}
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-600 mb-1">Latest date</label>
              <Input
                type="date"
                size="small"
                value={v.dateRange?.latestDate || ''}
                onChange={(e) => update({ dateRange: { ...v.dateRange, latestDate: e.target.value || undefined } })}
              />
            </div>
          </div>
        </ValidationItem>
      </div>
    </div>
  );
}
