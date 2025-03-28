import React, { useState } from 'react';
import { ShoppingBag, ListPlus, Trash2, Loader2 } from 'lucide-react';
import ToggleButton from '../common/ToggleButton';

interface IngredientsListProps {
  ingredients: string[];
  recipeId: string;
  recipeName: string;
  creatorName: string;
  isAuthenticated: boolean;
  isProcessing: boolean;
  allIngredientsAdded: boolean;
  onNavigateToList: () => void;
  onToggleAllIngredients: () => void;
  onToggleIngredient: (ingredient: string) => Promise<void>;
  isIngredientInList: (ingredient: string) => boolean;
}

const IngredientsList = ({
  ingredients,
  recipeName,
  creatorName,
  isAuthenticated,
  isProcessing,
  allIngredientsAdded,
  onNavigateToList,
  onToggleAllIngredients,
  onToggleIngredient,
  isIngredientInList
}: IngredientsListProps) => {
  const [loadingIngredients, setLoadingIngredients] = useState<Set<string>>(new Set());

  const handleIngredientToggle = async (ingredient: string) => {
    if (loadingIngredients.has(ingredient)) return;
    
    setLoadingIngredients(prev => {
      const next = new Set(prev);
      next.add(ingredient);
      return next;
    });

    try {
      await onToggleIngredient(ingredient);
    } finally {
      setLoadingIngredients(prev => {
        const next = new Set(prev);
        next.delete(ingredient);
        return next;
      });
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Ingredients</h2>
        {isAuthenticated && (
          <div className="flex flex-col md:flex-row gap-3">
            <button
              onClick={onNavigateToList}
              className="flex items-center justify-center gap-2 px-4 py-3 md:py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors w-full md:w-auto"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>View Shopping List</span>
            </button>
            <button
              onClick={onToggleAllIngredients}
              disabled={isProcessing}
              className={`flex items-center justify-center gap-2 px-4 py-3 md:py-2 rounded-full transition-colors w-full md:w-auto ${
                allIngredientsAdded
                  ? 'bg-red-100 text-red-800 hover:bg-red-200'
                  : 'bg-amber-600 text-white hover:bg-amber-700'
              } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
              aria-busy={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : allIngredientsAdded ? (
                <>
                  <Trash2 className="w-5 h-5" />
                  <span>Remove All from List</span>
                </>
              ) : (
                <>
                  <ListPlus className="w-5 h-5" />
                  <span>Add All to List</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
      <ul className="space-y-2 mb-6">
        {ingredients.map((ingredient, index) => (
          <li 
            key={index} 
            className="flex items-center justify-between py-2 px-4 rounded-lg hover:bg-gray-50"
          >
            <span className="text-gray-600 pr-4">{ingredient}</span>
            {isAuthenticated && (
              <ToggleButton
                isToggled={isIngredientInList(ingredient)}
                onToggle={() => handleIngredientToggle(ingredient)}
                isLoading={loadingIngredients.has(ingredient)}
              />
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default IngredientsList;