import { SimpleCreateModal } from './SimpleCreateModal';
import type { LocationField, ContentFieldConfig } from '../types';

interface LocationFieldCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onProceed: (data: LocationField) => void;
}

export function LocationFieldCreateModal({ isOpen, onClose, onBack, onProceed }: LocationFieldCreateModalProps) {
  return (
    <SimpleCreateModal
      isOpen={isOpen}
      onClose={onClose}
      onBack={onBack}
      onProceed={(data: ContentFieldConfig) => onProceed(data as LocationField)}
      fieldType="location"
      fieldTitle="Location Field"
      icon="location"
      placeholder="e.g. Office Location"
    />
  );
}
