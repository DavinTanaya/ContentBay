export function getEntryDisplayValue(contentModel: any, entry: any): string {
  if (!contentModel || !contentModel.fields || contentModel.fields.length === 0) {
    return 'Untitled';
  }

  const firstField = contentModel.fields[0];
  const payload = entry.data || {};
  const rawValue = payload[firstField.apiId];

  // Check for empty values
  if (
    rawValue === null ||
    rawValue === undefined ||
    rawValue === '' ||
    (Array.isArray(rawValue) && rawValue.length === 0) ||
    (typeof rawValue === 'object' && Object.keys(rawValue).length === 0)
  ) {
    return 'Untitled';
  }

  const fieldType = (firstField.type || '').toUpperCase();

  switch (fieldType) {
    case 'TEXT':
      return String(rawValue);

    case 'RICHTEXT':
      return 'Rich Text Content';

    case 'NUMBER':
      return Number(rawValue).toLocaleString();

    case 'DATE':
      try {
        const date = new Date(rawValue);
        return date.toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }); // 10 Jun 2026 format
      } catch (e) {
        return String(rawValue);
      }

    case 'BOOLEAN':
      return rawValue ? 'True' : 'False';

    case 'ASSET':
      // Assumes asset might have a filename property, or is an array, or simple string
      if (typeof rawValue === 'string') return rawValue.split('/').pop() || 'Asset';
      if (Array.isArray(rawValue)) return `${rawValue.length} asset${rawValue.length > 1 ? 's' : ''}`;
      if (rawValue.fileName) return rawValue.fileName;
      return 'Asset';

    case 'REFERENCE':
      if (Array.isArray(rawValue)) {
        return `${rawValue.length} reference${rawValue.length !== 1 ? 's' : ''}`;
      }
      return '1 reference';

    default:
      return String(rawValue);
  }
}
