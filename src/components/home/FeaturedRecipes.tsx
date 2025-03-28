import React from 'react';
import { ChefHat, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRecipes } from '../../hooks/useRecipes';

const FeaturedRecipes = () => {
  const { recipes, loading, error } = useRecipes();

  if (loading) {
    return (
      <section className="mb-12 md:mb-24">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-xl">
                <div className="h-48 md:h-64 bg-gray-200 rounded-t-xl"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 md:h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 md:h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mb-12 md:mb-24">
        <div className="text-center py-12">
          <ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Failed to load recipes</p>
        </div>
      </section>
    );
  }

  const featuredRecipes = recipes.slice(0, 6);

  return (
    <section className="mb-12 md:mb-24">
      <div className="flex items-center justify-between mb-6 md:mb-12">
        <div>
          <div className="flex items-center gap-2 mb-1 md:mb-2">
            <ChefHat className="w-5 h-5 md:w-6 md:h-6 text-amber-600" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">Featured Recipes</h2>
          </div>
          <p className="text-sm md:text-base text-gray-600">Discover our hand-picked selection of Malaysian delicacies</p>
        </div>
        <Link 
          to="/creators" 
          className="inline-flex items-center justify-center px-4 md:px-6 py-2 border-2 border-amber-600 text-amber-600 rounded-full hover:bg-amber-600 hover:text-white transition-colors text-sm md:text-base min-w-[90px]"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {featuredRecipes.map((recipe) => (
          <Link 
            key={recipe.id}
            to={`/recipe/${recipe.creator_id}/${recipe.id}`}
            className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
          >
            <div className="relative aspect-square md:aspect-[4/3] overflow-hidden">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="px-4 py-2 bg-amber-500 text-white text-sm rounded-full transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  View Recipe
                </span>
              </div>
            </div>
            <div className="p-3 md:p-4">
              <h3 className="text-sm md:text-lg font-bold text-gray-800 mb-1 md:mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
                {recipe.title}
              </h3>
              {recipe.creator && (
                <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">By {recipe.creator.name}</p>
              )}
              <div className="flex items-center gap-3 text-xs md:text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span>{recipe.cook_time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-amber-500" />
                  <span>{recipe.servings}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedRecipes;