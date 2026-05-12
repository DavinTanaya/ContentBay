import type { FC } from 'react';
import { Modal, Button, Input, Checkbox } from 'antd';
import { EditOutlined, CloseOutlined } from '@ant-design/icons';
import type { ContentField } from '../../content-model.type';

interface FieldEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  field: ContentField | null;
}

export const FieldEditModal: FC<FieldEditModalProps> = ({
  isOpen,
  onClose,
  field,
}) => {
  if (!field) return null;

  return (
    <Modal
      title={
        <div className="flex items-center gap-4 pt-4 pb-2 px-6">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
            <EditOutlined className="text-xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            {field.name}
          </h2>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={800}
      className="professional-edit-modal"
      centered
      closeIcon={<CloseOutlined className="text-gray-400 text-lg mt-6 mr-6" />}
    >
      <div className="px-12 py-8 space-y-12">
        {/* Section 1 */}
        <div>
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-8">
            NAME AND FIELD ID
          </h3>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="block text-[11px] font-bold text-gray-400 mb-2 uppercase">
                Name
              </label>
              <Input
                defaultValue={field.name}
                placeholder="example"
                className="h-11 rounded-lg border-gray-200"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-400 mb-2 uppercase">
                Field ID
              </label>
              <Input
                defaultValue={field.apiId || field.name?.toLowerCase()}
                placeholder="example"
                className="h-11 rounded-lg border-gray-200"
              />
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div>
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-8">
            SETTINGS
          </h3>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Checkbox className="mt-1" defaultChecked={field.isTitle} />
              <div>
                <p className="text-sm font-bold text-gray-800">
                  Use as entry title
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  The value of this field will be used as the label for entries
                  in lists
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Checkbox className="mt-1" defaultChecked={field.localized} />
              <div>
                <p className="text-sm font-bold text-gray-800">
                  Enable localization
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  All the content can be translated to multiple locales
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div>
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-10">
            VALIDATION
          </h3>
          <div className="grid grid-cols-2 gap-6">
            {[
              {
                label: 'Required Field',
                desc: 'Cannot be empty when publishing',
                checked: field.required,
              },
              {
                label: 'Unique field',
                desc: "You won't be able to publish an entry if there is an existing entry with identical content",
                checked: true,
              },
              {
                label: 'Limit character count',
                desc: 'Specify a minimum and/or maximum allowed number of characters',
                checked: false,
              },
              {
                label: 'Match a specific pattern',
                desc: 'Make this field match a pattern: e-mail address, URI, or a custom regular expression',
                checked: false,
              },
              {
                label: 'Prohibit a specific pattern',
                desc: 'Make this field invalid when a pattern is matched: custom regular expression (e.g. bad word list)',
                checked: true,
              },
              {
                label: 'Accept only specified values',
                desc: "You won't be able to publish an entry if the field value is not in the list of specified values",
                checked: false,
              },
            ].map((val, i) => (
              <div
                key={i}
                className="p-8 rounded-[32px] border border-gray-100 bg-white shadow-sm flex items-start gap-5"
              >
                <Checkbox className="mt-1" defaultChecked={val.checked} />
                <div>
                  <p className="text-[13px] font-bold text-gray-900 mb-2">
                    {val.label}
                  </p>
                  <p className="text-[11px] text-gray-400 leading-relaxed font-medium">
                    {val.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 pb-4">
          <Button
            className="h-12 px-8 rounded-xl font-bold border-gray-200 text-gray-500"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            className="h-12 px-10 rounded-xl font-bold bg-[#2563EB] border-none shadow-lg shadow-blue-600/20"
            onClick={onClose}
          >
            Confirm Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
};
