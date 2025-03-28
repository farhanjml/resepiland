import React from 'react';

interface RecipeInstructionsProps {
  instructions: string[];
}

const RecipeInstructions = ({ instructions }: RecipeInstructionsProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Instructions</h2>
      <ol className="space-y-4">
        {instructions.map((step, index) => (
          <li key={index} className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-amber-100 text-amber-800 rounded-full font-medium">
              {index + 1}
            </span>
            <p className="text-gray-600 flex-1 pt-1">{step}</p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeInstructions;