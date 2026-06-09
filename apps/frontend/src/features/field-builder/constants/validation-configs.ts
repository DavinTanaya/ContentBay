export interface ValidationRuleConfig {
  key: string;
  label: string;
  description: string;
  hasExpandedForm?: boolean;
}

export const VALIDATION_RULES: Record<string, ValidationRuleConfig[]> = {
  text: [
    { key: 'required', label: 'Required field', description: "You won't be able to publish an entry if this field is empty" },
    { key: 'unique', label: 'Unique field', description: "You won't be able to publish an entry if there is an existing entry with identical content" },
    { key: 'characterCount', label: 'Limit character count', description: 'Specify a minimum and/or maximum allowed number of characters', hasExpandedForm: true },
    { key: 'matchPattern', label: 'Match a specific pattern', description: 'Make this field match a pattern: e-mail address, URI, or a custom regular expression', hasExpandedForm: true },
    { key: 'prohibitPattern', label: 'Prohibit a specific pattern', description: 'Make this field invalid when a pattern is matched: custom regular expression (e.g. bad word list)', hasExpandedForm: true },
    { key: 'specifiedValues', label: 'Accept only specified values', description: "You won't be able to publish an entry if the field value is not in the list of specified values", hasExpandedForm: true },
  ],
  number: [
    { key: 'required', label: 'Required field', description: "You won't be able to publish an entry if this field is empty" },
    { key: 'unique', label: 'Unique field', description: "You won't be able to publish an entry if there is an existing entry with identical content" },
    { key: 'numberRange', label: 'Limit number range', description: 'Specify a minimum and/or maximum allowed value', hasExpandedForm: true },
    { key: 'specifiedValues', label: 'Accept only specified values', description: "You won't be able to publish an entry if the field value is not in the list of specified values", hasExpandedForm: true },
  ],
  date: [
    { key: 'required', label: 'Required field', description: "You won't be able to publish an entry if this field is empty" },
    { key: 'dateRange', label: 'Limit date range', description: 'Specify an earliest and/or latest allowed date', hasExpandedForm: true },
  ],
  boolean: [
    { key: 'required', label: 'Required field', description: "You won't be able to publish an entry if this field is empty" },
  ],
  richText: [
    { key: 'required', label: 'Required field', description: "You won't be able to publish an entry if this field is empty" },
    { key: 'characterCount', label: 'Limit character count', description: 'Specify a minimum and/or maximum allowed number of characters', hasExpandedForm: true },
  ],
  asset: [
    { key: 'required', label: 'Required field', description: "You won't be able to publish an entry if this field is empty" },
    { key: 'fileSize', label: 'Limit file size', description: 'Specify a minimum and/or maximum allowed file size', hasExpandedForm: true },
    { key: 'fileTypes', label: 'Accept only specified file types', description: 'Restrict which file types can be uploaded', hasExpandedForm: true },
    { key: 'imageDimensions', label: 'Limit image dimensions', description: 'Specify min/max width and height for images', hasExpandedForm: true },
  ],
  reference: [
    { key: 'required', label: 'Required field', description: "You won't be able to publish an entry if this field is empty" },
    { key: 'allowedEntryTypes', label: 'Accept only specified entry types', description: 'Restrict which content types can be referenced', hasExpandedForm: true },
  ],
  json: [
    { key: 'required', label: 'Required field', description: "You won't be able to publish an entry if this field is empty" },
    { key: 'numberOfProperties', label: 'Limit number of properties', description: 'Specify a minimum and/or maximum number of JSON properties', hasExpandedForm: true },
  ],
  location: [
    { key: 'required', label: 'Required field', description: "You won't be able to publish an entry if this field is empty" },
  ],
};
