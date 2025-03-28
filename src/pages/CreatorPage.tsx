import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import CreatorHeader from '../components/creator/CreatorHeader';
import RecipeFilters from '../components/creator/RecipeFilters';
import RecipeGrid from '../components/creator/RecipeGrid';
import SearchBar from '../components/SearchBar';
import { useCreator } from '../hooks/useCreators';
import { ChefHat } from 'lucide-react';

const CreatorPage = () => {
  const { creatorId } = useParams();
  const { creator, loading, error } = useCreator(creatorId || '');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ChefHat className="w-16 h-16 text-amber-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading creator profile...</p>
        </div>
      </div>
    );
  }

  if (error || !creator) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ChefHat className="w-16 h-16 text-amber-600 mx-auto mb-4" />
          <p className="text-gray-600">Creator not found</p>
        </div>
      </div>
    );
  }

  const categories = ['all', ...new Set(creator.recipes?.map(recipe => recipe.category) || [])];

  const filteredRecipes = creator.recipes?.filter(recipe => {
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        recipe.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <CreatorHeader {...creator} />
      
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6 md:mb-8">
            <SearchBar 
              placeholder={`Search ${creator.name}'s recipes...`}
              onSearch={setSearchQuery}
              context="creator"
            />
          </div>

          {/* Filters */}
          <RecipeFilters
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          {/* Recipe Grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {filteredRecipes.map(recipe => (
              <Link
                key={recipe.id}
                to={`/recipe/${creator.id}/${recipe.id}`}
                className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                <div className="relative aspect-square">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-3 md:p-4 flex-1">
                  <h3 className="font-medium text-sm md:text-base text-gray-800 mb-1 line-clamp-2 group-hover:text-amber-600 transition-colors">
                    {recipe.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 line-clamp-2">
                    {recipe.description}
                  </p>
                  <div className="mt-2">
                    <span className="inline-block px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded-full">
                      {recipe.category}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorPage;