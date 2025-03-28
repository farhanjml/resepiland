import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import { Creator } from '../../types/database';

interface CreatorInfoProps {
  creator: Creator;
}

const CreatorInfo = ({ creator }: CreatorInfoProps) => {
  return (
    <div className="flex items-center justify-between mb-8 pb-8 border-b">
      <div className="flex items-center gap-4">
        <img
          src={creator.image}
          alt={creator.name}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h3 className="font-medium text-gray-800">{creator.name}</h3>
          <Link
            to={`/creator/${creator.id}`}
            className="text-amber-600 text-sm hover:text-amber-700"
          >
            View Profile
          </Link>
        </div>
      </div>
      {creator.instagram && (
        <a
          href={`https://instagram.com/${creator.instagram.replace('@', '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:opacity-90 transition-opacity"
        >
          <Instagram className="w-5 h-5" />
          <span>Follow on Instagram</span>
        </a>
      )}
    </div>
  );
};

export default CreatorInfo;