import type { ReactNode } from 'react';

type Variant = 'success' | 'error' | 'neutral';

const variantClass: Record<Variant, string> = {
  success: 'alert-success',
  error: 'alert-error',
  neutral: 'alert-neutral'
};

export const AlertBanner = ({ variant, children }: { variant: Variant; children: ReactNode }) => (
  <div className={`alert ${variantClass[variant]}`} role={variant === 'error' ? 'alert' : 'status'}>
    {children}
  </div>
);
