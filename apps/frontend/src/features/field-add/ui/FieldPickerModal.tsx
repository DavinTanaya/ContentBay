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
      title={
        <span className="font-poppins font-semibold text-lg text-gray-13">
          Add New Field
        </span>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={950}
      centered
    >
      <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FieldTypeOptions.map((type) => (
            <div
              key={type.title}
              onClick={() => onSelectField(type)}
              className="p-6 rounded-2xl bg-white ring-1 ring-slate-200 transition-all duration-300 cursor-pointer group h-full flex flex-col hover:ring-blue-200 hover:shadow-[0_8px_24px_rgba(0,100,255,0.06)] hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4 bg-slate-50 text-slate-500 ring-1 ring-slate-200 transition-all duration-300 group-hover:bg-blue-50/80 group-hover:text-blue-6 group-hover:ring-blue-100">
                <RenderFieldIcon icon={type.icon} />
              </div>
              <h4 className="text-[15px] font-bold text-gray-10 mb-2">
                {type.title}
              </h4>
              <p className="text-[13px] text-gray-500 font-medium leading-relaxed grow">
                {type.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
