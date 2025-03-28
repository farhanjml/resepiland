import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  id: string;
  title: string;
  image: string;
  creatorId?: string;
  creatorName?: string;
  type: 'recipe' | 'category' | 'creator';
}

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  results?: SearchResult[];
  onResultClick?: (result: SearchResult) => void;
  context?: 'home' | 'category' | 'creator' | 'global';
}

const SearchBar = ({ 
  placeholder = "Search for recipes, creators, or dishes...",
  onSearch,
  results = [],
  onResultClick,
  context = 'global'
}: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
    setShowResults(false);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (onSearch) {
      onSearch(newQuery);
    }
    setShowResults(true);
  };

  const handleResultClick = (result: SearchResult) => {
    if (onResultClick) {
      onResultClick(result);
    } else {
      switch (result.type) {
        case 'recipe':
          navigate(`/recipe/${result.creatorId}/${result.id}`);
          break;
        case 'category':
          navigate(`/category/${result.id}`);
          break;
        case 'creator':
          navigate(`/creator/${result.id}`);
          break;
      }
    }
    setShowResults(false);
    setQuery('');
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="flex items-center bg-white rounded-full shadow-lg p-2">
        <Search className="w-6 h-6 text-gray-400 ml-3" />
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          onFocus={() => setShowResults(true)}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-full focus:outline-none"
        />
        <button 
          type="submit"
          className="bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700 transition-colors"
        >
          Search
        </button>
      </form>

      {showResults && query && results.length > 0 && (
        <div className="absolute w-full mt-2 bg-white rounded-xl shadow-lg overflow-hidden z-50">
          <ul>
            {results.map((result) => (
              <li key={`${result.type}-${result.id}`}>
                <button
                  onClick={() => handleResultClick(result)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-4"
                >
                  <img 
                    src={result.image} 
                    alt={result.title}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="font-medium text-gray-800">{result.title}</h4>
                    {result.creatorName && (
                      <p className="text-sm text-gray-500">by {result.creatorName}</p>
                    )}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;