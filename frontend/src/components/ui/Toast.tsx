import { useEffect, useRef } from 'react';

type Variant = 'success' | 'error' | 'neutral';

const variantClass: Record<Variant, string> = {
  success: 'toast--success',
  error: 'toast--error',
  neutral: 'toast--neutral'
};

export const Toast = ({
  variant,
  children,
  onClose,
  durationMs = 3200
}: {
  variant: Variant;
  children: string;
  onClose: () => void;
  durationMs?: number;
}) => {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const id = window.setTimeout(() => onCloseRef.current(), durationMs);
    return () => window.clearTimeout(id);
  }, [children, durationMs, variant]);

  return (
    <div className={`toast ${variantClass[variant]}`} role={variant === 'error' ? 'alert' : 'status'}>
      <span className="toast__dot" aria-hidden />
      <p className="toast__message">{children}</p>
      <button type="button" className="toast__close" aria-label="Dismiss" onClick={onClose}>
        ×
      </button>
    </div>
  );
};
