import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturedCategories from '../components/home/FeaturedCategories';
import FeaturedRecipes from '../components/home/FeaturedRecipes';
import FeaturedCreators from '../components/home/FeaturedCreators';
import CommunitySection from '../components/home/CommunitySection';
import TrendingSection from '../components/home/TrendingSection';

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-amber-50/50 to-white">
      <div className="relative">
        <HeroSection />
      </div>
      <div className="container mx-auto px-4">
        <div className="space-y-12 md:space-y-24">
          <TrendingSection />
          <FeaturedCategories />
          <FeaturedRecipes />
          <FeaturedCreators />
          <CommunitySection />
        </div>
      </div>
    </div>
  );
};

export default Home;