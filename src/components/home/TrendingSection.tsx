import React from 'react';
import { Flame, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRecipes } from '../../hooks/useRecipes';

const TrendingSection = () => {
  const { recipes, loading, error } = useRecipes();

  if (loading) {
    return (
      <section className="container mx-auto px-4 mb-12 md:mb-24 relative z-10">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-2xl h-48 md:h-96"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container mx-auto px-4 mb-12 md:mb-24 relative z-10">
        <div className="text-center py-12">
          <p className="text-gray-600">Failed to load trending recipes</p>
        </div>
      </section>
    );
  }

  // Get first 3 recipes for trending section
  const trendingRecipes = recipes.slice(0, 3);

  return (
    <section className="container mx-auto px-4 py-6 md:py-12 mb-12 md:mb-24 relative z-10">
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 md:px-4 md:py-2 rounded-full shadow-sm w-fit mb-2 md:mb-3">
          <Flame className="w-5 h-5 md:w-6 md:h-6 text-amber-600" />
          <h2 className="text-lg md:text-xl font-bold text-gray-800">Trending Now</h2>
        </div>
        <p className="text-sm md:text-base text-gray-600 max-w-2xl">
          Learn from Malaysia's most talented food creators and their signature recipes
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {trendingRecipes.map((recipe) => (
          <Link
            key={recipe.id}
            to={`/recipe/${recipe.creator_id}/${recipe.id}`}
            className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
          >
            <div className="relative h-40 md:h-64">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4">
                <h3 className="text-white text-sm md:text-xl font-bold mb-1 md:mb-2 line-clamp-2">{recipe.title}</h3>
                {recipe.creator && (
                  <div className="flex items-center gap-2">
                    <img
                      src={recipe.creator.image}
                      alt={recipe.creator.name}
                      className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white"
                    />
                    <span className="text-white text-xs md:text-sm">{recipe.creator.name}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="p-2 md:p-4">
              <div className="flex items-center justify-between text-xs md:text-sm text-gray-600">
                <div className="flex items-center gap-1 md:gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{recipe.cook_time}</span>
                </div>
                <div className="flex items-center gap-1 md:gap-2">
                  <Users className="w-4 h-4" />
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

export default TrendingSection;