import { useState, useEffect } from 'react';
import { BaseModalLayout } from '../modals/BaseModalLayout';
import { FieldIdentityForm } from '../forms/identity/FieldIdentityForm';
import { JsonFieldSettingsForm } from '../forms/settings/JsonFieldSettingsForm';
import { JsonFieldValidationForm } from '../forms/validations/JsonFieldValidationForm';
import { JsonFieldAppearanceForm } from '../forms/appearance/JsonFieldAppearanceForm';
import type { JsonField } from '../types';

interface JsonFieldEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: JsonField;
  onConfirm: (data: JsonField) => void;
}

export function JsonFieldEditModal({ isOpen, onClose, initialData, onConfirm }: JsonFieldEditModalProps) {
  const [data, setData] = useState<JsonField>(initialData);

  useEffect(() => {
    if (isOpen) setData(initialData);
  }, [isOpen, initialData]);

  const updateData = (updates: Partial<JsonField>) => {
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
      title={data.name || 'Edit JSON Field'}
      icon="json"
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
              <JsonFieldSettingsForm />
            </>
          )}

          {activeTab === 'validation' && (
            <JsonFieldValidationForm
              validations={data.validations}
              onChange={(v) => updateData({ validations: v })}
            />
          )}

          {activeTab === 'appearance' && <JsonFieldAppearanceForm />}
        </div>
      )}
    </BaseModalLayout>
  );
}
