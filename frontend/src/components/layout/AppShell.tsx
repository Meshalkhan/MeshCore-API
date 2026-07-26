import { useEffect, useState, type ReactNode } from 'react';
import { Sidebar, type MeshCoreTab } from '../Sidebar';

const TAB_COPY: Record<MeshCoreTab, { eyebrow: string; title: string }> = {
  overview: { eyebrow: 'Console', title: 'Workspace' },
  analytics: { eyebrow: 'Insights', title: 'Analytics' },
  users: { eyebrow: 'Directory', title: 'Users' },
  'api-keys': { eyebrow: 'Security', title: 'API keys' }
};

export const AppShell = ({
  activeTab,
  onTabChange,
  toolbar,
  children
}: {
  activeTab: MeshCoreTab;
  onTabChange: (tab: MeshCoreTab) => void;
  toolbar?: ReactNode;
  children: ReactNode;
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const copy = TAB_COPY[activeTab];

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

  const handleTabChange = (tab: MeshCoreTab) => {
    onTabChange(tab);
    setSidebarOpen(false);
  };

  return (
    <div
      className={[
        'layout',
        'fade-in',
        sidebarOpen ? 'layout--sidebar-open' : '',
        sidebarCollapsed ? 'layout--sidebar-collapsed' : ''
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {sidebarOpen ? (
        <button
          type="button"
          className="sidebar-overlay"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}
      <Sidebar
        open={sidebarOpen}
        collapsed={sidebarCollapsed}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onClose={() => setSidebarOpen(false)}
        onToggleCollapse={() => setSidebarCollapsed((value) => !value)}
      />
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
              <p className="eyebrow">{copy.eyebrow}</p>
              <h1>{copy.title}</h1>
            </div>
          </div>
          {toolbar ? <div className="page-header-actions">{toolbar}</div> : null}
        </header>
        {children}
      </main>
    </div>
  );
};
