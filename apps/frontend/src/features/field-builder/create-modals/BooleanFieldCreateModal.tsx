import { SimpleCreateModal } from './SimpleCreateModal';
import type { BooleanField, ContentFieldConfig } from '../types';

interface BooleanFieldCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onProceed: (data: BooleanField) => void;
}

export function BooleanFieldCreateModal({ isOpen, onClose, onBack, onProceed }: BooleanFieldCreateModalProps) {
  return (
    <SimpleCreateModal
      isOpen={isOpen}
      onClose={onClose}
      onBack={onBack}
      onProceed={(data: ContentFieldConfig) => onProceed(data as BooleanField)}
      fieldType="boolean"
      fieldTitle="Boolean Field"
      icon="boolean"
      placeholder="e.g. Is Featured"
    />
  );
}
