export interface RecipeItem {
  id: number;
  title: string;
  image: string;
}

export interface RecipesResponse {
  results: RecipeItem[];
  offset: number;
  number: number;
  totalResults: number;
}

export type ViewMode = 'grid' | 'list';
