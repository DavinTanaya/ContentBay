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

    // Don't call API yet. Just prepare local object and show detail modal.
    const tempNewField: ContentField = {
      id: `new-${Date.now()}`, // temporary ID
      name: data.name,
      apiId: data.apiId,
      type: selectedFieldType.title,
      icon: selectedFieldType.icon,
      localized: false,
      required: false,
      isTitle: false,
      description: '',
      validations: { required: false, unique: false },
    };

    setSelectedField(tempNewField);
    setIsFieldConfigOpen(false);
    setIsFieldModalVisible(true);
    setSelectedFieldType(null);
  };

  const handleEditFieldConfirm = async (
    originalApiId: string,
    updatedField: Omit<ContentField, 'id'>,
  ) => {
    const existingFields = model.fields || [];
    
    // Check if we are adding a totally new field OR editing an existing one
    const isNewField = !existingFields.find(f => f.apiId === originalApiId);

    const sanitizeField = (f: any) => ({
      name: f.name,
      apiId: f.apiId,
      type: f.type,
      icon: f.icon || 'text',
      localized: f.localized || false,
      required: f.required || false,
      isTitle: f.isTitle || false,
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
    });

    let newFieldsArray;
    if (isNewField) {
      newFieldsArray = [
        ...existingFields.map(sanitizeField),
        sanitizeField(updatedField)
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

    try {
      await updateContentModel({ variables: { id: model.id, input } });
      message.success(isNewField ? 'Field added successfully' : 'Field updated successfully');
      setIsFieldModalVisible(false);
      setSelectedField(null);
    } catch (err) {
      console.error(err);
      message.error(isNewField ? 'Failed to add field' : 'Failed to update field');
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
