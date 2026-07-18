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
        .select('id, plan_tier, credits, updated_at')
        .eq('id', userId)
        .single();

      if (sbError) {
        const errCode = String(sbError.code);
        const errStatus = String(sbError.status || '');
        if (errCode === 'PGRST116' || errCode === '406' || errStatus === '406' || sbError.message?.includes('Not Acceptable') || sbError.message?.includes('JSON object requested')) {
          // Graceful fallback for missing profile (e.g. unauthenticated or new user)
          setProfile({ id: userId, plan: 'free', credits: 0 });
          return;
        }
        throw sbError;
      }
      
      const mappedProfile: UserProfile = {
        id: data.id,
        plan: data.plan_tier || 'free',
        credits: data.credits || 0,
        updated_at: data.updated_at
      };
      
      setProfile(mappedProfile);
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
