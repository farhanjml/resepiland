import React from 'react';
import { Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Creator } from '../types/database';

interface CreatorCardProps extends Creator {}

const CreatorCard = ({ id, name, image, description, instagram, followers }: CreatorCardProps) => {
  return (
    <Link to={`/creator/${id}`}>
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-32 md:h-48">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4">
            <h3 className="text-sm md:text-xl font-bold text-white line-clamp-2">{name}</h3>
          </div>
        </div>
        
        <div className="p-3 md:p-6">
          <p className="text-xs md:text-base text-gray-600 mb-3 md:mb-4 line-clamp-2">{description}</p>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1 md:space-x-2">
              <Instagram className="w-4 h-4 md:w-5 md:h-5 text-pink-600" />
              <span className="text-gray-600 text-xs md:text-sm">{instagram}</span>
            </div>
            <span className="text-xs md:text-sm font-semibold text-gray-500">{followers} followers</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CreatorCard;