import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CookingPot , Croissant, ChefHat, Instagram, Facebook, Youtube } from 'lucide-react';
import Home from './pages/Home';
import CreatorPage from './pages/CreatorPage';
import CreatorsPage from './pages/CreatorsPage';
import RecipeDetails from './pages/RecipeDetails';
import ProfilePage from './pages/ProfilePage';
import CategoryPage from './pages/CategoryPage';
import CategoriesPage from './pages/CategoriesPage';
import AboutPage from './pages/AboutPage';
import ManageRecipePage from './pages/admin/ManageRecipePage';
import CreateRecipePage from './pages/admin/CreateRecipePage';
import EditRecipePage from './pages/admin/EditRecipePage';
import ManageCreatorsPage from './pages/admin/ManageCreatorsPage';
import CreateCreatorPage from './pages/admin/CreateCreatorPage';
import EditCreatorPage from './pages/admin/EditCreatorPage';
import Header from './components/Header';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Ensure the whole page takes full height */}
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 to-white">
          <Header />
          
          {/* Main should grow to push footer down */}
          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/creators" element={<CreatorsPage />} />
              <Route path="/creator/:creatorId" element={<CreatorPage />} />
              <Route path="/recipe/:creatorId/:recipeId" element={<RecipeDetails />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/category/:categoryId" element={<CategoryPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/admin/recipes" element={<ManageRecipePage />} />
              <Route path="/admin/recipes/new" element={<CreateRecipePage />} />
              <Route path="/admin/recipes/edit/:recipeId" element={<EditRecipePage />} />
              <Route path="/admin/creators" element={<ManageCreatorsPage />} />
              <Route path="/admin/creators/new" element={<CreateCreatorPage />} />
              <Route path="/admin/creators/edit/:creatorId" element={<EditCreatorPage />} />
            </Routes>
          </main>

          {/* Footer stays at bottom */}
          <footer className="bg-gray-900 text-white py-12 mt-16 md:mt-24">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <div className="flex items-center mb-6 md:mb-0">
                  <CookingPot className="w-8 h-8 mr-2" />
                  <span className="text-xl font-bold">Resepi Land</span>
                </div>
                <div className="flex gap-6">
                  <Instagram className="w-6 h-6 hover:text-amber-400 cursor-pointer" />
                  <Facebook className="w-6 h-6 hover:text-amber-400 cursor-pointer" />
                  <Youtube className="w-6 h-6 hover:text-amber-400 cursor-pointer" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-gray-400">&copy; 2024 Resepi Land. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}


export default App;