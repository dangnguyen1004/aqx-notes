export * from './colors';
export * from './radius';
export * from './spacing';
export * from './urls';

export const DEFAULT_CATEGORIES = [
  {
    id: 'cat-work-and-study',
    key: 'work-and-study',
    labelKey: 'categories.workAndStudy',
    icon: '📚',
    isDefault: true,
  },
  {
    id: 'cat-life',
    key: 'life',
    labelKey: 'categories.life',
    icon: '🏠',
    isDefault: true,
  },
  {
    id: 'cat-health-and-wellbeing',
    key: 'health-and-wellbeing',
    labelKey: 'categories.healthAndWellbeing',
    icon: '💪',
    isDefault: true,
  },
];

export const NOTE_MAX_LENGTH = 200;
export const NOTE_PREVIEW_LENGTH = 20;
export const NOTES_PER_CATEGORY = 3;
