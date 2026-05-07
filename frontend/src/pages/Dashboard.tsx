import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Sidebar } from '../components/Sidebar';
import { AnalyticsCards } from '../components/AnalyticsCards';
import { UsersTable } from '../components/UsersTable';
import { ApiKeysTable } from '../components/ApiKeysTable';

interface DashboardData {
  users: Array<{ id: string; email: string; role: string }>;
  keys: Array<{ id: string; name: string; key_prefix: string }>;
  cards: Array<{ metric: string; value: string | number }>;
}

export const Dashboard = () => {
  const [data, setData] = useState<DashboardData>({ users: [], keys: [], cards: [] });
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState('');

  const load = async () => {
    setLoading(true);
    setAlert('');

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
      setAlert('Dashboard synced successfully.');
    } catch {
      setData({ users: [], keys: [], cards: [] });
      setAlert('Failed to load dashboard data. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load().catch(() => undefined);
  }, []);

  if (loading) {
    return (
      <div className="page-loader-wrap">
        <div className="page-loader" />
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="layout fade-in" id="dashboard">
      <Sidebar />
      <main>
        <div className="toolbar">
          <h1>Tenant Dashboard</h1>
          <button onClick={() => load().catch(() => undefined)}>Refresh</button>
        </div>
        {alert && (
          <p className={`alert ${alert.startsWith('Failed') ? 'alert-error' : 'alert-success'}`}>
            {alert}
          </p>
        )}
        <AnalyticsCards cards={data.cards} />
        <UsersTable users={data.users} />
        <ApiKeysTable keys={data.keys} />
      </main>
    </div>
  );
};
