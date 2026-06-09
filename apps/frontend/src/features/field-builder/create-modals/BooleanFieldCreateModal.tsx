import { SimpleCreateModal } from './SimpleCreateModal';
import type { BooleanField, ContentFieldConfig } from '../types';

interface BooleanFieldCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onConfirm: (data: BooleanField) => void;
}

export function BooleanFieldCreateModal({ isOpen, onClose, onBack, onConfirm }: BooleanFieldCreateModalProps) {
  return (
    <SimpleCreateModal
      isOpen={isOpen}
      onClose={onClose}
      onBack={onBack}
      onConfirm={(data: ContentFieldConfig) => onConfirm(data as BooleanField)}
      fieldType="boolean"
      fieldTitle="Boolean Field"
      icon="boolean"
      placeholder="e.g. Is Featured"
    />
  );
}
