import React from 'react';

interface RecipeFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const RecipeFilters = ({ categories, selectedCategory, onCategoryChange }: RecipeFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full transition-colors ${
            selectedCategory === category
              ? 'bg-amber-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default RecipeFilters;