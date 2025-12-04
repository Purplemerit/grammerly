import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      hover = false,
      padding = 'md',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const variants = {
      default: 'bg-white border border-gray-200',
      elevated: 'bg-white shadow-md',
      outlined: 'bg-white border-2 border-gray-300',
    };

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-md transition-all duration-normal ease-out',
          variants[variant],
          paddings[padding],
          hover && 'hover:shadow-lg hover:-translate-y-1',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = 'Card';

