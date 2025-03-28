import React from 'react';
import { Clock, Users } from 'lucide-react';

interface RecipeInfoProps {
  cookTime: string;
  servings: string;
  category: string;
  description: string;
}

const RecipeInfo = ({ cookTime, servings, category, description }: RecipeInfoProps) => {
  return (
    <div>
      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-600" />
          <span>{cookTime}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-amber-600" />
          <span>{servings}</span>
        </div>
        <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
          {category}
        </span>
      </div>
      <p className="text-gray-600 mb-6">{description}</p>
    </div>
  );
}

export default RecipeInfo;