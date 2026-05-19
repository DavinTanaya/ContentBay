import { Modal, Button, Input } from 'antd';
import { RenderFieldIcon } from '@entities/content-model';
import { useFieldConfig } from '../model/useFieldConfig';
import type { FieldConfigModalProps } from '../model/types';

export function FieldConfigModal({
  isOpen,
  onClose,
  selectedFieldType,
  onConfirm,
  onBack,
}: FieldConfigModalProps) {
  const { name, apiId, setApiId, handleNameChange, handleConfirm } =
    useFieldConfig(selectedFieldType, onConfirm);

  if (!selectedFieldType) return null;

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
        <div className="flex items-center gap-5 mb-10">
          <div className="w-12 h-12 rounded-xl bg-blue-1 text-blue-6 flex items-center justify-center text-xl">
            <RenderFieldIcon icon={selectedFieldType?.icon} />
          </div>
          <div>
            <h2 className="label-md-bold text-gray-12 mb-1">
              Configure {selectedFieldType?.title}
            </h2>
            <p className="label-xs-regular text-gray-6">
              Set the basic identity for this field
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="label-sm-medium text-gray-10 mb-2 font-poppins">
                Name
              </label>
              <Input
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="h-11 rounded-lg border-gray-4 font-semibold px-4"
                placeholder="e.g. Title"
              />
            </div>
            <div>
              <label className="label-sm-medium text-gray-10 mb-2 font-poppins">
                Field ID
              </label>
              <Input
                value={apiId}
                onChange={(e) => setApiId(e.target.value)}
                className="h-11 rounded-lg border-gray-4 bg-gray-2 px-4 font-mono text-xs text-gray-11"
                placeholder="e.g. title"
              />
            </div>
          </div>

          <div className="pt-8 border-t border-gray-4 flex justify-end gap-3">
            <Button type="default" size="medium" onClick={onBack}>
              Change Field Type
            </Button>
            <Button
              variant="solid"
              color="geekblue"
              size="medium"
              onClick={handleConfirm}
            >
              Add & Configure
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
