import { useState } from 'react';
import { Modal, Button, Input, Radio } from 'antd';
import { RenderFieldIcon } from '@entities/content-model';
import { initializeField } from '../schemas/field-factory';
import type { ReferenceField } from '../types';

interface ReferenceFieldCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onProceed: (data: ReferenceField) => void;
}

export function ReferenceFieldCreateModal({ isOpen, onClose, onBack, onProceed }: ReferenceFieldCreateModalProps) {
  const [name, setName] = useState('');
  const [apiId, setApiId] = useState('');
  const [cardinality, setCardinality] = useState<'one' | 'many'>('one');

  const handleNameChange = (newName: string) => {
    setName(newName);
    setApiId(newName.toLowerCase().replace(/[^a-z0-9]/g, '').trim());
  };

  const handleConfirm = () => {
    const field = initializeField('reference', `new-${Date.now()}`, name, apiId, 'reference') as ReferenceField;
    field.settings = { ...field.settings, cardinality };
    onProceed(field);
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-6 shrink-0 text-lg ring-1 ring-blue-100">
            <RenderFieldIcon icon="reference" />
          </div>
          <span className="font-poppins font-semibold text-lg text-gray-13">
            Configure Reference Field
          </span>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={480}
      centered
    >
      <div className="mt-4">
        <p className="text-sm text-gray-500 mb-6">
          Set the basic identity for this field before proceeding to configuration.
        </p>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-9 block mb-2">Name</label>
              <Input
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                size="large"
                className="bg-slate-50 border-transparent hover:border-blue-200 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-xl transition-all"
                placeholder="e.g. Author"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-9 block mb-2">Field ID</label>
              <Input
                value={apiId}
                onChange={(e) => setApiId(e.target.value)}
                size="large"
                className="bg-slate-100 border-transparent hover:border-blue-200 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-xl font-mono text-[13px] text-gray-700 transition-all"
                placeholder="e.g. author"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-9 mb-2">Cardinality</label>
            <Radio.Group value={cardinality} onChange={(e) => setCardinality(e.target.value)}>
              <Radio value="one">One Reference</Radio>
              <Radio value="many">Many References</Radio>
            </Radio.Group>
            <p className="text-xs text-gray-500 mt-2">
              This cannot be changed after creation.
            </p>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <Button size="middle" onClick={onBack}>Change Field Type</Button>
            <Button type="primary" variant="solid" color="geekblue" size="middle" onClick={handleConfirm} disabled={!name || !apiId}>Add & Configure</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
