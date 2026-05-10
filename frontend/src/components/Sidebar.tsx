const links = [
  { href: '#dashboard', label: 'Overview' },
  { href: '#users', label: 'Users' },
  { href: '#api-keys', label: 'API keys' },
  { href: '#analytics', label: 'Analytics' }
];

export const Sidebar = () => (
  <aside className="sidebar">
    <div className="sidebar-brand">
      <span className="sidebar-logo" aria-hidden />
      <div>
        <p className="sidebar-name">MeshCore</p>
        <p className="sidebar-meta">Admin</p>
      </div>
    </div>
    <nav className="sidebar-nav" aria-label="Primary">
      {links.map((link) => (
        <a key={link.href} href={link.href}>
          {link.label}
        </a>
      ))}
    </nav>
  </aside>
);
