import { useState, useEffect, useCallback } from 'react';
import * as recipesApi from '../lib/recipes';
import { Recipe } from '../types/database';

// Cache for recipes
let recipesCache: Recipe[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadRecipes = useCallback(async (force = false) => {
    try {
      // Use cache if available and not expired
      const now = Date.now();
      if (!force && recipesCache && (now - lastFetchTime < CACHE_DURATION)) {
        setRecipes(recipesCache);
        setLoading(false);
        return;
      }

      const data = await recipesApi.getRecipes();
      recipesCache = data;
      lastFetchTime = now;
      setRecipes(data);
      setError(null);
    } catch (err) {
      console.error('Error loading recipes:', err);
      setError(err instanceof Error ? err : new Error('Failed to load recipes'));
      // Clear cache on error
      recipesCache = null;
      lastFetchTime = 0;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRecipes();
  }, [loadRecipes]);

  return { recipes, loading, error, refresh: () => loadRecipes(true) };
}

export function useRecipe(id: string) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        // Try to find in cache first
        if (recipesCache) {
          const cachedRecipe = recipesCache.find(r => r.id === id);
          if (cachedRecipe) {
            setRecipe(cachedRecipe);
            setLoading(false);
            return;
          }
        }

        const data = await recipesApi.getRecipeById(id);
        setRecipe(data);
        setError(null);
      } catch (err) {
        console.error('Error loading recipe:', err);
        setError(err instanceof Error ? err : new Error('Failed to load recipe'));
      } finally {
        setLoading(false);
      }
    };

    loadRecipe();
  }, [id]);

  return { recipe, loading, error };
}