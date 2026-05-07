import { useEffect, useState } from 'react';
import { LoginForm } from '../components/LoginForm';
import { Dashboard } from './Dashboard';
import { sessionStore } from '../store/session';

export const App = () => {
  const [authenticated, setAuthenticated] = useState(Boolean(sessionStore.get()));
  const [bootLoading, setBootLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setBootLoading(false), 500);
    return () => window.clearTimeout(timer);
  }, []);

  if (bootLoading) {
    return (
      <div className="page-loader-wrap">
        <div className="page-loader" />
        <p>Booting admin UI...</p>
      </div>
    );
  }

  if (!authenticated) return <LoginForm onSuccess={() => setAuthenticated(true)} />;

  return <Dashboard />;
};
