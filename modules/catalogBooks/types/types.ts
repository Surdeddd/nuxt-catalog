export interface BookItem {
  id: string;
  volumeInfo?: {
    title?: string;
    imageLinks?: {
      smallThumbnail?: string;
      thumbnail?: string;
    };
  };
}
export interface BooksResponse {
  items: BookItem[];
  totalItems: number;
}

export type ViewMode = 'grid' | 'list';

export type PrintType = (typeof CONST_PRINT_TYPES)[number];
