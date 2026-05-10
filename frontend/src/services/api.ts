import axios from 'axios';
import { sessionStore } from '../store/session';

const resolvedBaseUrl =
  import.meta.env.VITE_API_BASE_URL ?? (import.meta.env.DEV ? 'http://localhost:4000/api/v1' : '/api/v1');

export const api = axios.create({ baseURL: resolvedBaseUrl });

api.interceptors.request.use((config) => {
  const session = sessionStore.get();
  if (session) {
    config.headers.Authorization = `Bearer ${session.token}`;
    config.headers['x-tenant-id'] = session.tenantId;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const hadAuth = Boolean(error.config?.headers?.Authorization);
      if (hadAuth) {
        sessionStore.clear();
        window.location.assign('/');
      }
    }
    return Promise.reject(error);
  }
);
