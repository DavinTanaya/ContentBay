import type { AppearanceOption } from '../types';

export const APPEARANCE_OPTIONS: Record<string, AppearanceOption[]> = {
  text: [
    { value: 'singleLine', label: 'Single Line', description: 'Standard text input field' },
    { value: 'url', label: 'URL', description: 'Validates input as a URL' },
    { value: 'dropdown', label: 'Dropdown', description: 'Select from predefined values' },
    { value: 'radio', label: 'Radio Buttons', description: 'Choose one predefined value' },
    { value: 'slug', label: 'Slug', description: 'Generates URL-friendly slugs' },
  ],
  number: [
    { value: 'number', label: 'Number Input', description: 'Standard number input field' },
    { value: 'dropdown', label: 'Dropdown', description: 'Select from predefined values' },
    { value: 'radio', label: 'Radio Buttons', description: 'Choose one predefined value' },
    { value: 'rating', label: 'Rating', description: 'Display as stars (usually 1-5)' },
  ],
  reference: [
    { value: 'entryLink', label: 'Entry Link', description: 'Simple reference link' },
    { value: 'entryCard', label: 'Entry Card', description: 'Rich card preview' },
  ],
};
