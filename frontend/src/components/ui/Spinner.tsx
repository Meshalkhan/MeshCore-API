export const Spinner = ({ label }: { label?: string }) => (
  <div className="spinner-block" role="status" aria-live="polite">
    <span className="spinner" aria-hidden />
    {label ? <span className="spinner-label">{label}</span> : null}
  </div>
);
