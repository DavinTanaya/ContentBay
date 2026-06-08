import { useState, useEffect } from 'react';
import { FieldModalLayout } from '../ui/FieldModalLayout';
import type { RichTextField } from '@/entities/content-model';
import { Switch, Input, Checkbox } from 'antd';

interface RichTextFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: RichTextField;
  onConfirm: (data: RichTextField) => void;
}

export function RichTextFieldModal({ isOpen, onClose, initialData, onConfirm }: RichTextFieldModalProps) {
  const [data, setData] = useState<RichTextField>(initialData);

  useEffect(() => {
    if (isOpen) setData(initialData);
  }, [isOpen, initialData]);

  const handleConfirm = () => {
    onConfirm(data);
  };

  const updateData = (updates: Partial<RichTextField>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const updateEditorOptions = (updates: Partial<RichTextField['editorOptions']>) => {
    setData((prev) => ({
      ...prev,
      editorOptions: { ...(prev.editorOptions as any), ...updates },
    }));
  };

  const updateValidations = (updates: Partial<RichTextField['validations']>) => {
    setData((prev) => ({
      ...prev,
      validations: { ...(prev.validations as any), ...updates },
    }));
  };

  return (
    <FieldModalLayout
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title={data.name || 'New Rich Text Field'}
      fieldTypeLabel="Rich Text Field"
    >
      {(activeTab) => (
        <div className="flex flex-col gap-6 font-poppins">
          {activeTab === 'settings' && (
            <>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Identity</h3>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                    <Input
                      value={data.name}
                      onChange={(e) => {
                        const name = e.target.value;
                        const apiId = name.toLowerCase().replace(/[^a-z0-9]/g, '').trim();
                        updateData({ name, apiId });
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Field ID</label>
                    <Input
                      value={data.apiId}
                      onChange={(e) => updateData({ apiId: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'validation' && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Validation</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Required field</h4>
                    <p className="text-xs text-gray-500">Make this field required for editors.</p>
                  </div>
                  <Switch
                    checked={data.validations?.required}
                    onChange={(c) => updateValidations({ required: c })}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Editor Toolbar Options</h3>
              <p className="text-sm text-gray-600 mb-4">Choose which formatting options are available to editors.</p>
              <div className="grid grid-cols-2 gap-4">
                <Checkbox
                  checked={data.editorOptions?.bold}
                  onChange={(e) => updateEditorOptions({ bold: e.target.checked })}
                >
                  Bold
                </Checkbox>
                <Checkbox
                  checked={data.editorOptions?.italic}
                  onChange={(e) => updateEditorOptions({ italic: e.target.checked })}
                >
                  Italic
                </Checkbox>
                <Checkbox
                  checked={data.editorOptions?.underline}
                  onChange={(e) => updateEditorOptions({ underline: e.target.checked })}
                >
                  Underline
                </Checkbox>
                <Checkbox
                  checked={data.editorOptions?.unorderedList}
                  onChange={(e) => updateEditorOptions({ unorderedList: e.target.checked })}
                >
                  Unordered List
                </Checkbox>
                <Checkbox
                  checked={data.editorOptions?.orderedList}
                  onChange={(e) => updateEditorOptions({ orderedList: e.target.checked })}
                >
                  Ordered List
                </Checkbox>
                <Checkbox
                  checked={data.editorOptions?.blockquote}
                  onChange={(e) => updateEditorOptions({ blockquote: e.target.checked })}
                >
                  Blockquote
                </Checkbox>
              </div>
            </div>
          )}
        </div>
      )}
    </FieldModalLayout>
  );
}
