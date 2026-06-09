import { useState, useEffect } from 'react';
import { BaseModalLayout } from '../modals/BaseModalLayout';
import { FieldIdentityForm } from '../forms/identity/FieldIdentityForm';
import { TextFieldSettingsForm } from '../forms/settings/TextFieldSettingsForm';
import { TextFieldValidationForm } from '../forms/validations/TextFieldValidationForm';
import { TextFieldAppearanceForm } from '../forms/appearance/TextFieldAppearanceForm';
import { DefaultValueSection } from '../forms/shared/DefaultValueSection';
import type { TextField } from '../types';

interface TextFieldEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: TextField;
  onConfirm: (data: TextField) => void;
}

export function TextFieldEditModal({ isOpen, onClose, initialData, onConfirm }: TextFieldEditModalProps) {
  const [data, setData] = useState<TextField>(initialData);

  useEffect(() => {
    if (isOpen) setData(initialData);
  }, [isOpen, initialData]);

  const updateData = (updates: Partial<TextField>) => {
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
      title={data.name || 'Edit Text Field'}
      icon="text"
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
              <TextFieldSettingsForm data={data} onChange={updateData} />
              {data.storageType && (
                <>
                  <div className="border-t border-gray-100" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Storage Type</h3>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-700">{data.storageType === 'shortText' ? 'Short Text' : 'Long Text'}</span>
                      {' — '}This cannot be changed after creation.
                    </p>
                  </div>
                </>
              )}
            </>
          )}

          {activeTab === 'validation' && (
            <TextFieldValidationForm
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
              <TextFieldAppearanceForm data={data} onChange={updateData} />
            </div>
          )}
        </div>
      )}
    </BaseModalLayout>
  );
}
