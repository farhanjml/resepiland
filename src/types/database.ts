export interface ShoppingListItem {
  id: string;
  user_id: string;
  recipe_id: string;
  recipe_name: string;
  creator_name?: string;
  ingredient: string;
  created_at: string;
  recipe?: {
    id: string;
    creator_id: string;
  };
}

export interface SavedRecipe {
  id: string;
  user_id: string;
  recipe_id: string;
  creator_id: string;
  created_at: string;
}

export interface Creator {
  id: string;
  name: string;
  image: string;
  cover_image: string;
  description: string;
  instagram: string;
  followers: string;
  youtube?: string;
  tiktok?: string;
  shopee?: string;
  recipes?: Recipe[];
}

export interface Recipe {
  id: string;
  creator_id: string;
  title: string;
  image: string;
  cook_time: string;
  servings: string;
  category: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  creator?: Creator;
}