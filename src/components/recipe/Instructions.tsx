import React from 'react';

interface InstructionsProps {
  instructions: string[];
}

const Instructions = ({ instructions }: InstructionsProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Instructions</h2>
      <ol className="list-decimal pl-6 mb-6">
        {instructions.map((step, index) => (
          <li key={index} className="text-gray-600 mb-3">{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default Instructions;