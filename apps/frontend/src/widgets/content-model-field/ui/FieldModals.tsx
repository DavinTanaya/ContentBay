import { FieldPickerModal } from '@/features/field-add';
import { FieldBuilderEntry } from '@/features/field-builder';
import type { ContentField, ContentFieldConfig, FieldType } from '@entities/content-model';

interface FieldModalsProps {
  isFieldModalVisible?: boolean;
  setIsFieldModalVisible?: (visible: boolean) => void;
  selectedField: ContentField | null;
  isFieldPickerOpen: boolean;
  setIsFieldPickerOpen: (open: boolean) => void;
  isFieldBuilderOpen: boolean;
  setIsFieldBuilderOpen: (open: boolean) => void;
  selectedFieldType: FieldType | null;
  isNewField: boolean;
  handleSelectFieldType: (type: FieldType) => void;
  handleBackToPicker: () => void;
  handleEditFieldConfirm: (
    originalApiId: string,
    updatedField: Omit<ContentField, 'id'>,
  ) => Promise<void>;
}

export function FieldModals({
  selectedField,
  isFieldPickerOpen,
  setIsFieldPickerOpen,
  isFieldBuilderOpen,
  setIsFieldBuilderOpen,
  isNewField,
  handleSelectFieldType,
  handleBackToPicker,
  handleEditFieldConfirm,
}: FieldModalsProps) {
  return (
    <>
      <FieldBuilderEntry
        isOpen={isFieldBuilderOpen}
        onClose={() => setIsFieldBuilderOpen(false)}
        onBack={handleBackToPicker}
        fieldConfig={selectedField as ContentFieldConfig | null}
        isNewField={isNewField}
        onConfirm={async (data) => {
          if (selectedField) {
            await handleEditFieldConfirm(selectedField.apiId, data);
            setIsFieldBuilderOpen(false);
          }
        }}
      />

      <FieldPickerModal
        isOpen={isFieldPickerOpen}
        onClose={() => setIsFieldPickerOpen(false)}
        onSelectField={handleSelectFieldType}
      />
    </>
  );
}
