import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Utensils } from 'lucide-react';

const categories = [
  { 
    id: 'rice',
    name: 'Rice', 
    image: 'https://img.freepik.com/free-vector/detailed-nasi-lemak-dish_52683-62627.jpg?t=st=1741848375~exp=1741851975~hmac=8eaa36864fb6169074982d96aa36834a9e8810cc8ada3fbe21863418aa20c35d&w=1060',
    count: '45+',
    description: 'From Nasi Lemak to Nasi Goreng'
  },
  { 
    id: 'noodles',
    name: 'Noodles', 
    image: 'https://img.freepik.com/free-photo/high-angle-delicious-shrimp-meal_23-2148771278.jpg?t=st=1741848849~exp=1741852449~hmac=062ac2df480cb36bf4b788b3952d03f0ecccbb1edeb14951df76b383b2f24075&w=740',
    count: '30+',
    description: 'Laksa, Mee Goreng & more'
  },
  { 
    id: 'curries',
    name: 'Curries', 
    image: 'https://images.unsplash.com/photo-1631292784640-2b24be784d5d?auto=format&fit=crop&q=80&w=2000',
    count: '25+',
    description: 'Rich & flavorful curry dishes'
  },
  { 
    id: 'meat',
    name: 'Meat', 
    image: 'https://img.freepik.com/free-photo/delicious-goulash-ready-dinner_23-2149370897.jpg?t=st=1741848870~exp=1741852470~hmac=c6fbf20679257920eddf0f3cfd3a6f2c79ab6a90394d9402e29d32d998212d38&w=740',
    count: '40+',
    description: 'Delicious Malaysian meat specialties'
  }
];

const FeaturedCategories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  const handleViewAllClick = () => {
    navigate('/categories');
  };

  return (
    <section className="mb-12 md:mb-24">
      <div className="flex items-center justify-between mb-6 md:mb-12">
        <div>
          <div className="flex items-center gap-2 mb-1 md:mb-2">
            <Utensils className="w-5 h-5 md:w-6 md:h-6 text-amber-600" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">Recipe Categories</h2>
          </div>
          <p className="text-sm md:text-base text-gray-600">Explore Malaysia's diverse culinary traditions</p>
        </div>
        <button 
          onClick={handleViewAllClick}
          className="px-4 md:px-6 py-2 border-2 border-amber-600 text-amber-600 rounded-full hover:bg-amber-600 hover:text-white transition-colors text-sm md:text-base"
        >
          All Categories
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {categories.map((category) => (
          <button 
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className="group relative overflow-hidden rounded-xl md:rounded-2xl cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2"
          >
            <div className="aspect-square md:aspect-[4/3]">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
              <div className="absolute bottom-2 md:bottom-6 left-2 md:left-6 right-2 md:right-6">
                <h3 className="text-base md:text-xl font-bold text-white mb-1 md:mb-2">{category.name}</h3>
                <p className="text-xs md:text-sm text-gray-300 mb-2 md:mb-3 line-clamp-2">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs md:text-sm text-amber-400">{category.count} recipes</span>
                  <span className="hidden md:inline text-white text-sm group-hover:translate-x-2 transition-transform">
                    Explore →
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;