import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChefHat, Search } from 'lucide-react';
import { useRecipes } from '../hooks/useRecipes';
import RecipeCard from '../components/RecipeCard';

const categories = {
  'rice': {
    title: 'Rice',
    description: 'Discover Malaysia’s rich variety of rice dishes, from Nasi Lemak to Nasi Kerabu.',
    image: 'https://images.unsplash.com/photo-1682988771291-da784f151ef7?q=80&w=1974&auto=format&fit=crop'
  },
  'meat': {
    title: 'Meat',
    description: 'Savor iconic Malaysian meat dishes like Rendang, Satay, and Ayam Percik.',
    image: 'https://images.unsplash.com/photo-1732589306925-b26b2153a9c8?q=80&w=1974&auto=format&fit=crop'
  },
  'noodles': {
    title: 'Noodles',
    description: 'Enjoy flavorful Malaysian noodle dishes, from Char Kuey Teow to Laksa.',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=2000'
  },
  'curries': {
    title: 'Curries',
    description: 'Indulge in aromatic curries infused with rich spices and coconut milk.',
    image: 'https://images.unsplash.com/photo-1631292784640-2b24be784d5d?auto=format&fit=crop&q=80&w=2000'
  },
  'drinks and desserts': {
    title: 'Drinks and Desserts',
    description: 'Cool down with sweet treats like Cendol and Teh Tarik.',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=2127&auto=format&fit=crop'
  },
  'vegetable': {
    title: 'Vegetables',
    description: 'Explore fresh and flavorful vegetable dishes like Kangkung Belacan and Sayur Lodeh.',
    image: 'https://img.freepik.com/free-photo/front-view-pearl-barley-with-tasty-cooked-vegetable_140725-103319.jpg?t=st=1742995002~exp=1742998602~hmac=b5af1183dda7a5b6fb03ad6ba0ec1501b52e4c417f9020a2cc8e7d2569c4eb1a&w=740'
  },
  'fish': {
    title: 'Fish',
    description: 'Enjoy classic fish dishes like Ikan Bakar and Asam Pedas.',
    image: 'https://img.freepik.com/free-photo/close-up-fried-whole-fish-served-with-sauce_140725-8699.jpg?w=826'
  },
  'seafood': {
    title: 'Seafood',
    description: 'Delight in seafood specialties such as Butter Prawns and Sambal Udang.',
    image: 'https://img.freepik.com/free-photo/sukiyaki-seafood-served-with-suki-spicy-sauce_1150-27333.jpg?t=st=1742994969~exp=1742998569~hmac=89812b3dc6dc18a696c224900bf9ca7485e5c74a58f7768fa80892ac827dc9a8&w=996'
  },
  'snack and appetizers': {
    title: 'Snacks & Appetizers',
    description: 'Try popular street food bites like Keropok Lekor and Popiah.',
    image: 'https://img.freepik.com/free-photo/fried-tofu-healthy-food_1339-8243.jpg?w=900'
  },
};

const CategoryPage = () => {
  const { categoryId } = useParams();
  const { recipes, loading, error } = useRecipes();
  const [searchQuery, setSearchQuery] = useState('');

  const category = categoryId ? categories[categoryId as keyof typeof categories] : null;

  if (!category) {
    return <div>Category not found</div>;
  }

  const filteredRecipes = recipes.filter(recipe => {
    const normalizedRecipeCategory = recipe.category.toLowerCase().trim();
    const normalizedSearchCategory = categoryId?.toLowerCase().replace(/-/g, ' ').trim();
    
    const matchesCategory = normalizedRecipeCategory === normalizedSearchCategory;
    const matchesSearch = !searchQuery || 
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <div className="relative h-[300px] md:h-[500px]">
        <img
          src={category.image}
          alt={category.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 text-white p-4 md:p-8">
          <div className="container mx-auto">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-2 md:mb-4">
                <ChefHat className="w-6 h-6 md:w-8 md:h-8 text-amber-400" />
                <h1 className="text-2xl md:text-4xl font-bold">{category.title}</h1>
              </div>
              <p className="text-base md:text-xl text-gray-200">{category.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="max-w-2xl mx-auto mb-6 md:mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={`Search ${category.title.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-4 md:gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 md:h-64 rounded-xl mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 md:h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 md:h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Failed to load recipes</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {filteredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  {...recipe}
                />
              ))}
            </div>

            {filteredRecipes.length === 0 && (
              <div className="text-center py-12">
                <ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No recipes found in this category.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;