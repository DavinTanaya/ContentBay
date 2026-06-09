import { SimpleCreateModal } from './SimpleCreateModal';
import type { LocationField, ContentFieldConfig } from '../types';

interface LocationFieldCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onConfirm: (data: LocationField) => void;
}

export function LocationFieldCreateModal({ isOpen, onClose, onBack, onConfirm }: LocationFieldCreateModalProps) {
  return (
    <SimpleCreateModal
      isOpen={isOpen}
      onClose={onClose}
      onBack={onBack}
      onConfirm={(data: ContentFieldConfig) => onConfirm(data as LocationField)}
      fieldType="location"
      fieldTitle="Location Field"
      icon="location"
      placeholder="e.g. Office Location"
    />
  );
}
