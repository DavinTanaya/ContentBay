import type {
  ContentFieldConfig,
  TextField,
  NumberField,
  DateField,
  BooleanField,
  JsonField,
  LocationField,
  AssetField,
  ReferenceField,
  RichTextField,
  FieldIcon,
} from '@/entities/content-model';

// ─── Generic Modal Props ───────────────────────────────────────────────

export interface CreateModalProps<T extends ContentFieldConfig> {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onConfirm: (data: T) => void;
  icon: FieldIcon;
}

export interface EditModalProps<T extends ContentFieldConfig> {
  isOpen: boolean;
  onClose: () => void;
  initialData: T;
  onConfirm: (data: T) => void;
}

// ─── Appearance Option ─────────────────────────────────────────────────

export interface AppearanceOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

// ─── Field Type Map (for type-safe dispatch) ───────────────────────────

export type FieldTypeMap = {
  text: TextField;
  number: NumberField;
  date: DateField;
  boolean: BooleanField;
  json: JsonField;
  location: LocationField;
  asset: AssetField;
  reference: ReferenceField;
  richText: RichTextField;
};

export type FieldTypeName = keyof FieldTypeMap;

// ─── Re-exports for convenience ────────────────────────────────────────

export type {
  ContentFieldConfig,
  TextField,
  NumberField,
  DateField,
  BooleanField,
  JsonField,
  LocationField,
  AssetField,
  ReferenceField,
  RichTextField,
  FieldIcon,
};
