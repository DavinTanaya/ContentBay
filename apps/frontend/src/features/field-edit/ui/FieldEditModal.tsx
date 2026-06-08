import { useState } from 'react';
import { Modal, Button } from 'antd';
import type { ContentField } from '@entities/content-model';
import { FieldIdentityForm } from './FieldIdentityForm';
import { FieldSettingsForm } from './FieldSettingsForm';
import { FieldValidationForm } from './FieldValidationForm';
import { FieldAppearanceForm } from './FieldAppearanceForm';

interface FieldEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  field: ContentField | null;
  onConfirm: (
    originalApiId: string,
    updatedField: Omit<ContentField, 'id'>,
  ) => Promise<void>;
}

type TabKey =
  | 'identity'
  | 'settings'
  | 'validation'
  | 'defaultValue'
  | 'appearance';

const NAV_ITEMS: { key: TabKey; label: string }[] = [
  { key: 'identity', label: 'Name and field ID' },
  { key: 'settings', label: 'Settings' },
  { key: 'validation', label: 'Validation' },
  { key: 'defaultValue', label: 'Default value' },
  { key: 'appearance', label: 'Appearance' },
];

export function FieldEditModal({
  isOpen,
  onClose,
  field,
  onConfirm,
}: FieldEditModalProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('identity');
  const [name, setName] = useState('');
  const [apiId, setApiId] = useState('');
  const [isTitle, setIsTitle] = useState(false);
  const [localized, setLocalized] = useState(false);
  const [required, setRequired] = useState(false);
  const [unique, setUnique] = useState(false);

  const [prevFieldApiId, setPrevFieldApiId] = useState<string | null>(null);
  const [prevIsOpen, setPrevIsOpen] = useState(false);

  if (field && (field.apiId !== prevFieldApiId || isOpen !== prevIsOpen)) {
    setPrevFieldApiId(field.apiId);
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setName(field.name || '');
      setApiId(field.apiId || '');
      setIsTitle(field.isTitle || false);
      setLocalized(field.localized || false);
      setRequired(field.required || false);
      setUnique(
        field.validations && 'unique' in field.validations
          ? (field.validations as any).unique
          : false
      );
      setActiveTab('identity');
    }
  }

  if (!field) return null;

  const handleNameChange = (newName: string) => {
    setName(newName);
    setApiId(
      newName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, ' ')
        .trim()
        .replace(/\s+/g, ''),
    );
  };

  const handleSave = async () => {
    await onConfirm(field.apiId, {
      name,
      apiId,
      type: field.type,
      icon: field.icon,
      isTitle,
      localized,
      required,
      description: '',
      validations: { required, unique },
    });
  };

  const handleNavClick = (key: TabKey) => {
    setActiveTab(key);
    const el = document.getElementById(`fedit-${key}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Modal
      title={null}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={860}
      centered
      styles={{
        body: { padding: 0 },
      }}
    >
      <div className="flex flex-col bg-white" style={{ minHeight: 560 }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-gray-900">
              {field.name}
            </span>
            <span className="text-sm text-gray-400">{field.type}</span>
          </div>
        </div>
        <div className="flex flex-1 overflow-hidden" style={{ minHeight: 0 }}>
          <div
            className="flex-shrink-0 border-r border-gray-200 py-2"
            style={{ width: 220 }}
          >
            {NAV_ITEMS.map((item) => {
              const active = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.key)}
                  className={`w-full text-left px-5 py-2.5 text-sm transition-colors
                    ${
                      active
                        ? 'bg-blue-50 text-gray-800 font-medium'
                        : 'text-gray-600 hover:bg-gray-50 font-normal'
                    }`}
                  style={{ outline: 'none', border: 'none' }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right scrollable content */}
          <div
            id="fedit-scroll"
            className="flex-1 overflow-y-auto px-10 py-8"
            style={{ maxHeight: 520 }}
          >
            {/* Name and field ID */}
            <div id="fedit-identity" className="mb-10">
              <FieldIdentityForm
                name={name}
                apiId={apiId}
                setApiId={setApiId}
                onNameChange={handleNameChange}
              />
            </div>

            <div className="border-t border-gray-100" />

            {/* Settings */}
            <div id="fedit-settings" className="my-10">
              <FieldSettingsForm
                isTitle={isTitle}
                setIsTitle={setIsTitle}
                localized={localized}
                setLocalized={setLocalized}
              />
            </div>

            <div className="border-t border-gray-100" />

            {/* Validation */}
            <div id="fedit-validation" className="my-10">
              <FieldValidationForm
                required={required}
                setRequired={setRequired}
                unique={unique}
                setUnique={setUnique}
              />
            </div>

            <div className="border-t border-gray-100" />

            {/* Default value + Appearance */}
            <div id="fedit-defaultValue" className="my-10">
              <FieldAppearanceForm fieldType={field.type} />
            </div>

            {/* Scroll target for Appearance nav */}
            <div id="fedit-appearance" />
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="flex items-center justify-end gap-2 px-6 py-3 border-t border-gray-200 bg-white">
          <Button
            size="medium"
            onClick={onClose}
            variant='solid'
            color='danger'
          >
            Cancel
          </Button>
          <Button
            size="medium"
            onClick={handleSave}
            variant='solid'
            color='green'
          >
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
}
