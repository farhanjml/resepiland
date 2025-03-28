import React, { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface IngredientButtonProps {
  recipeId: string;
  ingredient: string;
  isInList: boolean;
  onAdd: () => Promise<void>;
  onRemove: () => Promise<void>;
  disabled?: boolean;
}

const IngredientButton = ({ 
  recipeId, 
  ingredient, 
  isInList, 
  onAdd,
  onRemove,
  disabled 
}: IngredientButtonProps) => {
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClick = async () => {
    if (!user || isProcessing) return;
    
    setIsProcessing(true);
    try {
      if (isInList) {
        await onRemove();
      } else {
        await onAdd();
      }
    } finally {
      setIsProcessing(false);
    }
  };

  if (!user) return null;

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isProcessing}
      className={`p-1 rounded-full transition-all duration-200 ${
        isInList
          ? 'bg-green-100 text-green-600 hover:bg-red-100 hover:text-red-600'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      } ${isProcessing ? 'opacity-50' : ''}`}
      title={isInList ? 'Remove from shopping list' : 'Add to shopping list'}
    >
      {isInList ? (
        <Check className="w-5 h-5" />
      ) : (
        <Plus className="w-5 h-5" />
      )}
    </button>
  );
};

export default IngredientButton;