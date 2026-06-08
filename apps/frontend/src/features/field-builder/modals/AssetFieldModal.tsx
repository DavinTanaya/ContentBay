import { useState, useEffect } from 'react';
import { FieldModalLayout } from '../ui/FieldModalLayout';
import type { AssetField } from '@/entities/content-model';
import { Switch, Input, Radio } from 'antd';

interface AssetFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: AssetField;
  onConfirm: (data: AssetField) => void;
}

export function AssetFieldModal({ isOpen, onClose, initialData, onConfirm }: AssetFieldModalProps) {
  const [data, setData] = useState<AssetField>(initialData);

  useEffect(() => {
    if (isOpen) setData(initialData);
  }, [isOpen, initialData]);

  const handleConfirm = () => {
    onConfirm(data);
  };

  const updateData = (updates: Partial<AssetField>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const updateValidations = (updates: Partial<AssetField['validations']>) => {
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
      title={data.name || 'New Asset Field'}
      fieldTypeLabel="Asset Field"
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
                      <Radio value="one">Single Asset</Radio>
                      <Radio value="many">Multiple Assets</Radio>
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
              <p className="text-sm text-gray-600 mb-4">Asset fields use the Media picker interface.</p>
            </div>
          )}
        </div>
      )}
    </FieldModalLayout>
  );
}
