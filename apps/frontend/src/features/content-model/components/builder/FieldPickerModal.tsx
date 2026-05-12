import type { FC } from 'react';
import { Modal } from 'antd';
import { CloseOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { FIELD_TYPES } from '../../constants/fieldTypes';
import type { FieldType } from '../../content-model.type';

interface FieldPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectField: (type: FieldType) => void;
}

export const FieldPickerModal: FC<FieldPickerModalProps> = ({
  isOpen,
  onClose,
  onSelectField,
}) => {
  return (
    <Modal
      title={null}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={950}
      centered
      className="field-picker-modal-v3"
      closeIcon={<CloseOutlined className="text-gray-400 text-lg mt-4 mr-4" />}
    >
      <div className="p-10">
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            Add new field
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FIELD_TYPES.map((type) => (
            <div
              key={type.title}
              onClick={() => onSelectField(type)}
              className={`p-6 rounded-xl border transition-all cursor-pointer group h-full flex flex-col ${
                type.selected
                  ? 'border-[#2563EB] bg-white shadow-sm ring-1 ring-[#2563EB]/10'
                  : 'border-gray-100 hover:border-[#2563EB] hover:shadow-sm'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg mb-4 border ${
                  type.selected
                    ? 'border-[#2563EB]/20 bg-blue-50 text-[#2563EB]'
                    : 'border-gray-100 bg-gray-50 text-gray-400'
                }`}
              >
                {type.icon}
              </div>
              <h4 className="font-bold text-gray-900 text-sm mb-2">
                {type.title}
              </h4>
              <p className="text-[11px] text-gray-400 font-medium leading-relaxed mb-0 flex-grow">
                {type.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 text-xs font-medium max-w-lg mx-auto leading-relaxed">
            The field type defines what content can be stored. For instance, a
            text field accepts titles and descriptions, and a media field is
            used for images and videos.{' '}
            <a href="#" className="text-[#2563EB] hover:underline">
              Learn more{' '}
              <ArrowLeftOutlined className="rotate-[135deg] text-[10px] ml-1" />
            </a>
          </p>
        </div>
      </div>
    </Modal>
  );
};
