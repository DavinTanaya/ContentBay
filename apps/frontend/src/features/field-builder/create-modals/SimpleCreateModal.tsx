import { useState } from 'react';
import { Modal, Button, Input } from 'antd';
import { RenderFieldIcon } from '@entities/content-model';
import { initializeField } from '../schemas/field-factory';
import type { ContentFieldConfig, FieldIcon } from '../types';

interface SimpleCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onConfirm: (data: ContentFieldConfig) => void;
  fieldType: string;
  fieldTitle: string;
  icon: FieldIcon;
  placeholder?: string;
}

export function SimpleCreateModal({
  isOpen,
  onClose,
  onBack,
  onConfirm,
  fieldType,
  fieldTitle,
  icon,
  placeholder,
}: SimpleCreateModalProps) {
  const [name, setName] = useState('');
  const [apiId, setApiId] = useState('');

  const handleNameChange = (newName: string) => {
    setName(newName);
    setApiId(
      newName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .trim(),
    );
  };

  const handleConfirm = () => {
    const field = initializeField(
      fieldType,
      `new-${Date.now()}`,
      name,
      apiId,
      icon,
    );
    onConfirm(field);
  };

  return (
    <Modal
      title={null}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={600}
      centered
    >
      <div className="p-10">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-[52px] h-[52px] rounded-2xl bg-blue-50/80 ring-1 ring-blue-100 flex items-center justify-center text-blue-6 shadow-sm text-[22px]">
            <RenderFieldIcon icon={icon} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-10 m-0">
              Configure {fieldTitle}
            </h2>
            <p className="text-sm text-gray-500 mt-1 m-0">
              Set the basic identity for this field
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-8 block mb-2">
                Name
              </label>
              <Input
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="bg-slate-50 border-transparent hover:border-blue-200 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-xl h-12 font-semibold px-4 transition-all"
                placeholder={placeholder || 'e.g. Field Name'}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-8 block mb-2">
                Field ID
              </label>
              <Input
                value={apiId}
                onChange={(e) => setApiId(e.target.value)}
                className="bg-slate-100 border-transparent hover:border-blue-200 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-xl h-12 px-4 font-mono text-[13px] text-gray-700 transition-all"
                placeholder="e.g. fieldName"
              />
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 flex justify-end gap-3 mt-8">
            <Button type="default" size="middle" onClick={onBack}>
              Change Field Type
            </Button>
            <Button
              variant="solid"
              color="geekblue"
              size="middle"
              onClick={handleConfirm}
              disabled={!name || !apiId}
            >
              Add & Configure
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
