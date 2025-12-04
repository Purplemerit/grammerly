import React from 'react';
import { cn } from '@/lib/utils';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'error' | 'warning' | 'info';
  dismissible?: boolean;
  onDismiss?: () => void;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = 'info',
      dismissible = false,
      onDismiss,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [isVisible, setIsVisible] = React.useState(true);

    const handleDismiss = () => {
      setIsVisible(false);
      onDismiss?.();
    };

    if (!isVisible) return null;

    const variants = {
      success: 'bg-success-light border-success text-success-dark',
      error: 'bg-error-light border-error text-error-dark',
      warning: 'bg-warning-light border-warning text-warning-dark',
      info: 'bg-info-light border-info text-info-dark',
    };

    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-base border p-4 flex items-start gap-3',
          variants[variant],
          className,
        )}
        role="alert"
        {...props}
      >
        <span className="text-lg font-semibold flex-shrink-0">
          {icons[variant]}
        </span>
        <div className="flex-1">{children}</div>
        {dismissible && (
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 text-current opacity-60 hover:opacity-100 transition-opacity"
            aria-label="Dismiss alert"
          >
            ✕
          </button>
        )}
      </div>
    );
  },
);

Alert.displayName = 'Alert';

