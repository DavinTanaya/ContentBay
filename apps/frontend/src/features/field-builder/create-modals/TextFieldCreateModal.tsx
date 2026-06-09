import { useState } from 'react';
import { Modal, Button, Input, Radio } from 'antd';
import { RenderFieldIcon } from '@entities/content-model';
import { initializeField } from '../schemas/field-factory';
import type { TextField } from '../types';

interface TextFieldCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onConfirm: (data: TextField) => void;
}

export function TextFieldCreateModal({ isOpen, onClose, onBack, onConfirm }: TextFieldCreateModalProps) {
  const [name, setName] = useState('');
  const [apiId, setApiId] = useState('');
  const [storageType, setStorageType] = useState<'shortText' | 'longText'>('shortText');

  const handleNameChange = (newName: string) => {
    setName(newName);
    setApiId(newName.toLowerCase().replace(/[^a-z0-9]/g, '').trim());
  };

  const handleConfirm = () => {
    const field = initializeField('text', `new-${Date.now()}`, name, apiId, 'text') as TextField;
    field.storageType = storageType;
    onConfirm(field);
  };

  return (
    <Modal title={null} open={isOpen} onCancel={onClose} footer={null} width={600} centered>
      <div className="p-10">
        <div className="flex items-center gap-5 mb-10">
          <div className="w-12 h-12 rounded-xl bg-blue-1 text-blue-6 flex items-center justify-center text-xl">
            <RenderFieldIcon icon="text" />
          </div>
          <div>
            <h2 className="label-md-bold text-gray-12 mb-1">Configure Text Field</h2>
            <p className="label-xs-regular text-gray-6">Set the basic identity for this field</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="label-sm-medium text-gray-10 mb-2 font-poppins">Name</label>
              <Input
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="h-11 rounded-lg border-gray-4 font-semibold px-4"
                placeholder="e.g. Title"
              />
            </div>
            <div>
              <label className="label-sm-medium text-gray-10 mb-2 font-poppins">Field ID</label>
              <Input
                value={apiId}
                onChange={(e) => setApiId(e.target.value)}
                className="h-11 rounded-lg border-gray-4 bg-gray-2 px-4 font-mono text-xs text-gray-11"
                placeholder="e.g. title"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">Storage Type</label>
            <Radio.Group value={storageType} onChange={(e) => setStorageType(e.target.value)}>
              <Radio value="shortText">Short Text</Radio>
              <Radio value="longText">Long Text</Radio>
            </Radio.Group>
            <p className="text-xs text-gray-500 mt-2">
              This cannot be changed after creation.
            </p>
          </div>

          <div className="pt-8 border-t border-gray-4 flex justify-end gap-3">
            <Button type="default" size="middle" onClick={onBack}>Change Field Type</Button>
            <Button variant="solid" color="geekblue" size="middle" onClick={handleConfirm} disabled={!name || !apiId}>
              Add & Configure
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
