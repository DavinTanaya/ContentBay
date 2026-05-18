import { useState } from 'react';
import type { ContentField, FieldType } from '@entities/content-model';

export const useContentModelField = () => {
  const [isFieldModalVisible, setIsFieldModalVisible] = useState(false);
  const [selectedField, setSelectedField] = useState<ContentField | null>(null);

  const [isFieldPickerOpen, setIsFieldPickerOpen] = useState(false);
  const [isFieldConfigOpen, setIsFieldConfigOpen] = useState(false);
  const [selectedFieldType, setSelectedFieldType] = useState<FieldType | null>(
    null,
  );

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
  };
};
