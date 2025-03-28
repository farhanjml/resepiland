import React from 'react';
import { ChefHat, Users, BookOpen, Star } from 'lucide-react';

const stats = [
  { icon: ChefHat, label: 'Expert Chefs', value: '50+' },
  { icon: Users, label: 'Community Members', value: '50K+' },
  { icon: BookOpen, label: 'Recipes', value: '300+' },
  { icon: Star, label: 'Recipe Reviews', value: '10K+' },
];

const CommunitySection = () => {
  return (
    <section className="mb-24">
      <div className="bg-gradient-to-br from-amber-50 via-amber-100/50 to-amber-50 rounded-3xl p-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Join Malaysia's Largest
            <span className="text-amber-600 block">Cooking Community</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Connect with fellow food enthusiasts, share your recipes, and learn from Malaysia's best home cooks
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-600 mb-4">
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-amber-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-amber-700 transition-colors">
            Join Now - It's Free
          </button>
          <button className="bg-white text-amber-600 px-8 py-3 rounded-full font-semibold hover:bg-amber-50 transition-colors">
            Browse Recipes
          </button>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;