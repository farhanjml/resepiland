import { supabase } from './supabase';
import { SavedRecipe, ShoppingListItem } from '../types/database';

export async function getSavedRecipes(userId: string): Promise<SavedRecipe[]> {
  const { data, error } = await supabase
    .from('saved_recipes')
    .select('*')
    .eq('user_id', userId);

  if (error) throw error;
  return data || [];
}

export async function getShoppingList(userId: string): Promise<ShoppingListItem[]> {
  const { data, error } = await supabase
    .from('shopping_list')
    .select(`
      *,
      recipe:recipes(
        id,
        creator_id
      )
    `)
    .eq('user_id', userId);

  if (error) throw error;
  return data || [];
}

export async function addToShoppingList(item: Omit<ShoppingListItem, 'id' | 'created_at'>): Promise<ShoppingListItem> {
  const { data, error } = await supabase
    .from('shopping_list')
    .insert(item)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function addManyToShoppingList(items: Omit<ShoppingListItem, 'id' | 'created_at'>[]): Promise<void> {
  const { error } = await supabase
    .from('shopping_list')
    .insert(items);

  if (error) throw error;
}

export async function removeFromShoppingList(itemId: string): Promise<void> {
  const { error } = await supabase
    .from('shopping_list')
    .delete()
    .eq('id', itemId);

  if (error) throw error;
}

export async function removeManyFromShoppingList(userId: string, recipeId: string): Promise<void> {
  const { error } = await supabase
    .from('shopping_list')
    .delete()
    .match({ user_id: userId, recipe_id: recipeId });

  if (error) throw error;
}

export async function saveRecipe(userId: string, recipeId: string, creatorId: string): Promise<void> {
  const { error } = await supabase
    .from('saved_recipes')
    .insert({
      user_id: userId,
      recipe_id: recipeId,
      creator_id: creatorId
    });

  if (error) throw error;
}

export async function unsaveRecipe(userId: string, recipeId: string): Promise<void> {
  const { error } = await supabase
    .from('saved_recipes')
    .delete()
    .match({
      user_id: userId,
      recipe_id: recipeId
    });

  if (error) throw error;
}