import { useEffect, useState } from 'react';
import { LoginForm } from '../components/LoginForm';
import { Dashboard } from './Dashboard';
import { sessionStore } from '../store/session';
import { Spinner } from '../components/ui/Spinner';

export const App = () => {
  const [authenticated, setAuthenticated] = useState(Boolean(sessionStore.get()));
  const [hydrating, setHydrating] = useState(true);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setHydrating(false));
    return () => window.cancelAnimationFrame(id);
  }, []);

  if (hydrating) {
    return (
      <div className="page-loader-wrap">
        <Spinner />
      </div>
    );
  }

  if (!authenticated) return <LoginForm onSuccess={() => setAuthenticated(true)} />;

  return <Dashboard />;
};
