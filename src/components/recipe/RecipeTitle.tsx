import React from 'react';
import { Bookmark, BookmarkCheck, Loader2 } from 'lucide-react';

interface RecipeTitleProps {
  title: string;
  isRecipeSaved?: boolean;
  onSaveToggle?: () => void;
  showSaveButton?: boolean;
  isSaving?: boolean;
}

const RecipeTitle = ({
  title,
  isRecipeSaved,
  onSaveToggle,
  showSaveButton,
  isSaving
}: RecipeTitleProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
      {showSaveButton && (
        <button
          onClick={onSaveToggle}
          disabled={isSaving}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
            isRecipeSaved
              ? 'bg-amber-100 text-amber-800'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          } ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isSaving ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Saving...</span>
            </>
          ) : isRecipeSaved ? (
            <>
              <BookmarkCheck className="w-5 h-5" />
              <span>Saved</span>
            </>
          ) : (
            <>
              <Bookmark className="w-5 h-5" />
              <span>Save Recipe</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default RecipeTitle;