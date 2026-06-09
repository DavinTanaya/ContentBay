import type { User } from '@/entities/user/@x/workspace';

export type ContentModelIcon =
  | 'person'
  | 'folder'
  | 'document'
  | 'box'
  | 'media'
  | 'settings'
  | 'map-pin'
  | 'database';

export type FieldIcon =
  | 'rich-text'
  | 'text'
  | 'number'
  | 'calendar'
  | 'location'
  | 'media'
  | 'boolean'
  | 'json'
  | 'reference';

export interface FieldType {
  title: string;
  desc: string;
  selected?: boolean;
  icon: FieldIcon;
}

export interface BaseField {
  id: string;
  name: string;
  apiId: string;
  type: string;
  icon: FieldIcon;
  localized: boolean;
  required: boolean;
  isTitle: boolean;
  description?: string;
  validations?: Record<string, any>;
  settings?: Record<string, any>;
  appearance?: Record<string, any>;
  defaultValue?: any;
}

export interface RichTextField extends BaseField {
  type: 'richText';
  settings?: {
    editorOptions?: {
      headings: {
        h1: boolean;
        h2: boolean;
        h3: boolean;
        h4: boolean;
        h5: boolean;
        h6: boolean;
      };
      bold: boolean;
      italic: boolean;
      underline: boolean;
      code: boolean;
      superscript: boolean;
      subscript: boolean;
      strikethrough: boolean;
      unorderedList: boolean;
      orderedList: boolean;
      blockquote: boolean;
      horizontalRule: boolean;
      table: boolean;
    };
    hyperlinkOptions?: {
      externalUrl: boolean;
      entryLink: boolean;
      assetLink: boolean;
    };
    embedOptions?: {
      embeddedEntry: boolean;
      inlineEntry: boolean;
      embeddedAsset: boolean;
    };
  };
  validations?: {
    required: boolean;
    characterCount?: { min?: number; max?: number };
    entryLinkValidation?: {
      min?: number;
      max?: number;
      allowedEntryTypes: string[];
    };
    assetLinkValidation?: { min?: number; max?: number };
    embeddedEntryValidation?: {
      min?: number;
      max?: number;
      allowedEntryTypes: string[];
    };
  };
}

export interface TextField extends BaseField {
  type: 'text';
  settings?: {
    storageType?: 'shortText' | 'longText';
    list?: boolean;
    isEntryTitle?: boolean;
  };
  appearance?: {
    type?: 'singleLine' | 'url' | 'dropdown' | 'radio' | 'slug';
  };
  defaultValue?: string;
  validations?: {
    required: boolean;
    unique: boolean;
    characterCount?: { min?: number; max?: number };
    matchPattern?: string;
    prohibitPattern?: string;
    specifiedValues?: string[];
  };
}

export interface NumberField extends BaseField {
  type: 'number';
  settings?: {
    numberType?: 'integer' | 'decimal';
  };
  appearance?: {
    type?: 'number' | 'dropdown' | 'radio' | 'rating';
  };
  defaultValue?: number;
  validations?: {
    required: boolean;
    unique: boolean;
    numberRange?: { min?: number; max?: number };
    specifiedValues?: number[];
  };
}

export interface DateField extends BaseField {
  type: 'date';
  defaultValue?: string;
  appearance?: {
    format: 'dateOnly' | 'dateTime' | 'dateTimeWithTimezone';
    hourFormat: '12h' | '24h';
  };
  validations?: {
    required: boolean;
    dateRange?: { earlyDate?: string; latestDate?: string };
  };
}

export interface LocationField extends BaseField {
  type: 'location';
  validations?: {
    required: boolean;
  };
}

export interface AssetField extends BaseField {
  type: 'asset';
  settings?: {
    cardinality?: 'one' | 'many';
    permissions?: {
      allowCreateNew: boolean;
      allowLinkExisting: boolean;
    };
  };
  validations?: {
    required: boolean;
    fileSize?: { min?: number; max?: number };
    fileTypes?: string[];
    imageDimensions?: {
      width: { min?: number; max?: number };
      height: { min?: number; max?: number };
    };
  };
}

export interface BooleanField extends BaseField {
  type: 'boolean';
  defaultValue?: boolean;
  settings?: {
    labels?: {
      trueLabel: string;
      falseLabel: string;
    };
  };
  validations?: {
    required: boolean;
  };
}

export interface JsonField extends BaseField {
  type: 'json';
  validations?: {
    required: boolean;
    numberOfProperties?: { min?: number; max?: number };
  };
}

export interface ReferenceField extends BaseField {
  type: 'reference';
  settings?: {
    cardinality?: 'one' | 'many';
    permissions?: {
      allowCreateNew: boolean;
      allowLinkExisting: boolean;
    };
  };
  appearance?: {
    type?: 'entryLink' | 'entryCard';
  };
  validations?: {
    required: boolean;
    allowedEntryTypes: string[];
  };
}

export type ContentFieldConfig =
  | RichTextField
  | TextField
  | NumberField
  | DateField
  | LocationField
  | AssetField
  | BooleanField
  | JsonField
  | ReferenceField;

export type ContentField = ContentFieldConfig;

export interface ContentModel {
  id: string;
  workspaceId: string;
  name: string;
  apiId: string;
  description?: string;
  icon: ContentModelIcon;
  fields: ContentField[];
  status?: 'LIVE' | 'DRAFT';
  createdAt: string;
  updatedAt?: string;
  createdBy: number;
  updatedBy?: number;
  creator?: User;
  updater?: User;
}

export interface ContentModelCardProps {
  model: ContentModel;
  authorName?: string;
  authorInitial?: string;
  onClick?: (id: string) => void;
}

export interface ContentModelGridProps {
  models: (ContentModel & { authorName?: string; authorInitial?: string })[];
  onCardClick?: (id: string) => void;
}

export interface FieldsTableProps {
  data: ContentField[];
  onEditField: (field: ContentField) => void;
  onDeleteField?: (fieldApiId: string) => void;
}

export interface JSONSchemaField {
  id: string;
  label: string;
  type: string;
  config: {
    localized?: boolean;
    required?: boolean;
    isTitle?: boolean;
  };
}

export interface ContentModelJsonSchema {
  name: string;
  description: string;
  apiId: string;
  fields: JSONSchemaField[];
}

export interface JSONSchemaPreviewProps {
  modelId?: string;
  schema: ContentModelJsonSchema;
}

export interface ModelMetadataSidebarProps {
  totalFields: number;
  lastRevision: string;
}

export interface RenderFieldIconProps {
  icon?: FieldIcon | string;
  className?: string;
}

export interface RenderModelIconProps {
  icon?: ContentModelIcon | string;
  size?: number;
  className?: string;
}
