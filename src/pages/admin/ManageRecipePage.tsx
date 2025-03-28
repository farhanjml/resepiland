import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat, Plus, Pencil, Trash2, Search, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Recipe } from '../../types/database';
import * as recipesApi from '../../lib/recipes';

const ManageRecipePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    loadRecipes();
  }, [user, navigate]);

  const loadRecipes = async () => {
    try {
      setLoading(true);
      const data = await recipesApi.getRecipes();
      setRecipes(data);
    } catch (error) {
      console.error('Error loading recipes:', error);
      alert('Failed to load recipes');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this recipe? This action cannot be undone.')) {
      return;
    }

    try {
      setDeleting(id);
      await recipesApi.deleteRecipe(id);
      setRecipes(prev => prev.filter(recipe => recipe.id !== id));
    } catch (error) {
      console.error('Error deleting recipe:', error);
      alert('Failed to delete recipe');
    } finally {
      setDeleting(null);
    }
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.creator?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Please login to manage recipes</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Manage Recipes</h1>
          <button
            onClick={() => navigate('/admin/recipes/new')}
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>New Recipe</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <Loader2 className="w-12 h-12 text-amber-600 mx-auto mb-4 animate-spin" />
              <p className="text-gray-600">Loading recipes...</p>
            </div>
          ) : filteredRecipes.length === 0 ? (
            <div className="p-8 text-center">
              <ChefHat className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No recipes found</p>
            </div>
          ) : (
            <div className="divide-y">
              {filteredRecipes.map((recipe) => (
                <div key={recipe.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-800">{recipe.title}</h3>
                      <p className="text-sm text-gray-500 truncate">{recipe.description}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="inline-block px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded-full">
                          {recipe.category}
                        </span>
                        {recipe.creator && (
                          <span className="text-sm text-gray-500">
                            by {recipe.creator.name}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/admin/recipes/edit/${recipe.id}`)}
                        className="p-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(recipe.id)}
                        disabled={deleting === recipe.id}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {deleting === recipe.id ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Trash2 className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageRecipePage;