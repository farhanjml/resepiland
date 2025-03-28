import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useRecipe } from '../hooks/useRecipes';
import RecipeHeader from '../components/recipe/RecipeHeader';
import RecipeTitle from '../components/recipe/RecipeTitle';
import RecipeInfo from '../components/recipe/RecipeInfo';
import IngredientsList from '../components/recipe/IngredientsList';
import RecipeInstructions from '../components/recipe/RecipeInstructions';
import RecipeNotes from '../components/recipe/RecipeNotes';
import CreatorSidebar from '../components/recipe/CreatorSidebar';

const RecipeDetails = () => {
  const { creatorId, recipeId } = useParams();
  const navigate = useNavigate();
  const { 
    user, 
    addToShoppingList, 
    removeFromShoppingList, 
    addManyToShoppingList, 
    removeManyFromShoppingList, 
    isInShoppingList, 
    saveRecipe, 
    unsaveRecipe, 
    isRecipeSaved,
    shoppingList 
  } = useAuth();
  const { recipe, loading } = useRecipe(recipeId || '');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  if (loading || !recipe || !recipe.creator) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse">
        <div className="h-[500px] bg-gray-200 rounded-xl mb-8" />
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
        </div>
      </div>
    );
  }

  const handleSaveToggle = async () => {
    if (!user || isSaving) return;
    setIsSaving(true);
    try {
      if (isRecipeSaved(recipe.id)) {
        await unsaveRecipe(recipe.id);
      } else {
        await saveRecipe(recipe.id, recipe.creator_id);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddToShoppingList = async (ingredient: string) => {
    if (!user) return;
    await addToShoppingList({
      recipe_id: recipe.id,
      recipe_name: recipe.title,
      creator_name: recipe.creator.name,
      ingredient
    });
  };

  const handleRemoveFromShoppingList = async (ingredient: string) => {
    if (!user) return;
    const item = shoppingList.find(
      item => item.recipe_id === recipe.id && item.ingredient === ingredient
    );
    if (item) {
      await removeFromShoppingList(item.id);
    }
  };

  const handleToggleIngredient = async (ingredient: string) => {
    if (!user) return;
    if (isInShoppingList(recipe.id, ingredient)) {
      await handleRemoveFromShoppingList(ingredient);
    } else {
      await handleAddToShoppingList(ingredient);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <RecipeHeader image={recipe.image} creatorId={recipe.creator_id} />
      
      <div className="max-w-7xl mx-auto px-4 -mt-32 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <RecipeTitle
            title={recipe.title}
            isRecipeSaved={user ? isRecipeSaved(recipe.id) : false}
            onSaveToggle={handleSaveToggle}
            showSaveButton={!!user}
            isSaving={isSaving}
          />
          
          <RecipeInfo
            cookTime={recipe.cook_time}
            servings={recipe.servings}
            category={recipe.category}
            description={recipe.description}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <IngredientsList
                ingredients={recipe.ingredients}
                recipeId={recipe.id}
                recipeName={recipe.title}
                creatorName={recipe.creator.name}
                isAuthenticated={!!user}
                isProcessing={isProcessing}
                allIngredientsAdded={recipe.ingredients.every(i => isInShoppingList(recipe.id, i))}
                onNavigateToList={() => navigate('/profile?tab=shopping')}
                onToggleAllIngredients={async () => {
                  if (!user || isProcessing) return;
                  setIsProcessing(true);
                  try {
                    const allAdded = recipe.ingredients.every(i => isInShoppingList(recipe.id, i));
                    if (allAdded) {
                      await removeManyFromShoppingList(recipe.id);
                    } else {
                      const items = recipe.ingredients.map(ingredient => ({
                        recipe_id: recipe.id,
                        recipe_name: recipe.title,
                        creator_name: recipe.creator.name,
                        ingredient
                      }));
                      await addManyToShoppingList(items);
                    }
                  } finally {
                    setIsProcessing(false);
                  }
                }}
                onToggleIngredient={handleToggleIngredient}
                isIngredientInList={(ingredient) => isInShoppingList(recipe.id, ingredient)}
              />

              <RecipeInstructions instructions={recipe.instructions} />
              <RecipeNotes notes={recipe.notes} />
            </div>

            <div>
              <CreatorSidebar creator={recipe.creator} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;