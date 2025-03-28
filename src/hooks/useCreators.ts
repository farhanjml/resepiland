import { useState, useEffect } from 'react';
import * as creatorsApi from '../lib/creators';
import { Creator } from '../types/database';

export function useCreators() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadCreators = async () => {
      try {
        const data = await creatorsApi.getCreators();
        setCreators(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load creators'));
      } finally {
        setLoading(false);
      }
    };

    loadCreators();
  }, []);

  return { creators, loading, error };
}

export function useCreator(id: string) {
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadCreator = async () => {
      try {
        const data = await creatorsApi.getCreatorWithRecipes(id);
        setCreator(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load creator'));
      } finally {
        setLoading(false);
      }
    };

    loadCreator();
  }, [id]);

  return { creator, loading, error };
}