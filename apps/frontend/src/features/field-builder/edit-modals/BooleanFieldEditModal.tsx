import { useState, useEffect } from 'react';
import { BaseModalLayout } from '../modals/BaseModalLayout';
import { FieldIdentityForm } from '../forms/identity/FieldIdentityForm';
import { BooleanFieldSettingsForm } from '../forms/settings/BooleanFieldSettingsForm';
import { BooleanFieldValidationForm } from '../forms/validations/BooleanFieldValidationForm';
import { BooleanFieldAppearanceForm } from '../forms/appearance/BooleanFieldAppearanceForm';
import type { BooleanField } from '../types';

interface BooleanFieldEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: BooleanField;
  onConfirm: (data: BooleanField) => void;
}

export function BooleanFieldEditModal({ isOpen, onClose, initialData, onConfirm }: BooleanFieldEditModalProps) {
  const [data, setData] = useState<BooleanField>(initialData);

  useEffect(() => {
    if (isOpen) setData(initialData);
  }, [isOpen, initialData]);

  const updateData = (updates: Partial<BooleanField>) => {
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
      title={data.name || 'Edit Boolean Field'}
      icon="boolean"
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
              <BooleanFieldSettingsForm data={data} onChange={updateData} />
            </>
          )}

          {activeTab === 'validation' && (
            <BooleanFieldValidationForm
              validations={data.validations}
              onChange={(v) => updateData({ validations: v })}
            />
          )}

          {activeTab === 'appearance' && <BooleanFieldAppearanceForm />}
        </div>
      )}
    </BaseModalLayout>
  );
}
