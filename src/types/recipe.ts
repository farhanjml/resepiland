export interface Recipe {
  id: string;
  title: string;
  image: string;
  cookTime: string;
  servings: string;
  category: string;
  description: string;
  ingredients?: string[];
  instructions?: string[];
}