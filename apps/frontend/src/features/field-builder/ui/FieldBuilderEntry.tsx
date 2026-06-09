import type { ContentFieldConfig } from '@/entities/content-model';
import { CreateModalEntry } from '../create-modals/CreateModalEntry';
import { EditModalEntry } from '../edit-modals/EditModalEntry';

interface FieldBuilderEntryProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  fieldConfig: ContentFieldConfig | null;
  onConfirm: (data: ContentFieldConfig) => void;
  isNewField?: boolean;
}

export function FieldBuilderEntry({ isOpen, onClose, onBack, fieldConfig, onConfirm, isNewField = false }: FieldBuilderEntryProps) {
  if (!fieldConfig || !isOpen) return null;

  // New field → show Create modal (lightweight, immutable settings)
  if (isNewField) {
    return (
      <CreateModalEntry
        isOpen={isOpen}
        onClose={onClose}
        onBack={onBack}
        fieldType={fieldConfig.type}
        onConfirm={onConfirm}
      />
    );
  }

  // Existing field → show Edit modal (full configuration)
  return (
    <EditModalEntry
      isOpen={isOpen}
      onClose={onClose}
      fieldData={fieldConfig}
      onConfirm={onConfirm}
    />
  );
}
