import { useState } from 'react';
import { Modal, Button, Input, Radio } from 'antd';
import { RenderFieldIcon } from '@entities/content-model';
import { initializeField } from '../schemas/field-factory';
import type { ReferenceField } from '../types';

interface ReferenceFieldCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onConfirm: (data: ReferenceField) => void;
}

export function ReferenceFieldCreateModal({ isOpen, onClose, onBack, onConfirm }: ReferenceFieldCreateModalProps) {
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
    onConfirm(field);
  };

  return (
    <Modal title={null} open={isOpen} onCancel={onClose} footer={null} width={600} centered>
      <div className="p-10">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-[52px] h-[52px] rounded-2xl bg-blue-50/80 ring-1 ring-blue-100 flex items-center justify-center text-blue-6 shadow-sm text-[22px]">
            <RenderFieldIcon icon="reference" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-10 m-0">Configure Reference Field</h2>
            <p className="text-sm text-gray-500 mt-1 m-0">Set the basic identity for this field</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-8 block mb-2">Name</label>
              <Input
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="bg-slate-50 border-transparent hover:border-blue-200 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-xl h-12 font-semibold px-4 transition-all"
                placeholder="e.g. Author"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-8 block mb-2">Field ID</label>
              <Input
                value={apiId}
                onChange={(e) => setApiId(e.target.value)}
                className="bg-slate-100 border-transparent hover:border-blue-200 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-xl h-12 px-4 font-mono text-[13px] text-gray-700 transition-all"
                placeholder="e.g. author"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">Cardinality</label>
            <Radio.Group value={cardinality} onChange={(e) => setCardinality(e.target.value)}>
              <Radio value="one">One Reference</Radio>
              <Radio value="many">Many References</Radio>
            </Radio.Group>
            <p className="text-xs text-gray-500 mt-2">
              This cannot be changed after creation.
            </p>
          </div>

          <div className="pt-8 border-t border-slate-100 flex justify-end gap-3 mt-8">
            <Button type="default" size="large" onClick={onBack} className="h-12 px-6 rounded-xl font-medium border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all">Change Field Type</Button>
            <Button type="primary" size="large" onClick={handleConfirm} disabled={!name || !apiId} className="h-12 px-8 rounded-xl shadow-sm bg-blue-600 hover:bg-blue-500 hover:shadow-md hover:-translate-y-0.5 transition-all font-semibold">Add & Configure</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
