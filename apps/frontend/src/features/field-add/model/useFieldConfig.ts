import { useState } from 'react';
import type { FieldType } from '@entities/content-model';

export const useFieldConfig = (
  selectedFieldType: FieldType | null,
  onConfirm: (data: { name: string; apiId: string }) => void,
) => {
  const [name, setName] = useState('');
  const [apiId, setApiId] = useState('');

  const [configStep, setConfigStep] = useState(1);
  const [configSubTab, setConfigSubTab] = useState('name');

  const [prevFieldType, setPrevFieldType] = useState<FieldType | null>(null);

  if (selectedFieldType !== prevFieldType) {
    setPrevFieldType(selectedFieldType);
    if (selectedFieldType) {
      setName(selectedFieldType.title);
      setApiId(selectedFieldType.title.toLowerCase().replace(/\s+/g, ''));
      setConfigStep(1);
      setConfigSubTab('name');
    }
  }

  const handleNameChange = (newName: string) => {
    setName(newName);
    setApiId(
      newName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, ' ')
        .trim()
        .replace(/\s+/g, ''),
    );
  };

  const handleConfirm = () => {
    onConfirm({ name, apiId });
  };

  return {
    name,
    apiId,
    setApiId,
    configStep,
    setConfigStep,
    configSubTab,
    setConfigSubTab,
    handleNameChange,
    handleConfirm,
  };
};
