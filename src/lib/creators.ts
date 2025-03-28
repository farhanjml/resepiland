import { supabase } from './supabase';
import { Creator } from '../types/database';

export async function getCreators() {
  try {
    const { data, error } = await supabase
      .from('creators')
      .select('*')
      .order('name');

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching creators:', error);
    throw error instanceof Error ? error : new Error('Failed to fetch creators');
  }
}

export async function getCreatorById(id: string) {
  try {
    const { data, error } = await supabase
      .from('creators')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching creator:', error);
    return null;
  }
}

export async function getCreatorWithRecipes(id: string) {
  try {
    const { data, error } = await supabase
      .from('creators')
      .select(`
        *,
        recipes(*)
      `)
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching creator with recipes:', error);
    throw error instanceof Error ? error : new Error('Failed to fetch creator details');
  }
}

export async function createCreator(creator: Omit<Creator, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const { data, error } = await supabase
      .from('creators')
      .insert([{
        id: creator.instagram.toLowerCase().replace('@', ''),
        ...creator
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating creator:', error);
    throw error instanceof Error ? error : new Error('Failed to create creator');
  }
}

export async function updateCreator(id: string, updates: Partial<Creator>) {
  try {
    const { data, error } = await supabase
      .from('creators')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating creator:', error);
    throw error instanceof Error ? error : new Error('Failed to update creator');
  }
}

export async function deleteCreator(id: string) {
  try {
    // First verify the creator exists
    const { data: creator, error: fetchError } = await supabase
      .from('creators')
      .select('id')
      .eq('id', id)
      .maybeSingle();

    if (fetchError) throw fetchError;
    if (!creator) throw new Error('Creator not found');

    // Attempt to delete the creator
    const { error: deleteError } = await supabase
      .from('creators')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('Error deleting creator:', deleteError);
      throw new Error(deleteError.message);
    }

    // If we get here, deletion was successful
    return true;
  } catch (error) {
    console.error('Delete error:', error);
    throw error instanceof Error ? error : new Error('Failed to delete creator');
  }
}