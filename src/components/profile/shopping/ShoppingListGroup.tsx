import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Copy, Check, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ShoppingListItem } from '../../../types/database';
import { formatShoppingList } from '../../../utils/clipboard';

interface ShoppingListGroupProps {
  recipeName: string;
  recipeId: string;
  creatorId?: string;
  creatorName?: string;
  items: ShoppingListItem[];
}

const ShoppingListGroup = ({ 
  recipeName, 
  recipeId,
  creatorId,
  creatorName,
  items
}: ShoppingListGroupProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const handleCopy = async () => {
    const text = formatShoppingList(recipeName, items, creatorName);
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    const text = formatShoppingList(recipeName, items, creatorName);
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Shopping List for ${recipeName}`,
          text: text
        });
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      // Fallback to copy if share is not available
      await handleCopy();
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-gray-800">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            {isExpanded ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronUp className="w-5 h-5" />
            )}
          </button>
          <div className="text-left">
            {creatorId ? (
              <Link 
                to={`/recipe/${creatorId}/${recipeId}`}
                className="font-medium hover:text-amber-600 transition-colors"
              >
                {recipeName}
              </Link>
            ) : (
              <span className="font-medium">{recipeName}</span>
            )}
            {creatorName && (
              <span className="text-sm text-gray-500 block">by {creatorName}</span>
            )}
          </div>
          <span className="text-sm text-gray-500 ml-2">({items.length})</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className={`p-2 rounded-lg transition-colors ${
              copied 
                ? 'bg-green-100 text-green-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title={copied ? 'Copied!' : 'Copy list'}
          >
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={handleShare}
            className={`p-2 rounded-lg transition-colors ${
              shared
                ? 'bg-amber-100 text-amber-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title="Share list"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isExpanded && (
        <ul className="mt-2 space-y-1">
          {items.map((item) => (
            <li 
              key={item.id}
              className="flex items-center justify-between py-1 px-3 rounded hover:bg-gray-50"
            >
              <span className="text-gray-600">{item.ingredient}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShoppingListGroup;