import { useState } from 'react';
import { message } from 'antd';

import type {
  ContentField,
  FieldType,
  ContentModel,
} from '@entities/content-model';
import { initializeField } from '@/features/field-builder';
import {
  createField,
  updateField,
  deleteField,
} from '@/features/content-model/api';
import { getErrorMessage } from '@/shared/utils/errorHandler';

export const useContentModelField = (model: ContentModel) => {
  const [isFieldModalVisible, setIsFieldModalVisible] = useState(false);
  const [selectedField, setSelectedField] = useState<ContentField | null>(null);

  const [isFieldPickerOpen, setIsFieldPickerOpen] = useState(false);
  const [isFieldBuilderOpen, setIsFieldBuilderOpen] = useState(false);
  const [selectedFieldType, setSelectedFieldType] = useState<FieldType | null>(
    null,
  );
  const [isNewField, setIsNewField] = useState(false);

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
      Text: 'text',
      Number: 'number',
      'Date and time': 'date',
      Location: 'location',
      Media: 'asset',
      Boolean: 'boolean',
      'JSON object': 'json',
      Reference: 'reference',
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

    const hide = message.loading(
      isNew ? 'Adding field...' : 'Updating field...',
      0,
    );

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
      hide();
      message.success(
        isNew ? 'Field added successfully' : 'Field updated successfully',
      );
      setIsFieldModalVisible(false);
      setSelectedField(null);
      setIsNewField(false);
    } catch (err: unknown) {
      hide();
      console.error(err);
      message.error(
        getErrorMessage(
          err,
          isNew ? 'Failed to add field' : 'Failed to update field',
        ),
      );
    }
  };

  const handleDeleteField = async (fieldApiId: string) => {
    try {
      await deleteField({
        model,
        fieldApiId,
      });
      message.success('Field deleted successfully');
    } catch (err: unknown) {
      console.error(err);
      message.error(getErrorMessage(err, 'Failed to delete field'));
    }
  };

  const handleProceedToConfigure = (field: ContentField) => {
    setSelectedField(field);
    setIsNewField(false);
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
    handleDeleteField,
    handleProceedToConfigure,
  };
};
