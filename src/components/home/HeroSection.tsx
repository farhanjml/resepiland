import React, { useState } from 'react';
import GlobalSearchBar from '../GlobalSearchBar';

const HeroSection = () => {
  const [currentSearch, setCurrentSearch] = useState('');

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1622003275933-fc87f54913ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Malaysian Food Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 pt-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Resepi Land
            <span className="text-orange-500 block mt-2">Malaysian Culinary</span>
          </h1>
          <p className="text-xl text-white mb- drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
            Explore a collection of recipes from Malaysia's top food content creators.
          </p>
          <p className="text-xl text-white mb-12 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
             All in one place.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <GlobalSearchBar value={currentSearch} onSearchChange={setCurrentSearch} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;