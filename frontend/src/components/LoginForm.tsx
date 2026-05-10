import { FormEvent, useState } from 'react';
import { api } from '../services/api';
import { sessionStore } from '../store/session';
import { AlertBanner } from './ui/AlertBanner';
import { getRequestErrorMessage } from '../lib/http-error';

export const LoginForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [email, setEmail] = useState('admin@meshcore.local');
  const [password, setPassword] = useState('password123');
  const [tenantId, setTenantId] = useState('00000000-0000-0000-0000-000000000001');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      sessionStore.set({ token: res.data.accessToken, tenantId });
      onSuccess();
    } catch (err) {
      setError(getRequestErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell fade-in">
      <div className="auth-panel">
        <div className="auth-brand">
          <span className="auth-logo" aria-hidden />
          <div>
            <h1 className="auth-title">MeshCore</h1>
            <p className="auth-tagline">Tenant administration</p>
          </div>
        </div>
        <form className="card login-card" onSubmit={submit}>
          <label className="field-label">
            Email
            <input value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" />
          </label>
          <label className="field-label">
            Password
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
            />
          </label>
          <label className="field-label">
            Tenant ID
            <input value={tenantId} onChange={(e) => setTenantId(e.target.value)} autoComplete="off" />
          </label>
          {error ? <AlertBanner variant="error">{error}</AlertBanner> : null}
          <button type="submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
};
