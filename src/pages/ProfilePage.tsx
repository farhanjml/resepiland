import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UserCircle, LogOut, BookmarkCheck, ShoppingBag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getSavedRecipes, getShoppingList } from '../lib/profile';
import SavedRecipes from '../components/profile/SavedRecipes';
import ShoppingList from '../components/profile/ShoppingList';
import { SavedRecipe, ShoppingListItem } from '../types/database';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'saved' | 'shopping'>('saved');
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([]);
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'shopping') {
      setActiveTab('shopping');
    }
  }, [searchParams]);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    const loadUserData = async () => {
      try {
        const [recipes, items] = await Promise.all([
          getSavedRecipes(user.id),
          getShoppingList(user.id)
        ]);
        setSavedRecipes(recipes);
        setShoppingList(items);
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [user, navigate]);

  if (!user || loading) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-4 md:py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-8 mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-amber-100 p-3 md:p-4 rounded-full">
              <UserCircle className="w-12 h-12 md:w-16 md:h-16 text-amber-600" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">{user.user_metadata?.name || 'User'}</h1>
              <p className="text-sm md:text-base text-gray-600">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => logout()}
            className="flex items-center justify-center gap-2 w-full md:w-auto px-4 py-3 md:py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 md:gap-4 mb-6 md:mb-8 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('saved')}
          className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full font-medium transition-colors whitespace-nowrap ${
            activeTab === 'saved'
              ? 'bg-amber-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <BookmarkCheck className="w-5 h-5" />
          <span>Saved Recipes</span>
        </button>
        <button
          onClick={() => setActiveTab('shopping')}
          className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full font-medium transition-colors whitespace-nowrap ${
            activeTab === 'shopping'
              ? 'bg-amber-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Shopping List</span>
          {shoppingList.length > 0 && (
            <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-sm">
              {shoppingList.length}
            </span>
          )}
        </button>
      </div>

      {activeTab === 'saved' ? (
        <SavedRecipes recipes={savedRecipes} />
      ) : (
        <ShoppingList items={shoppingList} />
      )}
    </div>
  );
};

export default ProfilePage;