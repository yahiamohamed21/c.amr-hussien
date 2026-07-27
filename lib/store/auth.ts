import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  accessTokenExpiresAtUtc: string | null;
  refreshToken: string | null;
  refreshTokenExpiresAtUtc: string | null;
  setTokens: (data: {
    accessToken: string;
    accessTokenExpiresAtUtc: string;
    refreshToken: string;
    refreshTokenExpiresAtUtc: string;
  }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      accessTokenExpiresAtUtc: null,
      refreshToken: null,
      refreshTokenExpiresAtUtc: null,
      setTokens: (data) => set(data),
      logout: () =>
        set({
          accessToken: null,
          accessTokenExpiresAtUtc: null,
          refreshToken: null,
          refreshTokenExpiresAtUtc: null,
        }),
    }),
    {
      name: 'admin-auth-storage',
    }
  )
);
