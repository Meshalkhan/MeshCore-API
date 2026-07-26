const links = [
  { href: '#dashboard', label: 'Overview' },
  { href: '#users', label: 'Users' },
  { href: '#api-keys', label: 'API keys' },
  { href: '#analytics', label: 'Analytics' }
];

export const Sidebar = ({
  open = false,
  onClose
}: {
  open?: boolean;
  onClose?: () => void;
}) => (
  <aside className={`sidebar${open ? ' sidebar--open' : ''}`} aria-label="Primary">
    <div className="sidebar-brand">
      <span className="sidebar-logo" aria-hidden />
      <div>
        <p className="sidebar-name">MeshCore</p>
        <p className="sidebar-meta">Admin</p>
      </div>
      <button type="button" className="sidebar-close" aria-label="Close navigation" onClick={onClose}>
        ×
      </button>
    </div>
    <nav className="sidebar-nav" aria-label="Primary">
      {links.map((link) => (
        <a key={link.href} href={link.href} onClick={onClose}>
          {link.label}
        </a>
      ))}
    </nav>
  </aside>
);
