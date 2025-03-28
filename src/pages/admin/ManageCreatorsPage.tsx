import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Plus, Pencil, Trash2, Search, Loader2, Instagram, Youtube } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Creator } from '../../types/database';
import * as creatorsApi from '../../lib/creators';

const ManageCreatorsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    loadCreators();
  }, [user, navigate]);

  const loadCreators = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await creatorsApi.getCreators();
      setCreators(data);
    } catch (err) {
      console.error('Error loading creators:', err);
      setError(err instanceof Error ? err.message : 'Failed to load creators');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this creator? This will also delete all their recipes.')) {
      return;
    }

    try {
      setDeleting(id);
      setError(null);
      await creatorsApi.deleteCreator(id);
      setCreators(prev => prev.filter(creator => creator.id !== id));
    } catch (err) {
      console.error('Error deleting creator:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete creator');
    } finally {
      setDeleting(null);
    }
  };

  const filteredCreators = creators.filter(creator =>
    creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    creator.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    creator.instagram.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Please login to manage creators</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Manage Creators</h1>
          <button
            onClick={() => navigate('/admin/creators/new')}
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>New Creator</span>
          </button>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search creators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <Loader2 className="w-12 h-12 text-amber-600 mx-auto mb-4 animate-spin" />
              <p className="text-gray-600">Loading creators...</p>
            </div>
          ) : filteredCreators.length === 0 ? (
            <div className="p-8 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No creators found</p>
            </div>
          ) : (
            <div className="divide-y">
              {filteredCreators.map((creator) => (
                <div key={creator.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <img
                      src={creator.image}
                      alt={creator.name}
                      className="w-16 h-16 object-cover rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-800">{creator.name}</h3>
                      <p className="text-sm text-gray-500 truncate">{creator.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        {creator.instagram && (
                          <div className="flex items-center gap-1 text-sm text-pink-600">
                            <Instagram className="w-4 h-4" />
                            <span>{creator.instagram}</span>
                          </div>
                        )}
                        {creator.youtube && (
                          <div className="flex items-center gap-1 text-sm text-red-600">
                            <Youtube className="w-4 h-4" />
                            <span>YouTube</span>
                          </div>
                        )}
                        <span className="text-sm text-gray-500">{creator.followers} followers</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/admin/creators/edit/${creator.id}`)}
                        className="p-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(creator.id)}
                        disabled={deleting === creator.id}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {deleting === creator.id ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Trash2 className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageCreatorsPage;