import { useState, useEffect } from 'react';
import { FieldModalLayout } from '../ui/FieldModalLayout';
import { AppearanceSelector } from '../appearance/AppearanceSelector';
import type { TextField } from '@/entities/content-model';
import { Switch, Input } from 'antd';

interface TextFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: TextField;
  onConfirm: (data: TextField) => void;
}

export function TextFieldModal({ isOpen, onClose, initialData, onConfirm }: TextFieldModalProps) {
  const [data, setData] = useState<TextField>(initialData);

  useEffect(() => {
    if (isOpen) setData(initialData);
  }, [isOpen, initialData]);

  const handleConfirm = () => {
    onConfirm(data);
  };

  const updateData = (updates: Partial<TextField>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const updateValidations = (updates: Partial<TextField['validations']>) => {
    setData((prev) => ({
      ...prev,
      validations: { ...(prev.validations as any), ...updates },
    }));
  };

  return (
    <FieldModalLayout
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title={data.name || 'New Text Field'}
      fieldTypeLabel="Text Field"
    >
      {(activeTab) => (
        <div className="flex flex-col gap-6 font-poppins">
          {activeTab === 'settings' && (
            <>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Identity</h3>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                    <Input
                      value={data.name}
                      onChange={(e) => {
                        const name = e.target.value;
                        const apiId = name.toLowerCase().replace(/[^a-z0-9]/g, '').trim();
                        updateData({ name, apiId });
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Field ID</label>
                    <Input
                      value={data.apiId}
                      onChange={(e) => updateData({ apiId: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-100" />
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Settings</h3>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">List</h4>
                      <p className="text-xs text-gray-500">Allow multiple text values.</p>
                    </div>
                    <Switch checked={data.list} onChange={(c) => updateData({ list: c })} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">Entry Title</h4>
                      <p className="text-xs text-gray-500">Use this field as the display title for entries.</p>
                    </div>
                    <Switch checked={data.isEntryTitle} onChange={(c) => updateData({ isEntryTitle: c })} />
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'validation' && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Validation</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Required field</h4>
                    <p className="text-xs text-gray-500">Make this field required for editors.</p>
                  </div>
                  <Switch
                    checked={data.validations?.required}
                    onChange={(c) => updateValidations({ required: c })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Unique field</h4>
                    <p className="text-xs text-gray-500">Ensure no two entries have the same value for this field.</p>
                  </div>
                  <Switch
                    checked={data.validations?.unique}
                    onChange={(c) => updateValidations({ unique: c })}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Appearance</h3>
              <p className="text-sm text-gray-600 mb-4">Choose how editors will interact with this field.</p>
              <AppearanceSelector
                value={data.appearance || 'singleLine'}
                onChange={(val) => updateData({ appearance: val as any })}
                options={[
                  { value: 'singleLine', label: 'Single Line', description: 'Standard text input field' },
                  { value: 'url', label: 'URL', description: 'Validates input as a URL' },
                  { value: 'dropdown', label: 'Dropdown', description: 'Select from predefined values' },
                  { value: 'radio', label: 'Radio Buttons', description: 'Choose one predefined value' },
                  { value: 'slug', label: 'Slug', description: 'Generates URL-friendly slugs' },
                ]}
              />
            </div>
          )}
        </div>
      )}
    </FieldModalLayout>
  );
}
