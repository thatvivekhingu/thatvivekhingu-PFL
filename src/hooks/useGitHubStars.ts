import { useEffect, useState, useCallback } from 'react';

export interface GitHubStarsData {
  stars: number;
  forks: number;
  url: string;
  repo: string;
}

interface UseGitHubStarsReturn {
  data: GitHubStarsData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useGitHubStars(): UseGitHubStarsReturn {
  const [data, setData] = useState<GitHubStarsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStars = useCallback(async () => {
    try {
      const response = await fetch('/api/github-stars?t=' + Date.now(), {
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch GitHub stars');
      }

      const result = await response.json();

      if (result && !result.error) {
        setData(result);
        setError(null);
      } else {
        setError(result.error || 'Unknown error');
      }
    } catch (err) {
      console.error('Error fetching GitHub stars:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch GitHub stars');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStars();

    // Polling every 10 seconds to update star count in real time as soon as someone stars the repository
    const interval = setInterval(fetchStars, 10000);

    // Refetch immediately when tab regains focus (e.g., user starred the repo on GitHub and returns to portfolio)
    const handleFocus = () => {
      fetchStars();
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, [fetchStars]);

  return { data, isLoading, error, refetch: fetchStars };
}
