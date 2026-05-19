import { Modal } from 'antd';
import { FieldTypeOptions, type FieldPickerModalProps } from '../model/types';
import { RenderFieldIcon } from '@entities/content-model';

export function FieldPickerModal({
  isOpen,
  onClose,
  onSelectField,
}: FieldPickerModalProps) {
  return (
    <Modal
      title="Add New Field"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={950}
      centered
    >
      <div className="p-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FieldTypeOptions.map((type) => (
            <div
              key={type.title}
              onClick={() => onSelectField(type)}
              className="p-6 rounded-xl border transition-all cursor-pointer group h-full flex flex-col border-gray-100 hover:border-blue-6 hover:shadow-sm"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg mb-4 border border-gray-4 bg-gray-2 text-gray-7 transition-colors group-hover:border-blue-3 group-hover:bg-blue-1 group-hover:text-blue-6">
                <RenderFieldIcon icon={type.icon} />
              </div>
              <h4 className="label-xs-bold mb-2">{type.title}</h4>
              <p className="label-xs-regular text-gray-6 grow">{type.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
