import { Input } from 'antd';
import { ValidationItem } from '../shared/ValidationItem';
import type { AssetField } from '../../types';

interface AssetFieldValidationFormProps {
  validations: AssetField['validations'];
  onChange: (validations: AssetField['validations']) => void;
}

export function AssetFieldValidationForm({ validations, onChange }: AssetFieldValidationFormProps) {
  const v = validations || { required: false };

  const update = (updates: Partial<NonNullable<AssetField['validations']>>) => {
    onChange({ ...v, ...updates });
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Validation</h2>

      <div>
        <ValidationItem
          label="Required field"
          helper="You won't be able to publish an entry if this field is empty"
          helperBlue
          checked={v.required}
          onChange={(c) => update({ required: c })}
        />
        <ValidationItem
          label="Limit file size"
          helper="Specify a minimum and/or maximum allowed file size (in bytes)"
          checked={!!v.fileSize}
          onChange={(c) => update({ fileSize: c ? { min: undefined, max: undefined } : undefined })}
        >
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-600 mb-1">Min (bytes)</label>
              <Input
                type="number"
                size="small"
                value={v.fileSize?.min ?? ''}
                onChange={(e) => update({ fileSize: { ...v.fileSize, min: e.target.value ? Number(e.target.value) : undefined } })}
                placeholder="No minimum"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-600 mb-1">Max (bytes)</label>
              <Input
                type="number"
                size="small"
                value={v.fileSize?.max ?? ''}
                onChange={(e) => update({ fileSize: { ...v.fileSize, max: e.target.value ? Number(e.target.value) : undefined } })}
                placeholder="No maximum"
              />
            </div>
          </div>
        </ValidationItem>
        <ValidationItem
          label="Accept only specified file types"
          helper="Restrict which file types can be uploaded"
          checked={!!v.fileTypes}
          onChange={(c) => update({ fileTypes: c ? [] : undefined })}
        >
          <Input
            size="small"
            value={(v.fileTypes || []).join(', ')}
            onChange={(e) => update({ fileTypes: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
            placeholder="e.g. image/png, image/jpeg, application/pdf"
          />
        </ValidationItem>
        <ValidationItem
          label="Limit image dimensions"
          helper="Specify min/max width and height for images"
          checked={!!v.imageDimensions}
          onChange={(c) => update({
            imageDimensions: c
              ? { width: { min: undefined, max: undefined }, height: { min: undefined, max: undefined } }
              : undefined,
          })}
        >
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-xs font-medium text-gray-600 mb-1">Width (px)</p>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    type="number"
                    size="small"
                    value={v.imageDimensions?.width?.min ?? ''}
                    onChange={(e) => update({
                      imageDimensions: {
                        ...v.imageDimensions!,
                        width: { ...v.imageDimensions?.width, min: e.target.value ? Number(e.target.value) : undefined },
                      },
                    })}
                    placeholder="Min"
                  />
                </div>
                <div className="flex-1">
                  <Input
                    type="number"
                    size="small"
                    value={v.imageDimensions?.width?.max ?? ''}
                    onChange={(e) => update({
                      imageDimensions: {
                        ...v.imageDimensions!,
                        width: { ...v.imageDimensions?.width, max: e.target.value ? Number(e.target.value) : undefined },
                      },
                    })}
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-600 mb-1">Height (px)</p>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    type="number"
                    size="small"
                    value={v.imageDimensions?.height?.min ?? ''}
                    onChange={(e) => update({
                      imageDimensions: {
                        ...v.imageDimensions!,
                        height: { ...v.imageDimensions?.height, min: e.target.value ? Number(e.target.value) : undefined },
                      },
                    })}
                    placeholder="Min"
                  />
                </div>
                <div className="flex-1">
                  <Input
                    type="number"
                    size="small"
                    value={v.imageDimensions?.height?.max ?? ''}
                    onChange={(e) => update({
                      imageDimensions: {
                        ...v.imageDimensions!,
                        height: { ...v.imageDimensions?.height, max: e.target.value ? Number(e.target.value) : undefined },
                      },
                    })}
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>
          </div>
        </ValidationItem>
      </div>
    </div>
  );
}
