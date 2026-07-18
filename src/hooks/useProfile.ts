import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';

export interface UserProfile {
  id: string;
  plan: string;
  credits: number;
  [key: string]: any;
}

const API_BASE = import.meta.env.VITE_API_URL || "https://tickk-backend.onrender.com";

export function useProfile(userId: string | undefined, token?: string) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!userId || !token) {
      setProfile(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const activeToken = token;

      if (!activeToken) {
        setProfile({ id: userId, plan: 'free', credits: 0 });
        return;
      }

      const res = await fetch(`${API_BASE}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${activeToken}`
        }
      });

      if (!res.ok) {
        // Fallback for unauthorized/missing profile
        setProfile({ id: userId, plan: 'free', credits: 0 });
        return;
      }

      const json = await res.json();
      
      if (!json.success || !json.user) {
        setProfile({ id: userId, plan: 'free', credits: 0 });
        return;
      }

      const data = json.user;
      
      const mappedProfile: UserProfile = {
        id: data.id,
        plan: data.plan_tier || data.plan || 'free',
        credits: data.credits || 0,
        updated_at: data.updated_at
      };
      
      setProfile(mappedProfile);
    } catch (err: any) {
      console.error('Error fetching profile from backend:', err);
      // Graceful fallback
      setProfile({ id: userId, plan: 'free', credits: 0 });
      setError(err.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchProfile();
    const intervalId = setInterval(() => {
      fetchProfile();
    }, 15000); // Auto-reload profile every 15 seconds
    return () => clearInterval(intervalId);
  }, [fetchProfile]);

  return { profile, loading, error, refetch: fetchProfile };
}
