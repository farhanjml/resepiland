import React from 'react';
import GlobalSearchBar from './GlobalSearchBar';

const Hero = () => {
  return (
    <div className="relative pt-16">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1624181208862-fb161e2c6dd8?auto=format&fit=crop&q=80&w=2000"
          alt="Malaysian Food Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-amber-100/80 to-white"></div>
      </div>

      <div className="relative">
        <div className="container mx-auto px-4 pt-24 pb-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Discover the Best of
              <span className="text-amber-900 block">Malaysian Cuisine</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Explore authentic recipes from Malaysia's top food content creators, all in one place.
            </p>

            <div className="relative max-w-2xl mx-auto">
              <GlobalSearchBar />
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <span className="px-4 py-2 bg-white/80 rounded-full shadow-sm">Nasi Lemak</span>
              <span className="px-4 py-2 bg-white/80 rounded-full shadow-sm">Rendang</span>
              <span className="px-4 py-2 bg-white/80 rounded-full shadow-sm">Roti Canai</span>
              <span className="px-4 py-2 bg-white/80 rounded-full shadow-sm">Laksa</span>
              <span className="px-4 py-2 bg-white/80 rounded-full shadow-sm">Satay</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;