import { useState, useEffect } from 'react';
import { BaseModalLayout } from '../modals/BaseModalLayout';
import { FieldIdentityForm } from '../forms/identity/FieldIdentityForm';
import { ReferenceFieldSettingsForm } from '../forms/settings/ReferenceFieldSettingsForm';
import { ReferenceFieldValidationForm } from '../forms/validations/ReferenceFieldValidationForm';
import { ReferenceFieldAppearanceForm } from '../forms/appearance/ReferenceFieldAppearanceForm';
import type { ReferenceField } from '../types';

interface ReferenceFieldEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: ReferenceField;
  onConfirm: (data: ReferenceField) => void;
}

export function ReferenceFieldEditModal({ isOpen, onClose, initialData, onConfirm }: ReferenceFieldEditModalProps) {
  const [data, setData] = useState<ReferenceField>(initialData);

  useEffect(() => {
    if (isOpen) setData(initialData);
  }, [isOpen, initialData]);

  const updateData = (updates: Partial<ReferenceField>) => {
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
      title={data.name || 'Edit Reference Field'}
      icon="reference"
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
              <ReferenceFieldSettingsForm data={data} onChange={updateData} readOnly />
            </>
          )}

          {activeTab === 'validation' && (
            <ReferenceFieldValidationForm
              validations={data.validations}
              onChange={(v) => updateData({ validations: v })}
            />
          )}

          {activeTab === 'appearance' && (
            <ReferenceFieldAppearanceForm data={data} onChange={updateData} />
          )}
        </div>
      )}
    </BaseModalLayout>
  );
}
