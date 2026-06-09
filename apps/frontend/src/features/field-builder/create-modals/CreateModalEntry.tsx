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
  onProceed: (data: ContentFieldConfig) => void;
}

export function CreateModalEntry({ isOpen, onClose, onBack, fieldType, onProceed }: CreateModalEntryProps) {
  if (!isOpen) return null;

  const commonProps = { isOpen, onClose, onBack };

  switch (fieldType) {
    case 'text':
      return <TextFieldCreateModal {...commonProps} onProceed={(d) => onProceed(d)} />;
    case 'number':
      return <NumberFieldCreateModal {...commonProps} onProceed={(d) => onProceed(d)} />;
    case 'date':
      return <DateFieldCreateModal {...commonProps} onProceed={(d) => onProceed(d)} />;
    case 'boolean':
      return <BooleanFieldCreateModal {...commonProps} onProceed={(d) => onProceed(d)} />;
    case 'richText':
      return <RichTextFieldCreateModal {...commonProps} onProceed={(d) => onProceed(d)} />;
    case 'asset':
      return <AssetFieldCreateModal {...commonProps} onProceed={(d) => onProceed(d)} />;
    case 'location':
      return <LocationFieldCreateModal {...commonProps} onProceed={(d) => onProceed(d)} />;
    case 'json':
      return <JsonFieldCreateModal {...commonProps} onProceed={(d) => onProceed(d)} />;
    case 'reference':
      return <ReferenceFieldCreateModal {...commonProps} onProceed={(d) => onProceed(d)} />;
    default:
      return null;
  }
}
