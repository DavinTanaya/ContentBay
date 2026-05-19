import { useState } from 'react';
import { Input } from 'antd';

const DEFAULT_MAX = 256;
const HELP_MAX = 255;

interface FieldAppearanceFormProps {
  fieldType: string;
}

type AppearanceKey = 'single-line' | 'url' | 'dropdown' | 'radio' | 'slug';

const APPEARANCES: { key: AppearanceKey; label: string; sublabel: string }[] = [
  { key: 'single-line', label: 'Single line', sublabel: 'Default' },
  { key: 'url', label: 'URL', sublabel: '' },
  { key: 'dropdown', label: 'Dropdown', sublabel: '' },
  { key: 'radio', label: 'Radio', sublabel: '' },
  { key: 'slug', label: 'Slug', sublabel: '' },
];

/** Small mockup previews for each appearance type */
function AppearancePreview({ type }: { type: AppearanceKey }) {
  const base = 'w-full h-full flex items-center justify-center';
  if (type === 'single-line')
    return (
      <div className={base}>
        <div className="w-full border border-gray-300 rounded px-2 py-0.5 text-[10px] text-gray-400">
          A coffee, pls
        </div>
      </div>
    );
  if (type === 'url')
    return (
      <div className={base}>
        <div className="w-full border border-gray-300 rounded px-2 py-0.5 text-[10px] text-gray-400">
          http://latte.co
        </div>
      </div>
    );
  if (type === 'dropdown')
    return (
      <div className={base}>
        <div className="w-full border border-gray-300 rounded text-[10px] text-gray-500">
          <div className="flex items-center justify-between px-2 py-0.5 border-b border-gray-300">
            <span>Meals</span>
            <span>▾</span>
          </div>
          <div className="px-2 py-0.5 text-gray-400">Breakfast</div>
          <div className="px-2 py-0.5 text-gray-400">Lunch</div>
        </div>
      </div>
    );
  if (type === 'radio')
    return (
      <div className={`${base} flex-col gap-0.5`}>
        <label className="flex items-center gap-1 text-[10px] text-gray-600">
          <input type="radio" defaultChecked className="w-2 h-2" readOnly />
          Matcha
        </label>
        <label className="flex items-center gap-1 text-[10px] text-gray-400">
          <input type="radio" className="w-2 h-2" readOnly />
          Coffee
        </label>
      </div>
    );
  // slug
  return (
    <div className={base}>
      <div className="w-full border border-gray-300 rounded px-2 py-0.5 text-[10px] text-gray-400">
        generated-tea
      </div>
    </div>
  );
}

export function FieldAppearanceForm({
  fieldType: _,
}: FieldAppearanceFormProps) {
  const [defaultValue, setDefaultValue] = useState('');
  const [appearance, setAppearance] = useState<AppearanceKey>('single-line');
  const [helpText, setHelpText] = useState('');
  const [showDefaultInfo, setShowDefaultInfo] = useState(true);

  return (
    <div className="flex flex-col gap-10">
      {/* ── Default value ── */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-5">Default value</h2>

        {/* Info alert */}
        {showDefaultInfo && (
          <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded p-3 mb-4 text-sm text-gray-600 leading-snug">
            <svg
              className="text-blue-500 mt-0.5 flex-shrink-0"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm1 14H11v-6h2v6zm0-8H11V6h2v2z" />
            </svg>
            <p className="flex-1">
              This setting allows you to set a default value for this field,
              which will be automatically inserted to new content entries. It
              can help editors avoid content entry altogether, or just give them
              a helpful prompt for how to structure their content.
            </p>
            <button
              onClick={() => setShowDefaultInfo(false)}
              className="text-gray-400 hover:text-gray-600 flex-shrink-0 leading-none"
            >
              ✕
            </button>
          </div>
        )}

        <Input
          value={defaultValue}
          onChange={(e) => setDefaultValue(e.target.value)}
          maxLength={DEFAULT_MAX}
          size="large"
          className="rounded-sm mb-1"
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>{defaultValue.length} characters</span>
          <span>Maximum {DEFAULT_MAX} characters</span>
        </div>
      </div>

      {/* ── Appearance ── */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-5">Appearance</h2>

        {/* Appearance cards */}
        <div className="flex gap-3 mb-7 flex-wrap">
          {APPEARANCES.map((opt) => {
            const active = appearance === opt.key;
            return (
              <button
                key={opt.key}
                onClick={() => setAppearance(opt.key)}
                className={`flex flex-col items-start rounded border-2 p-2 cursor-pointer transition-all bg-white
                  ${active ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'}`}
                style={{ width: 110 }}
              >
                {/* Preview area */}
                <div className="w-full h-16 mb-2 p-1">
                  <AppearancePreview type={opt.key} />
                </div>
                {/* Radio + label */}
                <div className="flex items-center gap-1.5">
                  <div
                    className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                      ${active ? 'border-blue-500' : 'border-gray-400'}`}
                  >
                    {active && (
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    )}
                  </div>
                  <span className="text-xs font-medium text-gray-700">
                    {opt.label}
                  </span>
                </div>
                {opt.sublabel && (
                  <span className="text-[10px] text-gray-400 ml-5">
                    {opt.sublabel}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Help text */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Help text
          </label>
          <Input
            value={helpText}
            onChange={(e) => setHelpText(e.target.value)}
            maxLength={HELP_MAX}
            size="large"
            className="rounded-sm mb-1"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>This help text will show up below the field</span>
            <span>
              {helpText.length} / {HELP_MAX}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
