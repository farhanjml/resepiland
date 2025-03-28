import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, ChefHat } from 'lucide-react';
import { SavedRecipe } from '../../types/database';
import { getRecipeById } from '../../lib/recipes';

interface SavedRecipesProps {
  recipes: SavedRecipe[];
}

interface FullRecipe {
  id: string;
  title: string;
  image: string;
  cook_time: string;
  servings: string;
  category: string;
  description: string;
  creator?: {
    id: string;
    name: string;
  };
}

const SavedRecipes = ({ recipes: savedRecipes }: SavedRecipesProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [fullRecipes, setFullRecipes] = useState<FullRecipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const recipesData = await Promise.all(
          savedRecipes.map(saved => getRecipeById(saved.recipe_id))
        );
        setFullRecipes(recipesData.filter((r): r is FullRecipe => r !== null));
      } catch (error) {
        console.error('Error loading saved recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    if (savedRecipes.length > 0) {
      loadRecipes();
    } else {
      setLoading(false);
    }
  }, [savedRecipes]);

  const categories = ['all', ...new Set(fullRecipes.map(recipe => recipe.category))];

  const filteredRecipes = fullRecipes.filter(recipe => {
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        recipe.creator?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-lg">
                <div className="aspect-[3/2] bg-gray-200 rounded-t-lg"></div>
                <div className="p-3 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
      <div className="flex flex-col gap-4 mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">My Cookbook</h2>
          <p className="text-sm md:text-base text-gray-600">{filteredRecipes.length} of {fullRecipes.length} recipes</p>
        </div>
        
        <input
          type="text"
          placeholder="Search your recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-base"
        />

        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-full transition-colors whitespace-nowrap text-sm ${
                selectedCategory === category
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {category === 'all' 
                ? 'All Recipes'
                : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filteredRecipes.length === 0 ? (
        <div className="text-center py-12">
          <ChefHat className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-base text-gray-600">
            {fullRecipes.length === 0 
              ? 'No recipes found in your cookbook.'
              : 'No recipes match your current filters.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {filteredRecipes.map(recipe => (
            <Link
              key={recipe.id}
              to={`/recipe/${recipe.creator?.id}/${recipe.id}`}
              className="bg-white rounded-lg overflow-hidden hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="aspect-[3/2] relative">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                    {recipe.category}
                  </span>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-medium text-gray-800 mb-1 line-clamp-1 text-base">
                  {recipe.title}
                </h3>
                {recipe.creator && (
                  <p className="text-sm text-gray-500 mb-2">by {recipe.creator.name}</p>
                )}
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{recipe.cook_time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{recipe.servings}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedRecipes;