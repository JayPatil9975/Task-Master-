import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
}

interface AuthState {
  user: Profile | null;
  setUser: (user: Profile | null) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  signIn: async (email, password) => {
    const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) throw signInError;

    if (authData.user) {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (profileError) throw profileError;
      set({ user: profile });
    }
  },
  signUp: async (email, password, username) => {
    const { data: { user }, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username, // Store username in auth metadata
        },
      },
    });

    if (signUpError) throw signUpError;
    if (!user) throw new Error('Signup failed');

    // Insert into profiles table
    const { error: profileError } = await supabase.from('profiles').insert({
      id: user.id,
      username,
      updated_at: new Date().toISOString(),
    });

    if (profileError) {
      // If profile creation fails, delete the auth user to maintain consistency
      await supabase.auth.admin.deleteUser(user.id);
      throw new Error('Failed to create profile');
    }

    set({ user: { id: user.id, username, avatar_url: null } });
  },
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    set({ user: null });
  },
}));