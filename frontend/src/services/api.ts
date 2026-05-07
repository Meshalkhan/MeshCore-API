import axios from 'axios';
import { sessionStore } from '../store/session';

const baseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api/v1';

export const api = axios.create({ baseURL: baseUrl });

api.interceptors.request.use((config) => {
  const session = sessionStore.get();
  if (session) { config.headers.Authorization = `Bearer ${session.token}`; config.headers['x-tenant-id'] = session.tenantId; }
  return config;
});
