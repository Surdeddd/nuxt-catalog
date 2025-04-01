export const CONST_PRINT_TYPES = ['all', 'books', 'magazines'];
export type PrintType = (typeof CONST_PRINT_TYPES)[number];

export const CONST_FREE_ONLY_OPTIONS = [
  { label: 'Только бесплатные', value: true },
];
