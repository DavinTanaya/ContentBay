import { useState } from 'react';
import { message } from 'antd';

import { useUpdateContentModelApi } from '@entities/content-model';
import type {
  ContentField,
  FieldType,
  ContentModel,
} from '@entities/content-model';

export const useContentModelField = (model: ContentModel) => {
  const [isFieldModalVisible, setIsFieldModalVisible] = useState(false);
  const [selectedField, setSelectedField] = useState<ContentField | null>(null);

  const [isFieldPickerOpen, setIsFieldPickerOpen] = useState(false);
  const [isFieldConfigOpen, setIsFieldConfigOpen] = useState(false);
  const [selectedFieldType, setSelectedFieldType] = useState<FieldType | null>(
    null,
  );

  const [updateContentModel] = useUpdateContentModelApi(model.id);

  const handleEditField = (field: ContentField) => {
    setSelectedField(field);
    setIsFieldModalVisible(true);
  };

  const handleAddFieldClick = () => {
    setIsFieldPickerOpen(true);
  };

  const handleSelectFieldType = (type: FieldType) => {
    setSelectedFieldType(type);
    setIsFieldPickerOpen(false);
    setIsFieldConfigOpen(true);
  };

  const handleBackToPicker = () => {
    setIsFieldConfigOpen(false);
    setIsFieldPickerOpen(true);
  };

  const handleAddFieldConfirm = async (data: {
    name: string;
    apiId: string;
  }) => {
    if (!selectedFieldType) return;

    const newField = {
      name: data.name,
      apiId: data.apiId,
      type: selectedFieldType.title,
      icon: selectedFieldType.icon,
      localized: false,
      required: false,
      isTitle: false,
      description: '',
      validations: undefined,
    };

    const existingFields = model.fields || [];

    const input = {
      name: model.name,
      apiId: model.apiId,
      description: model.description || '',
      icon: model.icon,
      fields: [
        ...existingFields.map((f) => ({
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
        newField,
      ],
    };

    try {
      const res = await updateContentModel({ variables: { id: model.id, input } });
      const updatedFields = res.data?.updateContentModel?.fields || [];
      const newlyAddedField = updatedFields.find((f: ContentField) => f.apiId === data.apiId);

      message.success('Field added');
      setIsFieldConfigOpen(false);

      if (newlyAddedField) {
        setSelectedField(newlyAddedField);
        setIsFieldModalVisible(true);
      }
    } catch (err) {
      console.error(err);
      message.error('Failed to add field');
    }
  };

  const handleEditFieldConfirm = async (
    originalApiId: string,
    updatedField: Omit<ContentField, 'id'>,
  ) => {
    const existingFields = model.fields || [];

    const input = {
      name: model.name,
      apiId: model.apiId,
      description: model.description || '',
      icon: model.icon,
      fields: existingFields.map((f) => {
        if (f.apiId === originalApiId) {
          return {
            name: updatedField.name,
            apiId: updatedField.apiId,
            type: updatedField.type,
            icon: updatedField.icon,
            localized: updatedField.localized || false,
            required: updatedField.required || false,
            isTitle: updatedField.isTitle || false,
            description: updatedField.description || '',
            validations: updatedField.validations ? {
              required: updatedField.validations.required,
              unique: updatedField.validations.unique,
              minCount: updatedField.validations.minCount,
              maxCount: updatedField.validations.maxCount,
              matchPattern: updatedField.validations.matchPattern,
              prohibitPattern: updatedField.validations.prohibitPattern,
              allowedValues: updatedField.validations.allowedValues,
            } : undefined,
          };
        }
        return {
          name: f.name,
          apiId: f.apiId,
          type: f.type,
          icon: f.icon,
          localized: f.localized,
          required: f.required,
          isTitle: f.isTitle,
          description: f.description || '',
          validations: f.validations ? {
            required: f.validations.required,
            unique: f.validations.unique,
            minCount: f.validations.minCount,
            maxCount: f.validations.maxCount,
            matchPattern: f.validations.matchPattern,
            prohibitPattern: f.validations.prohibitPattern,
            allowedValues: f.validations.allowedValues,
          } : undefined,
        };
      }),
    };

    try {
      await updateContentModel({ variables: { id: model.id, input } });
      message.success('Field updated successfully');
      setIsFieldModalVisible(false);
    } catch (err) {
      console.error(err);
      message.error('Failed to update field');
    }
  };

  return {
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
    handleBackToPicker,
    handleAddFieldConfirm,
    handleEditFieldConfirm,
  };
};
