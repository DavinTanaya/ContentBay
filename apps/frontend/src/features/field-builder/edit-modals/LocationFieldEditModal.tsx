import { useState, useEffect } from 'react';
import { BaseModalLayout } from '../modals/BaseModalLayout';
import { FieldIdentityForm } from '../forms/identity/FieldIdentityForm';
import { LocationFieldSettingsForm } from '../forms/settings/LocationFieldSettingsForm';
import { LocationFieldValidationForm } from '../forms/validations/LocationFieldValidationForm';
import { LocationFieldAppearanceForm } from '../forms/appearance/LocationFieldAppearanceForm';
import type { LocationField } from '../types';

interface LocationFieldEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: LocationField;
  onConfirm: (data: LocationField) => void;
}

export function LocationFieldEditModal({ isOpen, onClose, initialData, onConfirm }: LocationFieldEditModalProps) {
  const [data, setData] = useState<LocationField>(initialData);

  useEffect(() => {
    if (isOpen) setData(initialData);
  }, [isOpen, initialData]);

  const updateData = (updates: Partial<LocationField>) => {
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
      title={data.name || 'Edit Location Field'}
      icon="location"
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
              <LocationFieldSettingsForm />
            </>
          )}

          {activeTab === 'validation' && (
            <LocationFieldValidationForm
              validations={data.validations}
              onChange={(v) => updateData({ validations: v })}
            />
          )}

          {activeTab === 'appearance' && <LocationFieldAppearanceForm />}
        </div>
      )}
    </BaseModalLayout>
  );
}
