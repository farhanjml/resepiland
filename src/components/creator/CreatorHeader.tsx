import React from 'react';
import { Instagram, Youtube, ShoppingBag, GitBranch as TikTok } from 'lucide-react';
import { Creator } from '../../types/database';

interface CreatorHeaderProps extends Creator {}

const CreatorHeader = ({ 
  name, 
  image, 
  cover_image, 
  description, 
  instagram, 
  followers,
  youtube,
  tiktok,
  shopee 
}: CreatorHeaderProps) => {
  // Format TikTok URL correctly
  const getTikTokUrl = (handle: string) => {
    // Remove @ if present and ensure proper URL format
    const username = handle.startsWith('@') ? handle.slice(1) : handle;
    return `https://www.tiktok.com/@${username}`;
  };

  return (
    <div className="relative">
      <div className="h-[300px] w-full relative">
        <img
          src={cover_image}
          alt={`${name}'s cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
      </div>
      
      <div className="container mx-auto px-4">
        <div className="relative -mt-24">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <img
                src={image}
                alt={name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{name}</h1>
                <p className="text-gray-600 mb-4 max-w-2xl">{description}</p>
                
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  {instagram && (
                    <a
                      href={`https://instagram.com/${instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:opacity-90 transition-opacity"
                    >
                      <Instagram className="w-5 h-5" />
                      <span>{instagram}</span>
                    </a>
                  )}
                  
                  {youtube && (
                    <a
                      href={youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                    >
                      <Youtube className="w-5 h-5" />
                      <span>YouTube</span>
                    </a>
                  )}

                  {tiktok && (
                    <a
                      href={getTikTokUrl(tiktok)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                    >
                      
                      <span>TikTok</span>
                    </a>
                  )}

                  {shopee && (
                    <a
                      href={shopee}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      <span>Shopee</span>
                    </a>
                  )}
                </div>
              </div>
              
              <div className="text-center px-6 py-4 bg-amber-50 rounded-xl">
                <div className="text-2xl font-bold text-amber-600 mb-1">{followers}</div>
                <div className="text-gray-600">Followers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorHeader;