import type {
  ContentFieldConfig,
  TextField,
  NumberField,
  RichTextField,
  DateField,
  AssetField,
  BooleanField,
  JsonField,
  ReferenceField,
  LocationField,
  FieldIcon,
} from '@/entities/content-model';

export function createBaseField(id: string, name: string, apiId: string, icon: FieldIcon) {
  return {
    id,
    name,
    apiId,
    icon,
    localized: false,
    required: false,
    isTitle: false,
    description: '',
    settings: {},
    validations: {},
    appearance: {},
  };
}

export function createTextField(id: string, name: string, apiId: string, icon: FieldIcon): TextField {
  return {
    ...createBaseField(id, name, apiId, icon),
    type: 'text',
    settings: {
      storageType: 'shortText',
      list: false,
      isEntryTitle: false,
    },
    defaultValue: '',
    appearance: {
      type: 'singleLine',
    },
    validations: {
      required: false,
      unique: false,
    },
  };
}

export function createNumberField(id: string, name: string, apiId: string, icon: FieldIcon): NumberField {
  return {
    ...createBaseField(id, name, apiId, icon),
    type: 'number',
    settings: {
      numberType: 'integer',
    },
    appearance: {
      type: 'number',
    },
    validations: {
      required: false,
      unique: false,
    },
  };
}

export function createRichTextField(id: string, name: string, apiId: string, icon: FieldIcon): RichTextField {
  return {
    ...createBaseField(id, name, apiId, icon),
    type: 'richText',
    settings: {
      editorOptions: {
        headings: { h1: true, h2: true, h3: true, h4: true, h5: true, h6: true },
        bold: true,
        italic: true,
        underline: true,
        code: true,
        superscript: true,
        subscript: true,
        strikethrough: true,
        unorderedList: true,
        orderedList: true,
        blockquote: true,
        horizontalRule: true,
        table: true,
      },
      hyperlinkOptions: {
        externalUrl: true,
        entryLink: true,
        assetLink: true,
      },
      embedOptions: {
        embeddedEntry: true,
        inlineEntry: true,
        embeddedAsset: true,
      },
    },
    validations: {
      required: false,
    },
  };
}

export function createDateField(id: string, name: string, apiId: string, icon: FieldIcon): DateField {
  return {
    ...createBaseField(id, name, apiId, icon),
    type: 'date',
    appearance: {
      format: 'dateOnly',
      hourFormat: '24h',
    },
    validations: {
      required: false,
    },
  };
}

export function createLocationField(id: string, name: string, apiId: string, icon: FieldIcon): LocationField {
  return {
    ...createBaseField(id, name, apiId, icon),
    type: 'location',
    validations: {
      required: false,
    },
  };
}

export function createAssetField(id: string, name: string, apiId: string, icon: FieldIcon): AssetField {
  return {
    ...createBaseField(id, name, apiId, icon),
    type: 'asset',
    settings: {
      cardinality: 'one',
      permissions: {
        allowCreateNew: true,
        allowLinkExisting: true,
      },
    },
    validations: {
      required: false,
    },
  };
}

export function createBooleanField(id: string, name: string, apiId: string, icon: FieldIcon): BooleanField {
  return {
    ...createBaseField(id, name, apiId, icon),
    type: 'boolean',
    defaultValue: false,
    settings: {
      labels: {
        trueLabel: 'Yes',
        falseLabel: 'No',
      },
    },
    validations: {
      required: false,
    },
  };
}

export function createJsonField(id: string, name: string, apiId: string, icon: FieldIcon): JsonField {
  return {
    ...createBaseField(id, name, apiId, icon),
    type: 'json',
    validations: {
      required: false,
    },
  };
}

export function createReferenceField(id: string, name: string, apiId: string, icon: FieldIcon): ReferenceField {
  return {
    ...createBaseField(id, name, apiId, icon),
    type: 'reference',
    settings: {
      cardinality: 'one',
      permissions: {
        allowCreateNew: true,
        allowLinkExisting: true,
      },
    },
    appearance: {
      type: 'entryLink',
    },
    validations: {
      required: false,
      allowedEntryTypes: [],
    },
  };
}

export function initializeField(
  type: string,
  id: string,
  name: string,
  apiId: string,
  icon: FieldIcon
): ContentFieldConfig {
  switch (type) {
    case 'text':
      return createTextField(id, name, apiId, icon);
    case 'number':
      return createNumberField(id, name, apiId, icon);
    case 'richText':
      return createRichTextField(id, name, apiId, icon);
    case 'date':
      return createDateField(id, name, apiId, icon);
    case 'asset':
      return createAssetField(id, name, apiId, icon);
    case 'boolean':
      return createBooleanField(id, name, apiId, icon);
    case 'json':
      return createJsonField(id, name, apiId, icon);
    case 'reference':
      return createReferenceField(id, name, apiId, icon);
    case 'location':
      return createLocationField(id, name, apiId, icon);
    default:
      // Fallback
      return createTextField(id, name, apiId, icon);
  }
}
