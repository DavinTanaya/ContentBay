import { useState, useEffect } from 'react';
import { BaseModalLayout } from '../modals/BaseModalLayout';
import { FieldIdentityForm } from '../forms/identity/FieldIdentityForm';
import { RichTextFieldSettingsForm } from '../forms/settings/RichTextFieldSettingsForm';
import { RichTextFieldValidationForm } from '../forms/validations/RichTextFieldValidationForm';
import { RichTextFieldAppearanceForm } from '../forms/appearance/RichTextFieldAppearanceForm';
import type { RichTextField } from '../types';

interface RichTextFieldEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: RichTextField;
  onConfirm: (data: RichTextField) => void;
}

export function RichTextFieldEditModal({ isOpen, onClose, initialData, onConfirm }: RichTextFieldEditModalProps) {
  const [data, setData] = useState<RichTextField>(initialData);

  useEffect(() => {
    if (isOpen) setData(initialData);
  }, [isOpen, initialData]);

  const updateData = (updates: Partial<RichTextField>) => {
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
      title={data.name || 'Edit Rich Text Field'}
      icon="rich-text"
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
              <RichTextFieldSettingsForm data={data} onChange={updateData} />
            </>
          )}

          {activeTab === 'validation' && (
            <RichTextFieldValidationForm
              validations={data.validations}
              onChange={(v) => updateData({ validations: v })}
            />
          )}

          {activeTab === 'appearance' && <RichTextFieldAppearanceForm />}
        </div>
      )}
    </BaseModalLayout>
  );
}
