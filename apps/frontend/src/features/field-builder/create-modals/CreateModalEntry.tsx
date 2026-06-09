import type { ContentFieldConfig } from '../types';
import { TextFieldCreateModal } from './TextFieldCreateModal';
import { NumberFieldCreateModal } from './NumberFieldCreateModal';
import { DateFieldCreateModal } from './DateFieldCreateModal';
import { BooleanFieldCreateModal } from './BooleanFieldCreateModal';
import { RichTextFieldCreateModal } from './RichTextFieldCreateModal';
import { AssetFieldCreateModal } from './AssetFieldCreateModal';
import { LocationFieldCreateModal } from './LocationFieldCreateModal';
import { JsonFieldCreateModal } from './JsonFieldCreateModal';
import { ReferenceFieldCreateModal } from './ReferenceFieldCreateModal';

interface CreateModalEntryProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  fieldType: string;
  onConfirm: (data: ContentFieldConfig) => void;
}

export function CreateModalEntry({ isOpen, onClose, onBack, fieldType, onConfirm }: CreateModalEntryProps) {
  if (!isOpen) return null;

  const commonProps = { isOpen, onClose, onBack };

  switch (fieldType) {
    case 'text':
      return <TextFieldCreateModal {...commonProps} onConfirm={(d) => onConfirm(d)} />;
    case 'number':
      return <NumberFieldCreateModal {...commonProps} onConfirm={(d) => onConfirm(d)} />;
    case 'date':
      return <DateFieldCreateModal {...commonProps} onConfirm={(d) => onConfirm(d)} />;
    case 'boolean':
      return <BooleanFieldCreateModal {...commonProps} onConfirm={(d) => onConfirm(d)} />;
    case 'richText':
      return <RichTextFieldCreateModal {...commonProps} onConfirm={(d) => onConfirm(d)} />;
    case 'asset':
      return <AssetFieldCreateModal {...commonProps} onConfirm={(d) => onConfirm(d)} />;
    case 'location':
      return <LocationFieldCreateModal {...commonProps} onConfirm={(d) => onConfirm(d)} />;
    case 'json':
      return <JsonFieldCreateModal {...commonProps} onConfirm={(d) => onConfirm(d)} />;
    case 'reference':
      return <ReferenceFieldCreateModal {...commonProps} onConfirm={(d) => onConfirm(d)} />;
    default:
      return null;
  }
}
