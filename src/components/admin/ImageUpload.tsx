import React, { useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { uploadRecipeImage } from '../../utils/storage';

interface ImageUploadProps {
  onUploadComplete: (url: string) => void;
  onError?: (error: Error) => void;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onUploadComplete, 
  onError,
  className = '' 
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed');
      return;
    }

    // Validate file size (5MB max)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setError('Image size must be less than 5MB');
      return;
    }

    try {
      setIsUploading(true);
      setError(null);

      // Upload to Supabase Storage
      const imageUrl = await uploadRecipeImage(file);
      onUploadComplete(imageUrl);
    } catch (err) {
      console.error('Upload error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload image';
      setError(errorMessage);
      onError?.(new Error(errorMessage));
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={isUploading}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
      />
      <div className={`flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed rounded-lg transition-colors ${
        error 
          ? 'border-red-300 bg-red-50' 
          : 'border-gray-300 hover:border-amber-500'
      }`}>
        {isUploading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin text-amber-600" />
            <span>Uploading...</span>
          </>
        ) : (
          <>
            <Upload className={`w-5 h-5 ${error ? 'text-red-500' : 'text-gray-400'}`} />
            <span className={error ? 'text-red-600' : 'text-gray-600'}>
              {error || 'Upload Image'}
            </span>
          </>
        )}
      </div>
      
      {error && (
        <button
          onClick={() => setError(null)}
          className="absolute top-0 right-0 p-1 text-red-500 hover:text-red-700"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default ImageUpload;