export interface Ingredient {
  id: number;
  original: string;
  image: string;
  name: string;
}

export interface Step {
  number: number;
  step: string;
}

export interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  healthScore: number;
  summary: string;
  extendedIngredients: Ingredient[];
  analyzedInstructions: {
    steps: Step[];
  }[];
}
