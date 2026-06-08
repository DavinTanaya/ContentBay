import { useState, useEffect } from 'react';
import { FieldModalLayout } from '../ui/FieldModalLayout';
import { AppearanceSelector } from '../appearance/AppearanceSelector';
import type { NumberField } from '@/entities/content-model';
import { Switch, Input, Radio } from 'antd';

interface NumberFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: NumberField;
  onConfirm: (data: NumberField) => void;
}

export function NumberFieldModal({ isOpen, onClose, initialData, onConfirm }: NumberFieldModalProps) {
  const [data, setData] = useState<NumberField>(initialData);

  useEffect(() => {
    if (isOpen) setData(initialData);
  }, [isOpen, initialData]);

  const handleConfirm = () => {
    onConfirm(data);
  };

  const updateData = (updates: Partial<NumberField>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const updateValidations = (updates: Partial<NumberField['validations']>) => {
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
      title={data.name || 'New Number Field'}
      fieldTypeLabel="Number Field"
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
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Number Type</label>
                    <Radio.Group
                      value={data.numberType || 'integer'}
                      onChange={(e) => updateData({ numberType: e.target.value })}
                    >
                      <Radio value="integer">Integer</Radio>
                      <Radio value="decimal">Decimal</Radio>
                    </Radio.Group>
                    <p className="text-xs text-gray-500 mt-2">
                      Choose integer for whole numbers, decimal for fractions.
                    </p>
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
                value={data.appearance || 'number'}
                onChange={(val) => updateData({ appearance: val as any })}
                options={[
                  { value: 'number', label: 'Number Input', description: 'Standard number input field' },
                  { value: 'dropdown', label: 'Dropdown', description: 'Select from predefined values' },
                  { value: 'radio', label: 'Radio Buttons', description: 'Choose one predefined value' },
                  { value: 'rating', label: 'Rating', description: 'Display as stars (usually 1-5)' },
                ]}
              />
            </div>
          )}
        </div>
      )}
    </FieldModalLayout>
  );
}
