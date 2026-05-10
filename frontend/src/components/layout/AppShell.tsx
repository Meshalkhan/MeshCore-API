import { ReactNode } from 'react';
import { Sidebar } from '../Sidebar';

export const AppShell = ({
  title,
  toolbar,
  children
}: {
  title: string;
  toolbar?: ReactNode;
  children: ReactNode;
}) => (
  <div className="layout fade-in">
    <Sidebar />
    <main className="main-surface">
      <header className="page-header">
        <div>
          <p className="eyebrow">Console</p>
          <h1>{title}</h1>
        </div>
        {toolbar ? <div className="page-header-actions">{toolbar}</div> : null}
      </header>
      {children}
    </main>
  </div>
);
