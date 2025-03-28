import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Users, X, ArrowLeft, Instagram, Youtube, ShoppingBag, GitBranch as BrandsTiktok, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import * as creatorsApi from '../../lib/creators';
import { Creator } from '../../types/database';
import ImageUpload from '../../components/admin/ImageUpload';

const EditCreatorPage = () => {
  const { creatorId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Omit<Creator, 'id' | 'created_at' | 'updated_at'>>({
    name: '',
    description: '',
    image: '',
    cover_image: '',
    instagram: '',
    youtube: '',
    tiktok: '',
    shopee: '',
    followers: ''
  });

  useEffect(() => {
    const loadCreator = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await creatorsApi.getCreatorById(creatorId!);
        if (!data) {
          throw new Error('Creator not found');
        }
        setFormData({
          name: data.name,
          description: data.description,
          image: data.image,
          cover_image: data.cover_image,
          instagram: data.instagram,
          youtube: data.youtube || '',
          tiktok: data.tiktok || '',
          shopee: data.shopee || '',
          followers: data.followers
        });
      } catch (err) {
        console.error('Error loading creator:', err);
        setError(err instanceof Error ? err.message : 'Failed to load creator');
        // Don't navigate immediately, let the user see the error
      } finally {
        setLoading(false);
      }
    };

    if (creatorId) {
      loadCreator();
    }
  }, [creatorId, navigate]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Please login to edit creators</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-amber-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading creator...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Users className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Creator</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/admin/creators')}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            Back to Creators
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.image || !formData.cover_image) {
      alert('Please upload both profile and cover images');
      return;
    }

    try {
      setSaving(true);
      await creatorsApi.updateCreator(creatorId!, formData);
      navigate('/admin/creators');
    } catch (error) {
      console.error('Error updating creator:', error);
      alert('Failed to update creator');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/creators')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Edit Creator</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Image
              </label>
              <ImageUpload
                onUploadComplete={(url) => setFormData(prev => ({ ...prev, image: url }))}
                className="mb-2"
              />
              {formData.image && (
                <div className="relative w-32 h-32">
                  <img
                    src={formData.image}
                    alt="Profile preview"
                    className="w-full h-full object-cover rounded-full"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                    className="absolute -top-2 -right-2 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cover Image
              </label>
              <ImageUpload
                onUploadComplete={(url) => setFormData(prev => ({ ...prev, cover_image: url }))}
                className="mb-2"
              />
              {formData.cover_image && (
                <div className="relative w-full h-32">
                  <img
                    src={formData.cover_image}
                    alt="Cover preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, cover_image: '' }))}
                    className="absolute -top-2 -right-2 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Followers
              </label>
              <input
                type="text"
                value={formData.followers}
                onChange={(e) => setFormData(prev => ({ ...prev, followers: e.target.value }))}
                placeholder="e.g., 100K"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-800">Social Media</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-pink-600" />
                    <span>Instagram Handle</span>
                  </div>
                </label>
                <input
                  type="text"
                  value={formData.instagram}
                  onChange={(e) => setFormData(prev => ({ ...prev, instagram: e.target.value }))}
                  placeholder="@username"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center gap-2">
                    <Youtube className="w-4 h-4 text-red-600" />
                    <span>YouTube Channel URL</span>
                  </div>
                </label>
                <input
                  type="url"
                  value={formData.youtube}
                  onChange={(e) => setFormData(prev => ({ ...prev, youtube: e.target.value }))}
                  placeholder="https://youtube.com/..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center gap-2">
                    <BrandsTiktok className="w-4 h-4" />
                    <span>TikTok Username</span>
                  </div>
                </label>
                <input
                  type="text"
                  value={formData.tiktok}
                  onChange={(e) => setFormData(prev => ({ ...prev, tiktok: e.target.value }))}
                  placeholder="@username"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-orange-600" />
                    <span>Shopee Store URL</span>
                  </div>
                </label>
                <input
                  type="url"
                  value={formData.shopee}
                  onChange={(e) => setFormData(prev => ({ ...prev, shopee: e.target.value }))}
                  placeholder="https://shopee.com.my/..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/admin/creators')}
              className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCreatorPage;