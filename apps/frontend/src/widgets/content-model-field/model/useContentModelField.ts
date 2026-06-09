import { useState } from 'react';
import { message } from 'antd';

import { updateContentModelApi } from '@entities/content-model';
import type {
  ContentField,
  FieldType,
  ContentModel,
} from '@entities/content-model';
import { initializeField } from '@/features/field-builder';
import { createField, updateField } from '@/features/content-model/api';
import { getErrorMessage } from '@/shared/utils/errorHandler';

export const useContentModelField = (model: ContentModel) => {
  const [isFieldModalVisible, setIsFieldModalVisible] = useState(false);
  const [selectedField, setSelectedField] = useState<ContentField | null>(null);

  const [isFieldPickerOpen, setIsFieldPickerOpen] = useState(false);
  const [isFieldBuilderOpen, setIsFieldBuilderOpen] = useState(false);
  const [selectedFieldType, setSelectedFieldType] = useState<FieldType | null>(null);
  const [isNewField, setIsNewField] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEditField = (field: ContentField) => {
    setSelectedField(field);
    setIsNewField(false);
    setIsFieldBuilderOpen(true);
  };

  const handleAddFieldClick = () => {
    setIsFieldPickerOpen(true);
  };

  const handleSelectFieldType = (type: FieldType) => {
    setSelectedFieldType(type);
    setIsFieldPickerOpen(false);

    // Map title to internal type
    const titleMap: Record<string, string> = {
      'Rich text': 'richText',
      'Text': 'text',
      'Number': 'number',
      'Date and time': 'date',
      'Location': 'location',
      'Media': 'asset',
      'Boolean': 'boolean',
      'JSON object': 'json',
      'Reference': 'reference'
    };
    const mappedType = titleMap[type.title] || 'text';

    // Initialize with proper defaults from field-factory
    const newField = initializeField(
      mappedType,
      `new-${Date.now()}`,
      '',
      '',
      type.icon,
    );

    setSelectedField(newField);
    setIsNewField(true);
    setIsFieldBuilderOpen(true);
  };

  const handleBackToPicker = () => {
    setIsFieldBuilderOpen(false);
    setIsFieldPickerOpen(true);
  };

  const handleEditFieldConfirm = async (
    originalApiId: string,
    updatedField: Omit<ContentField, 'id'>,
  ) => {
    const existingFields = model.fields || [];
    const isNew = !existingFields.find((f) => f.apiId === originalApiId);

    setIsLoading(true);
    try {
      if (isNew) {
        await createField({
          model,
          newField: updatedField,
        });
      } else {
        await updateField({
          model,
          originalApiId,
          updatedField,
        });
      }
      message.success(
        isNew ? 'Field added successfully' : 'Field updated successfully',
      );
      setIsFieldModalVisible(false);
      setSelectedField(null);
      setIsNewField(false);
    } catch (err: unknown) {
      console.error(err);
      message.error(
        getErrorMessage(
          err,
          isNew ? 'Failed to add field' : 'Failed to update field',
        ),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isFieldModalVisible,
    setIsFieldModalVisible,
    selectedField,
    isFieldPickerOpen,
    setIsFieldPickerOpen,
    isFieldBuilderOpen,
    setIsFieldBuilderOpen,
    selectedFieldType,
    isNewField,
    handleEditField,
    handleAddFieldClick,
    handleSelectFieldType,
    handleBackToPicker,
    handleEditFieldConfirm,
  };
};
