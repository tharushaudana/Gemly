import { create } from 'zustand';

type User = {
  email: string;
  name: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

// Mock authentication store for demo purposes
export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    // In a real app, this would be an API call
    // For demo, we'll accept any email with password "password"
    return new Promise((resolve) => {
      setTimeout(() => {
        if (password === 'password') {
          set({
            user: { email, name: email.split('@')[0] },
            isAuthenticated: true,
          });
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500); // Simulate API delay
    });
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));