import React, { useState } from 'react';
import { Search, Users, ChefHat } from 'lucide-react';
import { useCreators } from '../hooks/useCreators';
import CreatorCard from '../components/CreatorCard';

const CreatorsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { creators, loading, error } = useCreators();

  const filteredCreators = creators.filter(creator =>
    creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    creator.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="animate-pulse space-y-8">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-4 md:p-6 space-y-4">
                  <div className="h-32 md:h-48 bg-gray-200 rounded-xl"></div>
                  <div className="h-4 md:h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 md:h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white">
        <div className="container mx-auto px-4 py-24 text-center">
          <ChefHat className="w-16 h-16 text-amber-600 mx-auto mb-4" />
          <p className="text-gray-600">Failed to load creators</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white">
      <div className="container mx-auto px-4 py-16 md:py-24" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FDE68A' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center'
      }}>
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-amber-100 rounded-full mb-4 md:mb-6">
            <Users className="w-6 h-6 md:w-8 md:h-8 text-amber-600" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-3 md:mb-6">
            Malaysian Food Creators
          </h1>
          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
            Learn authentic Malaysian recipes from our curated selection of talented food creators
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-8 md:mb-16">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by creator name or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 md:py-4 bg-white rounded-full border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent shadow-sm transition-shadow hover:shadow-md"
            />
          </div>
        </div>

        {/* Creators Grid */}
        <div className="max-w-7xl mx-auto">
          {filteredCreators.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {filteredCreators.map((creator) => (
                <CreatorCard key={creator.id} {...creator} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 md:py-16 bg-white rounded-2xl shadow-sm">
              <ChefHat className="w-12 h-12 md:w-16 md:h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">No creators found</h3>
              <p className="text-sm md:text-base text-gray-600">
                Try adjusting your search terms or browse our full creator list
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatorsPage;