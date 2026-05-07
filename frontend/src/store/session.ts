export interface SessionState { token: string; tenantId: string; }
const KEY = 'meshcore_session';
export const sessionStore = {
  get(): SessionState | null { const raw = localStorage.getItem(KEY); return raw ? (JSON.parse(raw) as SessionState) : null; },
  set(session: SessionState) { localStorage.setItem(KEY, JSON.stringify(session)); },
  clear() { localStorage.removeItem(KEY); }
};
