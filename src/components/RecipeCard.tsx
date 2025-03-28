import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users } from 'lucide-react';
import { Recipe } from '../types/database';

interface RecipeCardProps extends Recipe {}

const RecipeCard = ({ 
  id, 
  creator_id, 
  title, 
  image, 
  cook_time, 
  servings, 
  category, 
  description,
  creator 
}: RecipeCardProps) => {
  return (
    <Link 
      to={`/recipe/${creator_id}/${id}`}
      className="group block bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-gray-800 text-sm font-medium rounded-full shadow-sm">
            {category}
          </span>
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="px-6 py-2 bg-amber-500 text-white rounded-full transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            View Recipe
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors">
          {title}
        </h3>
        
        {creator && (
          <p className="text-sm text-gray-600 mb-4">by {creator.name}</p>
        )}

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-500" />
            <span>{cook_time}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-amber-500" />
            <span>{servings}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;