import type { FC } from 'react';
import { Modal, Button, Tag, Input, Checkbox, Radio } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import type { FieldType } from '@entities/content-model';
import { RenderFieldIcon } from '@entities/content-model';
import { useFieldConfig } from '../model/useFieldConfig';

interface FieldConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFieldType: FieldType | null;
  onConfirm: (data: { name: string; apiId: string }) => void;
}

export const FieldConfigModal: FC<FieldConfigModalProps> = ({
  isOpen,
  onClose,
  selectedFieldType,
  onConfirm,
}) => {
  const {
    name,
    apiId,
    setApiId,
    configStep,
    setConfigStep,
    configSubTab,
    setConfigSubTab,
    handleNameChange,
    handleConfirm,
  } = useFieldConfig(selectedFieldType, onConfirm);

  if (!selectedFieldType) return null;

  return (
    <Modal
      title={null}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={configStep === 1 ? 700 : 1100}
      centered
      className="field-config-modal"
      closeIcon={<CloseOutlined className="mt-6 mr-6 text-gray-400" />}
    >
      {configStep === 1 ? (
        <div className="p-16">
          <div className="flex items-center gap-6 mb-12">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-2xl"
              style={{
                backgroundColor: '#2563EB10',
                color: '#2563EB',
              }}
            >
              <RenderFieldIcon icon={selectedFieldType?.icon} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                Configure {selectedFieldType?.title}
              </h2>
              <p className="text-gray-400 font-medium">
                Set the basic identity for this field
              </p>
            </div>
          </div>
          <div className="space-y-10">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                  Name
                </label>
                <Input
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="h-12 rounded-xl border-gray-100 font-bold px-4"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                  Field ID
                </label>
                <Input
                  value={apiId}
                  onChange={(e) => setApiId(e.target.value)}
                  className="h-12 rounded-xl border-gray-100 bg-gray-50 px-4 font-mono text-xs"
                />
              </div>
            </div>
            <div className="pt-10 border-t border-gray-50 flex justify-end gap-3">
              <Button
                className="h-12 px-8 rounded-xl font-bold border-gray-100 text-gray-500"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                className="h-12 px-10 rounded-xl font-bold bg-[#1A7F37] border-none shadow-lg shadow-green-900/10"
                onClick={() => setConfigStep(2)}
              >
                Add and Configure
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex min-h-[650px]">
          {/* Sidebar Stepper */}
          <div className="w-72 border-r border-gray-50 p-10 space-y-3 bg-gray-50/20">
            <div className="mb-10 pl-2">
              <Tag
                className="rounded-lg px-3 py-1 font-bold text-[10px] border-none"
                style={{
                  backgroundColor: '#2563EB15',
                  color: '#2563EB',
                }}
              >
                {selectedFieldType?.title.toUpperCase()} FIELD
              </Tag>
            </div>
            {[
              { id: 'name', label: 'Identity' },
              { id: 'validation', label: 'Validation' },
              { id: 'appearance', label: 'Appearance' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setConfigSubTab(item.id)}
                className={`w-full text-left px-5 py-3.5 rounded-2xl text-sm font-bold transition-all ${
                  configSubTab === item.id
                    ? 'bg-white text-[#2563EB] shadow-sm border border-blue-50'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          {/* Config Content */}
          <div className="flex-grow flex flex-col">
            <div className="flex-grow p-16">
              {configSubTab === 'name' && (
                <div className="animate-in fade-in duration-300">
                  <h3 className="text-2xl font-bold text-gray-900 mb-10">
                    Field Identity
                  </h3>
                  <div className="space-y-8 max-w-lg">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                        Display Name
                      </label>
                      <Input
                        value={name}
                        onChange={(e) => handleNameChange(e.target.value)}
                        className="h-12 rounded-xl border-gray-100 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                        API ID
                      </label>
                      <Input
                        value={apiId}
                        onChange={(e) => setApiId(e.target.value)}
                        className="h-12 rounded-xl border-gray-100 bg-gray-50 font-mono text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}
              {configSubTab === 'validation' && (
                <div className="animate-in fade-in duration-300 space-y-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-10">
                    Validation Rules
                  </h3>
                  <div className="grid grid-cols-1 gap-6">
                    <Checkbox className="font-bold text-gray-700">
                      Required field{' '}
                      <span className="text-gray-400 font-medium block text-xs mt-1">
                        Cannot be empty when publishing
                      </span>
                    </Checkbox>
                    <Checkbox className="font-bold text-gray-700">
                      Unique field{' '}
                      <span className="text-gray-400 font-medium block text-xs mt-1">
                        Must be different from other entries
                      </span>
                    </Checkbox>
                  </div>
                </div>
              )}
              {configSubTab === 'appearance' && (
                <div className="animate-in fade-in duration-300">
                  <h3 className="text-2xl font-bold text-gray-900 mb-10">
                    Appearance Widget
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 rounded-2xl border-2 border-[#2563EB] bg-blue-50/20">
                      <Radio checked className="font-bold">
                        Standard Input
                      </Radio>
                      <p className="text-[10px] text-gray-400 mt-2 ml-6">
                        The default input for this field type
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="p-10 border-t border-gray-50 bg-gray-50/20 flex justify-end gap-3 mt-auto rounded-br-[24px]">
              <Button
                className="h-12 px-8 rounded-xl font-bold border-gray-100 text-gray-500"
                onClick={() => setConfigStep(1)}
              >
                Back
              </Button>
              <Button
                type="primary"
                className="h-12 px-12 rounded-xl font-bold bg-[#1A7F37] border-none"
                onClick={handleConfirm}
              >
                Confirm & Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};
