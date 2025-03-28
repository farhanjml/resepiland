import React from 'react';
import { Users } from 'lucide-react';
import CreatorCard from '../CreatorCard';
import { useCreators } from '../../hooks/useCreators';

const FeaturedCreators = () => {
  const { creators, loading, error } = useCreators();

  if (loading) {
    return (
      <section className="mb-20">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-2xl h-96"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mb-20">
        <div className="text-center py-12">
          <p className="text-gray-600">Failed to load creators</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Users className="w-8 h-8 text-amber-600" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Featured Creators</h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Learn from Malaysia's most talented food creators and their signature recipes
        </p>
      </div>
      
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {creators.slice(0, 6).map((creator) => (
    <CreatorCard key={creator.id} {...creator} />
  ))}
</div>

    </section>
  );
};

export default FeaturedCreators;