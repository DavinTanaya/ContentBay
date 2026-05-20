import type { ContentModel } from './types';

export function useContentModelCard(model: ContentModel) {
  const dateSource = model.updatedAt || model.createdAt;
  let formattedDate = 'N/A';

  if (dateSource) {
    const isNumericString = /^\d+$/.test(dateSource);
    const parsedDate = new Date(
      isNumericString ? Number(dateSource) : dateSource,
    );

    if (!isNaN(parsedDate.getTime())) {
      formattedDate = parsedDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }
  }

  return {
    formattedDate,
  };
}
