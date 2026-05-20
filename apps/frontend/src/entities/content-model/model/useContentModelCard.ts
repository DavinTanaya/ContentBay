import { useSession } from '@/entities/session';
import type { ContentModel } from './types';

export function useContentModelCard(model: ContentModel) {
  const { user } = useSession();

  const displayName = user
    ? user.firstName
      ? `${user.firstName} ${user.lastName || ''}`.trim()
      : user.email.split('@')[0]
    : 'User';

  const initial = user
    ? user.firstName
      ? user.firstName.charAt(0).toUpperCase()
      : user.email.charAt(0).toUpperCase()
    : 'U';

  const dateSource = model.updatedAt || model.createdAt;
  let formattedDate = 'N/A';

  if (dateSource) {
    // If the timestamp contains only digits, parse it as a number
    const isNumericString = /^\d+$/.test(dateSource);
    const parsedDate = new Date(isNumericString ? Number(dateSource) : dateSource);

    if (!isNaN(parsedDate.getTime())) {
      formattedDate = parsedDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }
  }

  return {
    displayName,
    initial,
    formattedDate,
  };
}
