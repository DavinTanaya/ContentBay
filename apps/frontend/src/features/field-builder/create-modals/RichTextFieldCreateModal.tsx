import { SimpleCreateModal } from './SimpleCreateModal';
import type { RichTextField, ContentFieldConfig } from '../types';

interface RichTextFieldCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onProceed: (data: RichTextField) => void;
}

export function RichTextFieldCreateModal({
  isOpen,
  onClose,
  onBack,
  onProceed,
}: RichTextFieldCreateModalProps) {
  return (
    <SimpleCreateModal
      isOpen={isOpen}
      onClose={onClose}
      onBack={onBack}
      onProceed={(data: ContentFieldConfig) => onProceed(data as RichTextField)}
      fieldType="richText"
      fieldTitle="Rich Text Field"
      icon="rich-text"
      placeholder="e.g. Body Content"
    />
  );
}
