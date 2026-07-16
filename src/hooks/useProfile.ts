import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';

export interface UserProfile {
  id: string;
  plan: string;
  credits: number;
  [key: string]: any;
}

export function useProfile(userId: string | undefined) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!userId) {
      setProfile(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const { data, error: sbError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (sbError) {
        throw sbError;
      }
      
      setProfile(data as UserProfile);
    } catch (err: any) {
      console.error('Error fetching profile:', err);
      setError(err.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, loading, error, refetch: fetchProfile };
}
