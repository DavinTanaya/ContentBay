import type { FC } from 'react';
import { FieldsTable, ModelMetadataSidebar } from '@entities/content-model';
import { FieldModals } from './FieldModals';
import type { ContentModel } from '@entities/content-model';
import { useContentModelField } from '../model/useContentModelField';
import { Button } from 'antd';
import { Plus } from 'lucide-react';

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
  } = useContentModelField(model);

  const fieldsData = model.fields || [];

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-6 w-full">
        <div className="relative rounded-[32px] bg-white ring-1 ring-slate-200 shadow-none md:flex-[2.5] w-full overflow-hidden hover:ring-blue-200 transition-all duration-500 hover:shadow-[0_12px_32px_rgba(0,100,255,0.06)]">
          <div className="px-8 py-6 flex items-center justify-between border-b border-slate-100">
            <div className="flex items-center gap-2">
              <h3 className="h5-semibold text-gray-10">Content Fields</h3>
            </div>
            <Button
              type="primary"
              size="middle"
              icon={<Plus size={18} />}
              onClick={handleAddFieldClick}
              className="h-11 px-6 rounded-xl shadow-sm bg-blue-600 hover:bg-blue-500 hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center font-semibold"
            >
              Add Field
            </Button>
          </div>
          <FieldsTable
            data={fieldsData}
            onEditField={handleEditField}
            onDeleteField={handleDeleteField}
          />
        </div>
        <div className="md:flex-1 w-full">
          <ModelMetadataSidebar
            totalFields={fieldsData.length}
            lastRevision="Oct 8, 2025"
          />
        </div>
      </div>

      <FieldModals
        isFieldModalVisible={isFieldModalVisible}
        setIsFieldModalVisible={setIsFieldModalVisible}
        selectedField={selectedField}
        isFieldPickerOpen={isFieldPickerOpen}
        setIsFieldPickerOpen={setIsFieldPickerOpen}
        isFieldBuilderOpen={isFieldBuilderOpen}
        setIsFieldBuilderOpen={setIsFieldBuilderOpen}
        selectedFieldType={selectedFieldType}
        isNewField={isNewField}
        handleSelectFieldType={handleSelectFieldType}
        handleBackToPicker={handleBackToPicker}
        handleEditFieldConfirm={handleEditFieldConfirm}
        handleProceedToConfigure={handleProceedToConfigure}
      />
    </div>
  );
};
