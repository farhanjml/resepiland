import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import { Creator } from '../../types/database';

interface CreatorSidebarProps {
  creator: Creator;
}

const CreatorSidebar = ({ creator }: CreatorSidebarProps) => {
  // Add debug logging
  console.log('CreatorSidebar - creator data:', creator);
  
  if (!creator) {
    console.log('CreatorSidebar - No creator data');
    return null;
  }

  // Add debug logging for specific fields
  console.log('CreatorSidebar - image URL:', creator.image);
  console.log('CreatorSidebar - name:', creator.name);

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img
            src={creator.image}
            alt={creator.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{creator.name}</h3>
          <Link
            to={`/creator/${creator.id}`}
            className="text-amber-600 hover:text-amber-700 text-sm"
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
          className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:opacity-90 transition-opacity mb-3"
        >
          <Instagram className="w-5 h-5" />
          <span>Follow on Instagram</span>
        </a>
      )}

      {creator.followers && (
        <div className="text-center mt-6">
          <span className="text-sm text-gray-500">
            {creator.followers} followers
          </span>
        </div>
      )}
    </div>
  );
};

export default CreatorSidebar;