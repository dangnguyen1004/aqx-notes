import { NOTE_PREVIEW_LENGTH } from '../constants';

export const truncateText = (
  text: string,
  maxLength: number = NOTE_PREVIEW_LENGTH
): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const formatDate = (timestamp: number, locale: string = 'en'): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
