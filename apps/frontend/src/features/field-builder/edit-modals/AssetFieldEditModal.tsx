import { useState, useEffect } from 'react';
import { BaseModalLayout } from '../modals/BaseModalLayout';
import { FieldIdentityForm } from '../forms/identity/FieldIdentityForm';
import { AssetFieldSettingsForm } from '../forms/settings/AssetFieldSettingsForm';
import { AssetFieldValidationForm } from '../forms/validations/AssetFieldValidationForm';
import { AssetFieldAppearanceForm } from '../forms/appearance/AssetFieldAppearanceForm';
import type { AssetField } from '../types';

interface AssetFieldEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: AssetField;
  onConfirm: (data: AssetField) => void;
}

export function AssetFieldEditModal({ isOpen, onClose, initialData, onConfirm }: AssetFieldEditModalProps) {
  const [data, setData] = useState<AssetField>(initialData);

  useEffect(() => {
    if (isOpen) setData(initialData);
  }, [isOpen, initialData]);

  const updateData = (updates: Partial<AssetField>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const handleNameChange = (newName: string) => {
    const apiId = newName.toLowerCase().replace(/[^a-z0-9]/g, '').trim();
    updateData({ name: newName, apiId });
  };

  return (
    <BaseModalLayout
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={() => onConfirm(data)}
      onBack={onClose}
      title={data.name || 'Edit Asset Field'}
      icon="media"
    >
      {(activeTab) => (
        <div className="flex flex-col gap-6 font-poppins">
          {activeTab === 'settings' && (
            <>
              <FieldIdentityForm
                name={data.name}
                apiId={data.apiId}
                setApiId={(apiId) => updateData({ apiId })}
                onNameChange={handleNameChange}
              />
              <div className="border-t border-gray-100" />
              <AssetFieldSettingsForm data={data} onChange={updateData} readOnly />
            </>
          )}

          {activeTab === 'validation' && (
            <AssetFieldValidationForm
              validations={data.validations}
              onChange={(v) => updateData({ validations: v })}
            />
          )}

          {activeTab === 'appearance' && <AssetFieldAppearanceForm />}
        </div>
      )}
    </BaseModalLayout>
  );
}
