import axios from 'axios';
import { sessionStore } from '../store/session';
export const api = axios.create({ baseURL: 'http://localhost:4000/api/v1' });
api.interceptors.request.use((config) => {
  const session = sessionStore.get();
  if (session) { config.headers.Authorization = `Bearer ${session.token}`; config.headers['x-tenant-id'] = session.tenantId; }
  return config;
});
