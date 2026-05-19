import type { FieldType } from '@entities/content-model';

export const FieldTypeOptions: FieldType[] = [
  {
    title: 'Rich text',
    desc: 'Text formatting with references and media',
    icon: 'rich-text',
  },
  {
    title: 'Text',
    desc: 'Titles, names, paragraphs, list of names',
    icon: 'text',
    selected: true,
  },
  {
    title: 'Number',
    desc: 'ID, order number, rating, quantity',
    icon: 'number',
  },
  { title: 'Date and time', desc: 'Event dates', icon: 'calendar' },
  {
    title: 'Location',
    desc: 'Coordinates: latitude and longitude',
    icon: 'location',
  },
  {
    title: 'Media',
    desc: 'Images, videos, PDFs and other files',
    icon: 'media',
  },
  {
    title: 'Boolean',
    desc: 'Yes or no, 1 or 0, true or false',
    icon: 'boolean',
  },
  {
    title: 'JSON object',
    desc: 'Data in JSON format',
    icon: 'json',
  },
  {
    title: 'Reference',
    desc: 'For example, a blog post can reference its author(s)',
    icon: 'reference',
  },
];

export interface FieldPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectField: (type: FieldType) => void;
}

export interface FieldConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFieldType: FieldType | null;
  onConfirm: (data: { name: string; apiId: string }) => void;
  onBack: () => void;
}
