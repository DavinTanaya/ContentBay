import { useState, useEffect } from 'react';
import { FieldModalLayout } from '../ui/FieldModalLayout';
import type { ReferenceField } from '@/entities/content-model';
import { Switch, Input, Radio } from 'antd';

interface ReferenceFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: ReferenceField;
  onConfirm: (data: ReferenceField) => void;
}

export function ReferenceFieldModal({ isOpen, onClose, initialData, onConfirm }: ReferenceFieldModalProps) {
  const [data, setData] = useState<ReferenceField>(initialData);

  useEffect(() => {
    if (isOpen) setData(initialData);
  }, [isOpen, initialData]);

  const handleConfirm = () => {
    onConfirm(data);
  };

  const updateData = (updates: Partial<ReferenceField>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const updateValidations = (updates: Partial<ReferenceField['validations']>) => {
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
      title={data.name || 'New Reference Field'}
      fieldTypeLabel="Reference Field"
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
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Cardinality</label>
                    <Radio.Group
                      value={data.cardinality || 'one'}
                      onChange={(e) => updateData({ cardinality: e.target.value })}
                    >
                      <Radio value="one">Single Reference</Radio>
                      <Radio value="many">Multiple References</Radio>
                    </Radio.Group>
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
              <p className="text-sm text-gray-600 mb-4">Choose how the reference will be displayed.</p>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Display Mode</label>
                <Radio.Group
                  value={data.appearance || 'entryLink'}
                  onChange={(e) => updateData({ appearance: e.target.value })}
                >
                  <Radio value="entryLink">Entry Link</Radio>
                  <Radio value="entryCard">Entry Card</Radio>
                </Radio.Group>
              </div>
            </div>
          )}
        </div>
      )}
    </FieldModalLayout>
  );
}
