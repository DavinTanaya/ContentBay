import type { FC } from 'react';
import { FieldsTable, ModelMetadataSidebar } from '@entities/content-model';
import { FieldModals } from './FieldModals';
import { colors } from '@/shared/constants/colors';
import type { ContentModel } from '@entities/content-model';
import { useContentModelField } from '../model/useContentModelField';
import { Badge, Button } from 'antd';
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
  } = useContentModelField(model);

  const fieldsData = model.fields || [];

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-8 max-w-[1400px]">
        <div className="bg-white md:flex-[2.5] w-full rounded-2xl border border-gray-4 shadow-sm overflow-hidden">
          <div className="px-6 py-5 flex items-center justify-between border-b border-gray-4">
            <div className="flex items-center gap-2">
              <h3 className="h5-semibold text-gray-10">Content Fields</h3>
              <Badge
                count={fieldsData.length}
                color={colors.gray[4]}
                style={{ color: colors.gray[9] }}
              />
            </div>
            <Button
              variant="filled"
              color="geekblue"
              icon={<Plus size={16} />}
              onClick={handleAddFieldClick}
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
            status="LIVE"
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
      />
    </div>
  );
};
