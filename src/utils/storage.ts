import { supabase } from '../lib/supabase';

const RECIPE_IMAGES_BUCKET = 'recipe-images';

export async function uploadRecipeImage(file: File): Promise<string> {
  // Validate file type
  if (!file.type.startsWith('image/')) {
    throw new Error('Only image files are allowed');
  }

  // Validate file size (max 5MB)
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  if (file.size > MAX_SIZE) {
    throw new Error('Image size must be less than 5MB');
  }

  try {
    // Generate a unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload the file
    const { data, error: uploadError } = await supabase.storage
      .from(RECIPE_IMAGES_BUCKET)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      throw new Error(uploadError.message);
    }

    if (!data?.path) {
      throw new Error('Upload failed - no path returned');
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from(RECIPE_IMAGES_BUCKET)
      .getPublicUrl(data.path);

    return publicUrl;
  } catch (error) {
    console.error('Upload error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to upload image');
  }
}

export async function deleteRecipeImage(path: string): Promise<void> {
  if (!path) return;

  const fileName = path.split('/').pop();
  if (!fileName) return;

  try {
    const { error } = await supabase.storage
      .from(RECIPE_IMAGES_BUCKET)
      .remove([fileName]);

    if (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  } catch (error) {
    console.error('Delete error:', error);
    throw error;
  }
}

export function getImageUploadConfig() {
  return {
    maxSize: 5 * 1024 * 1024, // 5MB
    acceptedTypes: ['image/jpeg', 'image/png', 'image/webp'],
    bucket: RECIPE_IMAGES_BUCKET
  };
}