import { useState, useEffect } from 'react';
import { BaseModalLayout } from '../modals/BaseModalLayout';
import { FieldIdentityForm } from '../forms/identity/FieldIdentityForm';
import { DateFieldSettingsForm } from '../forms/settings/DateFieldSettingsForm';
import { DateFieldValidationForm } from '../forms/validations/DateFieldValidationForm';
import { DateFieldAppearanceForm } from '../forms/appearance/DateFieldAppearanceForm';
import { DefaultValueSection } from '../forms/shared/DefaultValueSection';
import type { DateField } from '../types';

interface DateFieldEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: DateField;
  onConfirm: (data: DateField) => void;
}

export function DateFieldEditModal({ isOpen, onClose, initialData, onConfirm }: DateFieldEditModalProps) {
  const [data, setData] = useState<DateField>(initialData);

  useEffect(() => {
    if (isOpen) setData(initialData);
  }, [isOpen, initialData]);

  const updateData = (updates: Partial<DateField>) => {
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
      title={data.name || 'Edit Date Field'}
      icon="calendar"
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
              <DateFieldSettingsForm />
            </>
          )}

          {activeTab === 'validation' && (
            <DateFieldValidationForm
              validations={data.validations}
              onChange={(v) => updateData({ validations: v })}
            />
          )}

          {activeTab === 'appearance' && (
            <div className="flex flex-col gap-10">
              <DefaultValueSection
                value={data.defaultValue || ''}
                onChange={(v) => updateData({ defaultValue: v })}
              />
              <DateFieldAppearanceForm data={data} onChange={updateData} />
            </div>
          )}
        </div>
      )}
    </BaseModalLayout>
  );
}
