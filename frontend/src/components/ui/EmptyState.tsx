export const EmptyState = ({ title, detail }: { title: string; detail?: string }) => (
  <div className="empty-state">
    <p className="empty-state-title">{title}</p>
    {detail ? <p className="empty-state-detail">{detail}</p> : null}
  </div>
);
