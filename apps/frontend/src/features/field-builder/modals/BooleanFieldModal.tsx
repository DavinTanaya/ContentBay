import { useState, useEffect } from 'react';
import { FieldModalLayout } from '../ui/FieldModalLayout';
import type { BooleanField } from '@/entities/content-model';
import { Switch, Input } from 'antd';

interface BooleanFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: BooleanField;
  onConfirm: (data: BooleanField) => void;
}

export function BooleanFieldModal({ isOpen, onClose, initialData, onConfirm }: BooleanFieldModalProps) {
  const [data, setData] = useState<BooleanField>(initialData);

  useEffect(() => {
    if (isOpen) setData(initialData);
  }, [isOpen, initialData]);

  const handleConfirm = () => {
    onConfirm(data);
  };

  const updateData = (updates: Partial<BooleanField>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const updateLabels = (updates: Partial<BooleanField['labels']>) => {
    setData((prev) => ({
      ...prev,
      labels: { ...(prev.labels as any), ...updates },
    }));
  };

  const updateValidations = (updates: Partial<BooleanField['validations']>) => {
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
      title={data.name || 'New Boolean Field'}
      fieldTypeLabel="Boolean Field"
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
              <p className="text-sm text-gray-600 mb-4">Choose the labels for true/false states.</p>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">True Label</label>
                  <Input
                    value={data.labels?.trueLabel || 'Yes'}
                    onChange={(e) => updateLabels({ trueLabel: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">False Label</label>
                  <Input
                    value={data.labels?.falseLabel || 'No'}
                    onChange={(e) => updateLabels({ falseLabel: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </FieldModalLayout>
  );
}
