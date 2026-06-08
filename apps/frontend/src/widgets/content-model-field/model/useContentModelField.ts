import { useState } from 'react';
import { message } from 'antd';

import { updateContentModelApi } from '@entities/content-model';
import type {
  ContentField,
  FieldType,
  ContentModel,
  FieldIcon,
} from '@entities/content-model';
import { getErrorMessage } from '@/shared/utils/errorHandler';

// Using Omit<ContentFieldConfig, 'id'> directly

export const useContentModelField = (model: ContentModel) => {
  const [isFieldModalVisible, setIsFieldModalVisible] = useState(false);
  const [selectedField, setSelectedField] = useState<ContentField | null>(null);

  const [isFieldPickerOpen, setIsFieldPickerOpen] = useState(false);
  const [isFieldBuilderOpen, setIsFieldBuilderOpen] = useState(false);
  const [selectedFieldType, setSelectedFieldType] = useState<FieldType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleEditField = (field: ContentField) => {
    setSelectedField(field);
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

    // Initialize the default schema for this field type using the factory
    // Note: We need to import initializeField from field-builder
    // For now we just mock the initial call, it will be handled by the dispatcher
    const tempNewField = {
      id: `new-${Date.now()}`,
      name: '',
      apiId: '',
      type: mappedType,
      icon: type.icon,
      localized: false,
      required: false,
      isTitle: false,
    } as unknown as ContentField;

    setSelectedField(tempNewField);
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
    const isNewField = !existingFields.find((f) => f.apiId === originalApiId);

    const sanitizeField = (
      f: ContentField | Omit<ContentField, 'id'>,
    ): Omit<ContentField, 'id'> => {
      // Just strip out the 'id' and pass the rest since we have flexible types now
      const { id, ...rest } = f as ContentField;
      return {
        ...rest,
        validations: f.validations as any,
      };
    };

    let newFieldsArray: Omit<ContentField, 'id'>[];
    if (isNewField) {
      newFieldsArray = [
        ...existingFields.map(sanitizeField),
        sanitizeField(updatedField),
      ];
    } else {
      newFieldsArray = existingFields.map((f) => {
        if (f.apiId === originalApiId) {
          return sanitizeField(updatedField);
        }
        return sanitizeField(f);
      });
    }

    const input = {
      name: model.name,
      apiId: model.apiId,
      description: model.description || '',
      icon: model.icon,
      fields: newFieldsArray,
    };

    setIsLoading(true);
    try {
      await updateContentModelApi(model.id, input);
      message.success(
        isNewField ? 'Field added successfully' : 'Field updated successfully',
      );
      setIsFieldModalVisible(false);
      setSelectedField(null);
    } catch (err: unknown) {
      console.error(err);
      message.error(
        getErrorMessage(
          err,
          isNewField ? 'Failed to add field' : 'Failed to update field',
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
    handleEditField,
    handleAddFieldClick,
    handleSelectFieldType,
    handleBackToPicker,
    handleEditFieldConfirm,
  };
};
