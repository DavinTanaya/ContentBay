import { SwitchRow } from '../shared/SwitchRow';
import type { TextField } from '../../types';

interface TextFieldSettingsFormProps {
  data: TextField;
  onChange: (updates: Partial<TextField>) => void;
}

export function TextFieldSettingsForm({ data, onChange }: TextFieldSettingsFormProps) {
  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-4">Settings</h3>
      <div className="flex flex-col gap-4">
        <SwitchRow
          title="List"
          description="Allow multiple text values."
          checked={data.settings?.list || false}
          onChange={(c) => onChange({ settings: { ...data.settings, list: c } })}
        />
        <SwitchRow
          title="Entry Title"
          description="Use this field as the display title for entries."
          checked={data.settings?.isEntryTitle || false}
          onChange={(c) => onChange({ settings: { ...data.settings, isEntryTitle: c } })}
        />
      </div>
    </div>
  );
}
