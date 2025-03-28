import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface RecipeHeaderProps {
  image: string;
  creatorId: string;
}

const RecipeHeader = ({
  image,
  creatorId
}: RecipeHeaderProps) => {
  return (
    <div className="relative h-[500px]">
      <img
        src={image}
        alt="Recipe cover"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <Link
        to={`/creator/${creatorId}`}
        className="absolute top-8 left-8 flex items-center gap-2 text-white hover:text-amber-400 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Creator</span>
      </Link>
    </div>
  );
};

export default RecipeHeader;