import { useState, useEffect } from 'react';
import { FieldModalLayout } from '../ui/FieldModalLayout';
import type { DateField } from '@/entities/content-model';
import { Switch, Input, Radio } from 'antd';

interface DateFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: DateField;
  onConfirm: (data: DateField) => void;
}

export function DateFieldModal({ isOpen, onClose, initialData, onConfirm }: DateFieldModalProps) {
  const [data, setData] = useState<DateField>(initialData);

  useEffect(() => {
    if (isOpen) setData(initialData);
  }, [isOpen, initialData]);

  const handleConfirm = () => {
    onConfirm(data);
  };

  const updateData = (updates: Partial<DateField>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const updateAppearance = (updates: Partial<DateField['appearance']>) => {
    setData((prev) => ({
      ...prev,
      appearance: { ...(prev.appearance as any), ...updates },
    }));
  };

  const updateValidations = (updates: Partial<DateField['validations']>) => {
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
      title={data.name || 'New Date Field'}
      fieldTypeLabel="Date Field"
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
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Appearance</h3>
              <p className="text-sm text-gray-600 mb-4">Choose how the date picker will be presented.</p>
              
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Format</label>
                <Radio.Group
                  value={data.appearance?.format || 'dateOnly'}
                  onChange={(e) => updateAppearance({ format: e.target.value })}
                  className="flex flex-col gap-2"
                >
                  <Radio value="dateOnly">Date Only (e.g. 1990-10-24)</Radio>
                  <Radio value="dateTime">Date and Time (without timezone)</Radio>
                  <Radio value="dateTimeWithTimezone">Date and Time (with timezone)</Radio>
                </Radio.Group>
              </div>

              {(data.appearance?.format === 'dateTime' || data.appearance?.format === 'dateTimeWithTimezone') && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Hour Format</label>
                  <Radio.Group
                    value={data.appearance?.hourFormat || '24h'}
                    onChange={(e) => updateAppearance({ hourFormat: e.target.value })}
                    optionType="button"
                    buttonStyle="solid"
                  >
                    <Radio.Button value="12h">12-hour (AM/PM)</Radio.Button>
                    <Radio.Button value="24h">24-hour</Radio.Button>
                  </Radio.Group>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </FieldModalLayout>
  );
}
