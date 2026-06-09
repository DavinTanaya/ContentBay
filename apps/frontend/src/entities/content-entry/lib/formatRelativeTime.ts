export function formatRelativeTime(dateValue: string | number): string {
  if (!dateValue) return '-';

  const date = new Date(typeof dateValue === 'string' && !isNaN(Number(dateValue)) ? parseInt(dateValue) : dateValue);
  const now = new Date();
  
  if (isNaN(date.getTime())) return '-';

  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  // Future dates (should not normally happen for "Updated At")
  if (diffInSeconds < 0) return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  } else if (diffInDays === 1) {
    return 'Yesterday';
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  } else {
    // Fallback to absolute date
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }
}
