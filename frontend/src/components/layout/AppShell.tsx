import { useEffect, useState, type ReactNode } from 'react';
import { Sidebar } from '../Sidebar';

export const AppShell = ({
  title,
  toolbar,
  children
}: {
  title: string;
  toolbar?: ReactNode;
  children: ReactNode;
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSidebarOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className={`layout fade-in${sidebarOpen ? ' layout--sidebar-open' : ''}`}>
      {sidebarOpen ? (
        <button
          type="button"
          className="sidebar-overlay"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="main-surface">
        <header className="page-header">
          <div className="page-header-heading">
            <button
              type="button"
              className="page-header-menu"
              aria-label="Open navigation"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="page-header-menu-bars" aria-hidden />
            </button>
            <div>
              <p className="eyebrow">Console</p>
              <h1>{title}</h1>
            </div>
          </div>
          {toolbar ? <div className="page-header-actions">{toolbar}</div> : null}
        </header>
        {children}
      </main>
    </div>
  );
};
