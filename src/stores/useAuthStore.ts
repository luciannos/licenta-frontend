import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import { ref, computed } from 'vue';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  sub: string;
  roles: string[];
  iat: number;
  exp: number;
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token'));
  const roles = ref<string[]>([]);

  // Inițializează rolurile la pornire
  const initializeRoles = () => {
    if (token.value) {
      try {
        const decoded: DecodedToken = jwtDecode(token.value);
        roles.value = decoded.roles || [];
      } catch {
        console.error('Invalid token');
        token.value = null;
        roles.value = [];
      }
    } else {
      roles.value = [];
    }
  };

  // Inițializează rolurile la pornire
  initializeRoles();

  const isLoggedIn = computed(() => !!token.value);
  const isAdmin = computed(() => roles.value?.includes('ADMIN') || false);

  function setToken(newToken: string) {
    localStorage.setItem('token', newToken);
    token.value = newToken;
    try {
      const decoded: DecodedToken = jwtDecode(newToken);
      roles.value = decoded.roles || [];
    } catch {
      console.error('Invalid token');
      roles.value = [];
    }
  }

  function removeToken() {
    localStorage.removeItem('token');
    token.value = null;
    roles.value = [];
  }

  async function login(email: string, parola: string) {
    try {
      const response = await api.post('/api/auth/login', { email, parola });
      const newToken = response.data.token;
      if (newToken) {
        setToken(newToken);
      }
    } catch (error) {
      console.error('Login failed:', error);
      removeToken();
      throw error;
    }
  }

  async function logout() {
    try {
      if (token.value) {
        await api.post('/api/auth/logout', null, {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        });
      }
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      removeToken();
    }
  }

  interface RegisterData {
    nume: string;
    prenume: string;
    gen: string;
    email: string;
    parola: string;
    adresa: string;
    telefon: string;
  }

  async function register(registerData: RegisterData) {
    try {
      await api.post('/api/auth/register', registerData);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }

  return {
    token,
    isLoggedIn,
    isAdmin,
    roles,
    login,
    register,
    logout,
  };
});
