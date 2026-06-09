import { Radio } from 'antd';
import { SwitchRow } from '../shared/SwitchRow';
import type { ReferenceField } from '../../types';

interface ReferenceFieldSettingsFormProps {
  data: ReferenceField;
  onChange: (updates: Partial<ReferenceField>) => void;
  readOnly?: boolean;
}

export function ReferenceFieldSettingsForm({ data, onChange, readOnly = false }: ReferenceFieldSettingsFormProps) {
  const updatePermissions = (updates: Partial<NonNullable<NonNullable<ReferenceField['settings']>['permissions']>>) => {
    const currentPermissions = data.settings?.permissions || { allowCreateNew: true, allowLinkExisting: true };
    onChange({ settings: { ...data.settings, permissions: { ...currentPermissions, ...updates } } });
  };

  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-4">Settings</h3>
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Cardinality</label>
          <Radio.Group
            value={data.settings?.cardinality || 'one'}
            onChange={(e) => onChange({ settings: { ...data.settings, cardinality: e.target.value } })}
            disabled={readOnly}
          >
            <Radio value="one">Single Reference</Radio>
            <Radio value="many">Multiple References</Radio>
          </Radio.Group>
          {readOnly && (
            <p className="text-xs text-gray-400 mt-2">
              Cardinality cannot be changed after field creation.
            </p>
          )}
        </div>

        <div className="border-t border-gray-100 pt-4">
          <SwitchRow
            title="Allow Create New"
            description="Allow editors to create new entries."
            checked={data.settings?.permissions?.allowCreateNew ?? true}
            onChange={(c) => updatePermissions({ allowCreateNew: c })}
          />
        </div>
        <SwitchRow
          title="Allow Link Existing"
          description="Allow editors to link existing entries."
          checked={data.settings?.permissions?.allowLinkExisting ?? true}
          onChange={(c) => updatePermissions({ allowLinkExisting: c })}
        />
      </div>
    </div>
  );
}
