import { supabase } from './supabase';
import { Recipe } from '../types/database';

export async function getRecipeById(id: string) {
  try {
    const { data, error } = await supabase
      .from('recipes')
      .select(`
        *,
        creator:creators(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    throw error instanceof Error ? error : new Error('Failed to fetch recipe');
  }
}

export async function getRecipes() {
  try {
    const { data, error } = await supabase
      .from('recipes')
      .select(`
        *,
        creator:creators(id, name, image)
      `);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error instanceof Error ? error : new Error('Failed to fetch recipes');
  }
}

export async function createRecipe(recipe: Omit<Recipe, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const { data, error } = await supabase
      .from('recipes')
      .insert(recipe)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating recipe:', error);
    throw error instanceof Error ? error : new Error('Failed to create recipe');
  }
}

export async function updateRecipe(id: string, updates: Partial<Recipe>) {
  try {
    const { data, error } = await supabase
      .from('recipes')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating recipe:', error);
    throw error instanceof Error ? error : new Error('Failed to update recipe');
  }
}

export async function deleteRecipe(id: string) {
  try {
    const { error } = await supabase
      .from('recipes')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting recipe:', error);
    throw error instanceof Error ? error : new Error('Failed to delete recipe');
  }
}