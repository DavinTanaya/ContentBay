import { SimpleCreateModal } from './SimpleCreateModal';
import type { JsonField, ContentFieldConfig } from '../types';

interface JsonFieldCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onProceed: (data: JsonField) => void;
}

export function JsonFieldCreateModal({ isOpen, onClose, onBack, onProceed }: JsonFieldCreateModalProps) {
  return (
    <SimpleCreateModal
      isOpen={isOpen}
      onClose={onClose}
      onBack={onBack}
      onProceed={(data: ContentFieldConfig) => onProceed(data as JsonField)}
      fieldType="json"
      fieldTitle="JSON Field"
      icon="json"
      placeholder="e.g. Metadata"
    />
  );
}
