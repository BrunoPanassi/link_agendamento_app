import { useCookie } from '#app';

export const AUTH_INFO = '0312813'

export function useAuth() {
  const userId = useCookie<string | null>('user_id');
  const securityKey = useCookie<string | null>('security_key');

  const login = (id: string) => {
    userId.value = id;
    securityKey.value = AUTH_INFO;
  };

  const logout = () => {
    userId.value = null;
    securityKey.value = null;
  };

  const isAuthenticated = () => {
    return Boolean(userId.value && securityKey.value == AUTH_INFO);
  };

  return { login, logout, isAuthenticated, userId, securityKey };
}
