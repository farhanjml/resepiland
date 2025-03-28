import React from 'react';
import RecipeCard from '../RecipeCard';
import { Recipe } from '../../types/database';

interface RecipeGridProps {
  recipes: Recipe[];
}

const RecipeGrid = ({ recipes }: RecipeGridProps) => {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl">
        <p className="text-gray-600">No recipes found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {recipes.map(recipe => (
        <RecipeCard 
          key={recipe.id} 
          {...recipe}
        />
      ))}
    </div>
  );
};

export default RecipeGrid;