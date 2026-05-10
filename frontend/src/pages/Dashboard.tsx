import { useCallback, useEffect, useState } from 'react';
import { api } from '../services/api';
import { AnalyticsCards } from '../components/AnalyticsCards';
import { UsersTable } from '../components/UsersTable';
import { ApiKeysTable } from '../components/ApiKeysTable';
import { AppShell } from '../components/layout/AppShell';
import { Spinner } from '../components/ui/Spinner';
import { AlertBanner } from '../components/ui/AlertBanner';
import { getRequestErrorMessage } from '../lib/http-error';

interface DashboardData {
  users: Array<{ id: string; email: string; role: string }>;
  keys: Array<{ id: string; name: string; key_prefix: string }>;
  cards: Array<{ metric: string; value: string | number }>;
}

export const Dashboard = () => {
  const [data, setData] = useState<DashboardData>({ users: [], keys: [], cards: [] });
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState<{ variant: 'success' | 'error'; text: string } | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setBanner(null);
    try {
      const [users, keys, analytics] = await Promise.all([
        api.get('/users'),
        api.get('/api-keys'),
        api.get('/analytics/summary')
      ]);
      setData({
        users: users.data.data,
        keys: keys.data.data,
        cards: analytics.data.cards
      });
      setBanner({ variant: 'success', text: 'Data refreshed.' });
    } catch (err) {
      setData({ users: [], keys: [], cards: [] });
      setBanner({ variant: 'error', text: getRequestErrorMessage(err) });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load().catch(() => undefined);
  }, [load]);

  if (loading && !data.users.length && !data.keys.length) {
    return (
      <div className="page-loader-wrap">
        <Spinner label="Loading workspace" />
      </div>
    );
  }

  return (
    <AppShell
      title="Workspace"
      toolbar={
        <button type="button" className="btn-secondary" onClick={() => load().catch(() => undefined)} disabled={loading}>
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      }
    >
      <div className="stack" id="dashboard">
        {banner ? <AlertBanner variant={banner.variant}>{banner.text}</AlertBanner> : null}
        {loading ? (
          <div className="inline-loader">
            <Spinner />
          </div>
        ) : null}
        <AnalyticsCards cards={data.cards} />
        <UsersTable users={data.users} />
        <ApiKeysTable keys={data.keys} />
      </div>
    </AppShell>
  );
};
