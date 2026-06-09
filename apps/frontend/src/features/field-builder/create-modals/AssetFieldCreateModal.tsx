import { useState } from 'react';
import { Modal, Button, Input, Radio } from 'antd';
import { RenderFieldIcon } from '@entities/content-model';
import { initializeField } from '../schemas/field-factory';
import type { AssetField } from '../types';

interface AssetFieldCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onConfirm: (data: AssetField) => void;
}

export function AssetFieldCreateModal({
  isOpen,
  onClose,
  onBack,
  onConfirm,
}: AssetFieldCreateModalProps) {
  const [name, setName] = useState('');
  const [apiId, setApiId] = useState('');
  const [cardinality, setCardinality] = useState<'one' | 'many'>('one');

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
      'asset',
      `new-${Date.now()}`,
      name,
      apiId,
      'media',
    ) as AssetField;
    field.settings = { ...field.settings, cardinality };
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
            <RenderFieldIcon icon="media" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-10 m-0">
              Configure Asset Field
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
                placeholder="e.g. Hero Image"
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
                placeholder="e.g. heroImage"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
              Cardinality
            </label>
            <Radio.Group
              value={cardinality}
              onChange={(e) => setCardinality(e.target.value)}
            >
              <Radio value="one">One File</Radio>
              <Radio value="many">Many Files</Radio>
            </Radio.Group>
            <p className="text-xs text-gray-500 mt-2">
              This cannot be changed after creation.
            </p>
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
