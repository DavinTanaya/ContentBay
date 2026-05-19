import { FieldEditModal } from '@/features/field-edit';
import { FieldPickerModal, FieldConfigModal } from '@/features/field-add';
import type { ContentField, FieldType } from '@entities/content-model';

interface FieldModalsProps {
  isFieldModalVisible: boolean;
  setIsFieldModalVisible: (visible: boolean) => void;
  selectedField: ContentField | null;
  isFieldPickerOpen: boolean;
  setIsFieldPickerOpen: (open: boolean) => void;
  isFieldConfigOpen: boolean;
  setIsFieldConfigOpen: (open: boolean) => void;
  selectedFieldType: FieldType | null;
  handleSelectFieldType: (type: FieldType) => void;
  handleBackToPicker: () => void;
  handleAddFieldConfirm: (data: {
    name: string;
    apiId: string;
  }) => Promise<void>;
  handleEditFieldConfirm: (
    originalApiId: string,
    updatedField: Omit<ContentField, 'id'>,
  ) => Promise<void>;
}

export function FieldModals({
  isFieldModalVisible,
  setIsFieldModalVisible,
  selectedField,
  isFieldPickerOpen,
  setIsFieldPickerOpen,
  isFieldConfigOpen,
  setIsFieldConfigOpen,
  selectedFieldType,
  handleSelectFieldType,
  handleBackToPicker,
  handleAddFieldConfirm,
  handleEditFieldConfirm,
}: FieldModalsProps) {
  return (
    <>
      <FieldEditModal
        isOpen={isFieldModalVisible}
        onClose={() => setIsFieldModalVisible(false)}
        field={selectedField}
        onConfirm={handleEditFieldConfirm}
      />

      <FieldPickerModal
        isOpen={isFieldPickerOpen}
        onClose={() => setIsFieldPickerOpen(false)}
        onSelectField={handleSelectFieldType}
      />

      <FieldConfigModal
        isOpen={isFieldConfigOpen}
        onClose={() => setIsFieldConfigOpen(false)}
        selectedFieldType={selectedFieldType as FieldType}
        onConfirm={handleAddFieldConfirm}
        onBack={handleBackToPicker}
      />
    </>
  );
}
