import { FormEvent, useState } from 'react';
import { api } from '../services/api';
import { sessionStore } from '../store/session';

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
    } catch {
      setError('Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell fade-in">
      <form className="card login-card" onSubmit={submit}>
        <h2>Admin Login</h2>
        <p className="muted">Manage tenants, users, API keys, and analytics.</p>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
        <input value={tenantId} onChange={(e) => setTenantId(e.target.value)} placeholder="Tenant ID" />
        {error && <p className="alert alert-error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};
