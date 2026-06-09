import { SimpleCreateModal } from './SimpleCreateModal';
import type { DateField, ContentFieldConfig } from '../types';

interface DateFieldCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onProceed: (data: DateField) => void;
}

export function DateFieldCreateModal({ isOpen, onClose, onBack, onProceed }: DateFieldCreateModalProps) {
  return (
    <SimpleCreateModal
      isOpen={isOpen}
      onClose={onClose}
      onBack={onBack}
      onProceed={(data: ContentFieldConfig) => onProceed(data as DateField)}
      fieldType="date"
      fieldTitle="Date Field"
      icon="calendar"
      placeholder="e.g. Publish Date"
    />
  );
}
