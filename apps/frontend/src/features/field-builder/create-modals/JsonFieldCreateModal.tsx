import { SimpleCreateModal } from './SimpleCreateModal';
import type { JsonField, ContentFieldConfig } from '../types';

interface JsonFieldCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onConfirm: (data: JsonField) => void;
}

export function JsonFieldCreateModal({ isOpen, onClose, onBack, onConfirm }: JsonFieldCreateModalProps) {
  return (
    <SimpleCreateModal
      isOpen={isOpen}
      onClose={onClose}
      onBack={onBack}
      onConfirm={(data: ContentFieldConfig) => onConfirm(data as JsonField)}
      fieldType="json"
      fieldTitle="JSON Field"
      icon="json"
      placeholder="e.g. Metadata"
    />
  );
}
