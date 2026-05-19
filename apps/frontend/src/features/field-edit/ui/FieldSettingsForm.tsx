import { Checkbox } from 'antd';

interface FieldSettingsFormProps {
  isTitle: boolean;
  setIsTitle: (v: boolean) => void;
  localized: boolean;
  setLocalized: (v: boolean) => void;
}

export function FieldSettingsForm({
  isTitle,
  setIsTitle,
  localized,
  setLocalized,
}: FieldSettingsFormProps) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-5">Settings</h2>

      <p className="text-sm font-bold text-gray-800 mb-3">Field options</p>

      <div className="flex flex-col gap-3">
        {/* Entry title */}
        <label className="flex items-start gap-2 cursor-pointer select-none">
          <Checkbox
            checked={isTitle}
            onChange={(e) => setIsTitle(e.target.checked)}
            className="mt-0.5"
          />
          <span className="text-sm text-gray-800">
            This field represents the Entry title
          </span>
        </label>

        {/* Localization */}
        <div>
          <label className="flex items-start gap-2 cursor-pointer select-none">
            <Checkbox
              checked={localized}
              onChange={(e) => setLocalized(e.target.checked)}
              className="mt-0.5"
            />
            <span className="text-sm text-gray-800">
              Enable localization of this field
            </span>
          </label>
          <p className="text-sm text-blue-500 ml-6 mt-0.5 leading-snug">
            All the content can be translated to English (United States) and
            Indonesian locales
          </p>
        </div>
      </div>
    </div>
  );
}
