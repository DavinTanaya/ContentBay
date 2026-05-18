import type { FC } from 'react';
import {
  FieldsTable,
  ModelMetadataSidebar,
  GET_CONTENT_MODEL,
  UPDATE_CONTENT_MODEL,
} from '@entities/content-model';
import { FieldEditModal } from '@/features/edit-field';
import { FieldPickerModal, FieldConfigModal } from '@/features/field-add';
import type {
  ContentField,
  ContentModel,
  FieldType,
} from '@entities/content-model';
import { useContentModelField } from '../model/useContentModelField';
import { useMutation } from '@apollo/client/react';
import { message } from 'antd';

interface ContentModelFieldProps {
  model: ContentModel;
}

export const ContentModelField: FC<ContentModelFieldProps> = ({ model }) => {
  const {
    isFieldModalVisible,
    setIsFieldModalVisible,
    selectedField,
    isFieldPickerOpen,
    setIsFieldPickerOpen,
    isFieldConfigOpen,
    setIsFieldConfigOpen,
    selectedFieldType,
    handleEditField,
    handleAddFieldClick,
    handleSelectFieldType,
  } = useContentModelField();

  const [updateContentModel] = useMutation(UPDATE_CONTENT_MODEL, {
    refetchQueries: [{ query: GET_CONTENT_MODEL, variables: { id: model.id } }],
    awaitRefetchQueries: true,
  });

  const handleAddFieldConfirm = async (data: {
    name: string;
    apiId: string;
  }) => {
    if (!selectedFieldType) return;

    const newField = {
      name: data.name,
      apiId: data.apiId,
      type: (selectedFieldType as FieldType).title,
      icon: (selectedFieldType as FieldType).icon,
      localized: false,
      required: false,
      isTitle: false,
      description: '',
      validations: null,
    } as unknown as ContentField;

    const existingFields = model.fields || [];

    const input = {
      name: model.name,
      apiId: model.apiId,
      description: model.description || '',
      icon: model.icon,
      fields: existingFields.map((f) => ({
        name: f.name,
        apiId: f.apiId,
        type: f.type,
        icon: f.icon,
        localized: f.localized,
        required: f.required,
        isTitle: f.isTitle,
        description: f.description,
        validations: f.validations,
      })),
    } as any;

    input.fields.push(newField);

    try {
      await updateContentModel({ variables: { id: model.id, input } });
      message.success('Field added');
      setIsFieldConfigOpen(false);
    } catch (err) {
      console.error(err);
      message.error('Failed to add field');
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-8 max-w-[1400px]">
        <div className="md:flex-[2.5] w-full">
          <FieldsTable
            data={model.fields || []}
            onEditField={handleEditField}
            onAddNewField={handleAddFieldClick}
          />
        </div>
        <div className="md:flex-1 w-full">
          <ModelMetadataSidebar
            totalFields={model.fields?.length || 0}
            lastRevision="Oct 8, 2025"
            status="LIVE"
          />
        </div>
      </div>

      <FieldEditModal
        isOpen={isFieldModalVisible}
        onClose={() => setIsFieldModalVisible(false)}
        field={selectedField}
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
      />
    </div>
  );
};
