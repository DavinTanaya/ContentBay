import { useState, useEffect } from 'react';
import { BaseModalLayout } from '../modals/BaseModalLayout';
import { FieldIdentityForm } from '../forms/identity/FieldIdentityForm';
import { NumberFieldSettingsForm } from '../forms/settings/NumberFieldSettingsForm';
import { NumberFieldValidationForm } from '../forms/validations/NumberFieldValidationForm';
import { NumberFieldAppearanceForm } from '../forms/appearance/NumberFieldAppearanceForm';
import { DefaultValueSection } from '../forms/shared/DefaultValueSection';
import type { NumberField } from '../types';

interface NumberFieldEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: NumberField;
  onConfirm: (data: NumberField) => void;
}

export function NumberFieldEditModal({ isOpen, onClose, initialData, onConfirm }: NumberFieldEditModalProps) {
  const [data, setData] = useState<NumberField>(initialData);

  useEffect(() => {
    if (isOpen) setData(initialData);
  }, [isOpen, initialData]);

  const updateData = (updates: Partial<NumberField>) => {
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
      title={data.name || 'Edit Number Field'}
      icon="number"
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
              <NumberFieldSettingsForm data={data} onChange={updateData} readOnly />
            </>
          )}

          {activeTab === 'validation' && (
            <NumberFieldValidationForm
              validations={data.validations}
              onChange={(v) => updateData({ validations: v })}
            />
          )}

          {activeTab === 'appearance' && (
            <div className="flex flex-col gap-10">
              <DefaultValueSection
                value={data.defaultValue?.toString() || ''}
                onChange={(v) => updateData({ defaultValue: v ? Number(v) : undefined })}
              />
              <NumberFieldAppearanceForm data={data} onChange={updateData} />
            </div>
          )}
        </div>
      )}
    </BaseModalLayout>
  );
}
