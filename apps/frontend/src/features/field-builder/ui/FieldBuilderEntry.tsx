import type { ContentFieldConfig, TextField, NumberField, DateField, BooleanField, JsonField, LocationField, AssetField, ReferenceField, RichTextField } from '@/entities/content-model';
import { TextFieldModal } from '../modals/TextFieldModal';
import { NumberFieldModal } from '../modals/NumberFieldModal';
import { DateFieldModal } from '../modals/DateFieldModal';
import { BooleanFieldModal } from '../modals/BooleanFieldModal';
import { JsonFieldModal } from '../modals/JsonFieldModal';
import { LocationFieldModal } from '../modals/LocationFieldModal';
import { AssetFieldModal } from '../modals/AssetFieldModal';
import { ReferenceFieldModal } from '../modals/ReferenceFieldModal';
import { RichTextFieldModal } from '../modals/RichTextFieldModal';
import { Modal } from 'antd';

interface FieldBuilderEntryProps {
  isOpen: boolean;
  onClose: () => void;
  fieldConfig: ContentFieldConfig | null;
  onConfirm: (data: ContentFieldConfig) => void;
}

export function FieldBuilderEntry({ isOpen, onClose, fieldConfig, onConfirm }: FieldBuilderEntryProps) {
  if (!fieldConfig || !isOpen) return null;

  switch (fieldConfig.type) {
    case 'text':
      return (
        <TextFieldModal
          isOpen={isOpen}
          onClose={onClose}
          initialData={fieldConfig as TextField}
          onConfirm={(data: TextField) => onConfirm(data as ContentFieldConfig)}
        />
      );
    case 'number':
      return (
        <NumberFieldModal
          isOpen={isOpen}
          onClose={onClose}
          initialData={fieldConfig as NumberField}
          onConfirm={(data: NumberField) => onConfirm(data as ContentFieldConfig)}
        />
      );
    case 'date':
      return (
        <DateFieldModal
          isOpen={isOpen}
          onClose={onClose}
          initialData={fieldConfig as DateField}
          onConfirm={(data: DateField) => onConfirm(data as ContentFieldConfig)}
        />
      );
    case 'boolean':
      return (
        <BooleanFieldModal
          isOpen={isOpen}
          onClose={onClose}
          initialData={fieldConfig as BooleanField}
          onConfirm={(data: BooleanField) => onConfirm(data as ContentFieldConfig)}
        />
      );
    case 'json':
      return (
        <JsonFieldModal
          isOpen={isOpen}
          onClose={onClose}
          initialData={fieldConfig as JsonField}
          onConfirm={(data: JsonField) => onConfirm(data as ContentFieldConfig)}
        />
      );
    // Add other modals here: 'number', 'richText', etc.
    case 'location':
      return (
        <LocationFieldModal
          isOpen={isOpen}
          onClose={onClose}
          initialData={fieldConfig as LocationField}
          onConfirm={(data: LocationField) => onConfirm(data as ContentFieldConfig)}
        />
      );
    case 'asset':
      return (
        <AssetFieldModal
          isOpen={isOpen}
          onClose={onClose}
          initialData={fieldConfig as AssetField}
          onConfirm={(data: AssetField) => onConfirm(data as ContentFieldConfig)}
        />
      );
    case 'reference':
      return (
        <ReferenceFieldModal
          isOpen={isOpen}
          onClose={onClose}
          initialData={fieldConfig as ReferenceField}
          onConfirm={(data: ReferenceField) => onConfirm(data as ContentFieldConfig)}
        />
      );
    case 'richText':
      return (
        <RichTextFieldModal
          isOpen={isOpen}
          onClose={onClose}
          initialData={fieldConfig as RichTextField}
          onConfirm={(data: RichTextField) => onConfirm(data as ContentFieldConfig)}
        />
      );
    default:
      // Fallback
      return (
        <Modal open={isOpen} onCancel={onClose} footer={null}>
          <div className="p-4 text-center">
            <h3 className="text-lg font-bold">Unsupported Field Type</h3>
            <p className="text-gray-500">The builder for {(fieldConfig as any).type} is not implemented yet.</p>
          </div>
        </Modal>
      );
  }
}
