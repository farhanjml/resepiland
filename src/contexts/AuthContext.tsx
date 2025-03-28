import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import * as auth from '../lib/auth';
import * as profileApi from '../lib/profile';
import { SavedRecipe, ShoppingListItem } from '../types/database';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  savedRecipes: SavedRecipe[];
  shoppingList: ShoppingListItem[];
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  saveRecipe: (recipeId: string, creatorId: string) => Promise<void>;
  unsaveRecipe: (recipeId: string) => Promise<void>;
  addToShoppingList: (item: Omit<ShoppingListItem, 'id' | 'created_at' | 'user_id'>) => Promise<void>;
  removeFromShoppingList: (itemId: string) => Promise<void>;
  addManyToShoppingList: (items: Omit<ShoppingListItem, 'id' | 'created_at' | 'user_id'>[]) => Promise<void>;
  removeManyFromShoppingList: (recipeId: string) => Promise<void>;
  isRecipeSaved: (recipeId: string) => boolean;
  isInShoppingList: (recipeId: string, ingredient: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([]);
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserData(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserData(session.user.id);
      } else {
        setSavedRecipes([]);
        setShoppingList([]);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadUserData = async (userId: string) => {
    try {
      const [recipes, items] = await Promise.all([
        profileApi.getSavedRecipes(userId),
        profileApi.getShoppingList(userId)
      ]);
      setSavedRecipes(recipes);
      setShoppingList(items);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const login = async (email: string, password: string) => {
    const { error } = await auth.signIn(email, password);
    if (error) throw error;
  };

  const signup = async (email: string, password: string, name: string) => {
    const { error } = await auth.signUp(email, password, name);
    if (error) throw error;
  };

  const logout = async () => {
    const { error } = await auth.signOut();
    if (error) throw error;
  };

  const saveRecipe = async (recipeId: string, creatorId: string) => {
    if (!user) return;
    await profileApi.saveRecipe(user.id, recipeId, creatorId);
    setSavedRecipes(prev => [...prev, { 
      id: crypto.randomUUID(),
      user_id: user.id,
      recipe_id: recipeId,
      creator_id: creatorId,
      created_at: new Date().toISOString()
    }]);
  };

  const unsaveRecipe = async (recipeId: string) => {
    if (!user) return;
    await profileApi.unsaveRecipe(user.id, recipeId);
    setSavedRecipes(prev => prev.filter(recipe => recipe.recipe_id !== recipeId));
  };

  const addToShoppingList = async (item: Omit<ShoppingListItem, 'id' | 'created_at' | 'user_id'>) => {
    if (!user) return;
    const newItem = await profileApi.addToShoppingList({ ...item, user_id: user.id });
    setShoppingList(prev => [...prev, newItem]);
  };

  const addManyToShoppingList = async (items: Omit<ShoppingListItem, 'id' | 'created_at' | 'user_id'>[]) => {
    if (!user) return;
    await profileApi.addManyToShoppingList(items.map(item => ({ ...item, user_id: user.id })));
    await loadUserData(user.id); // Reload shopping list after bulk add
  };

  const removeFromShoppingList = async (itemId: string) => {
    if (!user) return;
    await profileApi.removeFromShoppingList(itemId);
    setShoppingList(prev => prev.filter(item => item.id !== itemId));
  };

  const removeManyFromShoppingList = async (recipeId: string) => {
    if (!user) return;
    await profileApi.removeManyFromShoppingList(user.id, recipeId);
    setShoppingList(prev => prev.filter(item => item.recipe_id !== recipeId));
  };

  const isRecipeSaved = (recipeId: string) => {
    return savedRecipes.some(recipe => recipe.recipe_id === recipeId);
  };

  const isInShoppingList = (recipeId: string, ingredient: string) => {
    return shoppingList.some(
      item => item.recipe_id === recipeId && item.ingredient === ingredient
    );
  };

  return (
    <AuthContext.Provider 
      value={{
        user,
        loading,
        savedRecipes,
        shoppingList,
        login,
        signup,
        logout,
        saveRecipe,
        unsaveRecipe,
        addToShoppingList,
        addManyToShoppingList,
        removeFromShoppingList,
        removeManyFromShoppingList,
        isRecipeSaved,
        isInShoppingList
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};