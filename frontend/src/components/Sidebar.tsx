export type MeshCoreTab = 'overview' | 'analytics' | 'users' | 'api-keys';

const links: Array<{ id: MeshCoreTab; label: string }> = [
  { id: 'overview', label: 'Overview' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'users', label: 'Users' },
  { id: 'api-keys', label: 'API keys' }
];

export const Sidebar = ({
  open = false,
  collapsed = false,
  activeTab,
  onTabChange,
  onClose,
  onToggleCollapse
}: {
  open?: boolean;
  collapsed?: boolean;
  activeTab: MeshCoreTab;
  onTabChange: (tab: MeshCoreTab) => void;
  onClose?: () => void;
  onToggleCollapse?: () => void;
}) => (
  <aside
    className={`sidebar${open ? ' sidebar--open' : ''}${collapsed ? ' sidebar--collapsed' : ''}`}
    aria-label="Primary"
  >
    <div className="sidebar-brand">
      <span className="sidebar-logo" aria-hidden />
      <div className="sidebar-brand-text">
        <p className="sidebar-name">MeshCore</p>
        <p className="sidebar-meta">Admin</p>
      </div>
      <button type="button" className="sidebar-close" aria-label="Close navigation" onClick={onClose}>
        ×
      </button>
    </div>
    <nav className="sidebar-nav" aria-label="Primary">
      {links.map((link) => (
        <button
          key={link.id}
          type="button"
          className={`sidebar-link${activeTab === link.id ? ' sidebar-link--active' : ''}`}
          title={link.label}
          aria-current={activeTab === link.id ? 'page' : undefined}
          onClick={() => onTabChange(link.id)}
        >
          <span className="sidebar-link-dot" aria-hidden />
          <span className="sidebar-link-label">{link.label}</span>
        </button>
      ))}
    </nav>
    <button
      type="button"
      className="sidebar-collapse"
      aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      title={collapsed ? 'Expand' : 'Collapse'}
      onClick={onToggleCollapse}
    >
      {collapsed ? '›' : '‹'}
    </button>
  </aside>
);
