import type { ContentFieldConfig, TextField, NumberField, DateField, BooleanField, RichTextField, AssetField, LocationField, JsonField, ReferenceField } from '../types';
import { TextFieldEditModal } from './TextFieldEditModal';
import { NumberFieldEditModal } from './NumberFieldEditModal';
import { DateFieldEditModal } from './DateFieldEditModal';
import { BooleanFieldEditModal } from './BooleanFieldEditModal';
import { RichTextFieldEditModal } from './RichTextFieldEditModal';
import { AssetFieldEditModal } from './AssetFieldEditModal';
import { LocationFieldEditModal } from './LocationFieldEditModal';
import { JsonFieldEditModal } from './JsonFieldEditModal';
import { ReferenceFieldEditModal } from './ReferenceFieldEditModal';
import { Modal } from 'antd';

interface EditModalEntryProps {
  isOpen: boolean;
  onClose: () => void;
  fieldData: ContentFieldConfig;
  onConfirm: (data: ContentFieldConfig) => void;
}

function normalizeFieldType(type: string): string {
  const t = (type || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  if (t === 'richtext' || t === 'richtextfield') return 'richText';
  if (t === 'shorttext' || t === 'longtext' || t === 'string') return 'text';
  if (t === 'media') return 'asset';
  return type;
}

export function EditModalEntry({ isOpen, onClose, fieldData, onConfirm }: EditModalEntryProps) {
  if (!isOpen || !fieldData) return null;

  const commonProps = { isOpen, onClose };
  const normalizedType = normalizeFieldType(fieldData.type);

  switch (normalizedType) {
    case 'text':
      return <TextFieldEditModal {...commonProps} initialData={fieldData as TextField} onConfirm={(d) => onConfirm(d)} />;
    case 'number':
      return <NumberFieldEditModal {...commonProps} initialData={fieldData as NumberField} onConfirm={(d) => onConfirm(d)} />;
    case 'date':
      return <DateFieldEditModal {...commonProps} initialData={fieldData as DateField} onConfirm={(d) => onConfirm(d)} />;
    case 'boolean':
      return <BooleanFieldEditModal {...commonProps} initialData={fieldData as BooleanField} onConfirm={(d) => onConfirm(d)} />;
    case 'richText':
      return <RichTextFieldEditModal {...commonProps} initialData={fieldData as RichTextField} onConfirm={(d) => onConfirm(d)} />;
    case 'asset':
      return <AssetFieldEditModal {...commonProps} initialData={fieldData as AssetField} onConfirm={(d) => onConfirm(d)} />;
    case 'location':
      return <LocationFieldEditModal {...commonProps} initialData={fieldData as LocationField} onConfirm={(d) => onConfirm(d)} />;
    case 'json':
      return <JsonFieldEditModal {...commonProps} initialData={fieldData as JsonField} onConfirm={(d) => onConfirm(d)} />;
    case 'reference':
      return <ReferenceFieldEditModal {...commonProps} initialData={fieldData as ReferenceField} onConfirm={(d) => onConfirm(d)} />;
    default:
      return (
        <Modal open={isOpen} onCancel={onClose} footer={null}>
          <div className="p-4 text-center">
            <h3 className="text-lg font-bold">Unsupported Field Type</h3>
            <p className="text-gray-500">The editor for {(fieldData as any).type} is not implemented yet.</p>
          </div>
        </Modal>
      );
  }
}
