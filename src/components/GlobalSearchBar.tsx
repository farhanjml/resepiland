import React, { useState, useMemo, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRecipes } from '../hooks/useRecipes';

interface GlobalSearchBarProps {
  value?: string;
  onSearchChange?: (query: string) => void;
}

const GlobalSearchBar = ({ value, onSearchChange }: GlobalSearchBarProps) => {
  const [query, setQuery] = useState(value || '');
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const { recipes, loading } = useRecipes();

  // Update internal query when external value changes
  useEffect(() => {
    if (value !== undefined) {
      setQuery(value);
      // Show results if there's a value
      setShowResults(!!value);
    }
  }, [value]);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.search-container')) {
        setShowResults(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const searchResults = useMemo(() => {
    if (!query.trim() || loading) return [];

    const lowerQuery = query.toLowerCase().trim();
    
    return recipes
      .filter(recipe => {
        const titleMatch = recipe.title.toLowerCase().includes(lowerQuery);
        const descMatch = recipe.description.toLowerCase().includes(lowerQuery);
        const categoryMatch = recipe.category.toLowerCase().includes(lowerQuery);
        const creatorMatch = recipe.creator?.name?.toLowerCase().includes(lowerQuery);
        
        return titleMatch || descMatch || categoryMatch || creatorMatch;
      })
      .slice(0, 5);
  }, [query, recipes, loading]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (query.trim() && searchResults.length > 0) {
      handleResultClick(searchResults[0]);
    }
  };

  const handleResultClick = (recipe: typeof searchResults[0]) => {
    navigate(`/recipe/${recipe.creator_id}/${recipe.id}`);
    setShowResults(false);
    setQuery('');
    onSearchChange?.('');
  };

  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowResults(!!query.trim());
  };

  const handleInputFocus = () => {
    if (query.trim()) {
      setShowResults(true);
    }
  };

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
    setShowResults(!!newQuery.trim());
    onSearchChange?.(newQuery);
  };

  return (
    <div className="relative search-container" onClick={(e) => e.stopPropagation()}>
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            onClick={handleInputClick}
            onFocus={handleInputFocus}
            placeholder="Search for recipes..."
            className="w-full pl-12 pr-24 py-4 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent shadow-lg"
          />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {showResults && query.trim() && (
        <div className="absolute w-full mt-2 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden z-50">
          {searchResults.length > 0 ? (
            <ul className="max-h-[400px] overflow-y-auto">
              {searchResults.map((result) => (
                <li key={`${result.creator_id}-${result.id}`}>
                  <button
                    onClick={() => handleResultClick(result)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-4"
                  >
                    <img 
                      src={result.image} 
                      alt={result.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-800 truncate">{result.title}</h4>
                      {result.creator && (
                        <p className="text-sm text-gray-500">by {result.creator.name}</p>
                      )}
                      <p className="text-sm text-gray-600 truncate">{result.description}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-600">
              No recipes found matching "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalSearchBar;