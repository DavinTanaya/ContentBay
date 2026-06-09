import { SimpleCreateModal } from './SimpleCreateModal';
import type { DateField, ContentFieldConfig } from '../types';

interface DateFieldCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onConfirm: (data: DateField) => void;
}

export function DateFieldCreateModal({ isOpen, onClose, onBack, onConfirm }: DateFieldCreateModalProps) {
  return (
    <SimpleCreateModal
      isOpen={isOpen}
      onClose={onClose}
      onBack={onBack}
      onConfirm={(data: ContentFieldConfig) => onConfirm(data as DateField)}
      fieldType="date"
      fieldTitle="Date Field"
      icon="calendar"
      placeholder="e.g. Publish Date"
    />
  );
}
