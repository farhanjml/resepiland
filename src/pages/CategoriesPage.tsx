import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Search } from 'lucide-react';

const categories = [
  { 
    id: 'rice',
    name: 'Rice', 
    image: 'https://img.freepik.com/free-vector/detailed-nasi-lemak-dish_52683-62627.jpg?t=st=1741848375~exp=1741851975~hmac=8eaa36864fb6169074982d96aa36834a9e8810cc8ada3fbe21863418aa20c35d&w=1060',
    count: '45+',
    description: 'From Nasi Lemak to Nasi Goreng'
  },
  { 
    id: 'meat',
    name: 'Meat', 
    image: 'https://img.freepik.com/free-photo/delicious-goulash-ready-dinner_23-2149370897.jpg?t=st=1741848870~exp=1741852470~hmac=c6fbf20679257920eddf0f3cfd3a6f2c79ab6a90394d9402e29d32d998212d38&w=740',
    count: '40+',
    description: 'From dishes like Rendang and Satay'
  },
  { 
    id: 'noodles',
    name: 'Noodles', 
    image: 'https://img.freepik.com/free-photo/high-angle-delicious-shrimp-meal_23-2148771278.jpg?t=st=1741848849~exp=1741852449~hmac=062ac2df480cb36bf4b788b3952d03f0ecccbb1edeb14951df76b383b2f24075&w=740',
    count: '30+',
    description: 'From meals such as Char Kuey Teow and Laksa.'
  },
  { 
    id: 'curries',
    name: 'Curries', 
    image: 'https://images.unsplash.com/photo-1631292784640-2b24be784d5d?auto=format&fit=crop&q=80&w=800',
    count: '25+',
    description: 'From Gulai Ayam to Kari Ikan.'
  },
  { 
    id: 'drinks and desserts',
    name: 'Drinks and Desserts', 
    image: 'https://img.freepik.com/free-photo/lychee-jelly-seasonal-fruit-beautifully-decorated-thai-dessert-concept_1150-23473.jpg?t=st=1742993948~exp=1742997548~hmac=1fd9aea71a86df4acad462d203e138fbd034699b46d699b5ebecc6c98af1300e&w=740',
    count: '35+',
    description: 'From Cendol, Ais Kacang, and Kuih-Muih to Teh Tarik and Air Bandung.'
  },
  { 
    id: 'vegetable',
    name: 'Vegetables', 
    image: 'https://img.freepik.com/free-photo/sweet-pork-wooden-bowl-with-cucumber-long-beans-tomatoes-side-dishes_1150-23042.jpg?t=st=1742993970~exp=1742997570~hmac=3b857b4cc9e21c316af4b5a51633933726855562c9db8495e622b01fa2387e08&w=996',
    count: '90+',
    description: 'Dishes like Kangkung Belacan.'
  },
   { 
    id: 'fish',
    name: 'Fish', 
    image: 'https://img.freepik.com/free-photo/spicy-fried-tubtim-fish-salad-spicy-thai-food_1150-26481.jpg?t=st=1742994017~exp=1742997617~hmac=6021fcc6f0685abf84a59a9d7cb44b4e20fb816d38a984a1361c1d65a8ca0766&w=996',
    count: '30+',
    description: 'Ikan Bakar, Asam Pedas, and Gulai Ikan'
  },
   { 
    id: 'seafood',
    name: 'Seafood', 
    image: 'https://img.freepik.com/free-photo/shrimp-salad-with-vegetables-table_140725-5461.jpg?t=st=1742994077~exp=1742997677~hmac=3b941d3b24bfc171539698764d343250d6df759e1d64525b5c5a21c83e64d8ff&w=740',
    count: '45+',
    description: 'Sambal Udang, Sotong Goreng, and Butter Prawns.'
  },
   { 
    id: 'snack and appetizers',
    name: 'Snack and Appetizers', 
    image: 'https://img.freepik.com/free-photo/close-up-fried-banana_23-2151006046.jpg?t=st=1742994518~exp=1742998118~hmac=47ca0cc4963c94ead4563f06cb96a9884a67df63b9dc129c399782ebc0b46ee7&w=996',
    count: '45+',
    description: 'Pisang Goreng, Popiah, and Keropok Lekor.'
  }
];

const CategoriesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-16 md:pt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
          <Utensils className="w-12 h-12 text-amber-600 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 md:mb-4">Recipe Categories</h1>
          <p className="text-lg md:text-xl text-gray-600">
            Explore our collection of authentic Malaysian recipes by category
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-8 md:mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {filteredCategories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group relative overflow-hidden rounded-xl cursor-pointer aspect-square md:aspect-[16/9]"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                <div className="absolute bottom-2 md:bottom-8 left-2 md:left-8 right-2 md:right-8">
                  <h2 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-2">{category.name}</h2>
                  <p className="text-sm md:text-lg text-gray-300 mb-2 md:mb-4 line-clamp-2">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm md:text-base text-amber-400">{category.count} recipes</span>
                    <span className="hidden md:inline text-white group-hover:translate-x-2 transition-transform">
                      Browse Category →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;