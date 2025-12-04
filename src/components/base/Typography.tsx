import React from 'react';
import { cn } from '@/lib/utils';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as, level = 1, className, children, ...props }, ref) => {
    const Component = as || (`h${level}` as keyof JSX.IntrinsicElements);
    const levels = {
      1: 'text-display-xl font-bold',
      2: 'text-display-lg font-semibold',
      3: 'text-heading-xl font-semibold',
      4: 'text-heading-lg font-semibold',
      5: 'text-heading-md font-semibold',
      6: 'text-heading-sm font-semibold',
    };

    return (
      <Component
        ref={ref}
        className={cn(levels[level], 'text-gray-800', className)}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Heading.displayName = 'Heading';

export interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: 'lg' | 'base' | 'sm' | 'xs';
  variant?: 'default' | 'muted' | 'lead';
}

export const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ size = 'base', variant = 'default', className, children, ...props }, ref) => {
    const sizes = {
      lg: 'text-body-lg',
      base: 'text-body',
      sm: 'text-body-sm',
      xs: 'text-body-xs',
    };

    const variants = {
      default: 'text-gray-800',
      muted: 'text-gray-600',
      lead: 'text-body-lg text-gray-700',
    };

    return (
      <p
        ref={ref}
        className={cn(sizes[size], variants[variant], className)}
        {...props}
      >
        {children}
      </p>
    );
  },
);

Paragraph.displayName = 'Paragraph';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ required, className, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn('text-sm font-medium text-gray-700', className)}
        {...props}
      >
        {children}
        {required && <span className="text-error ml-1">*</span>}
      </label>
    );
  },
);

Label.displayName = 'Label';

export interface CaptionProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'muted' | 'error';
}

export const Caption = React.forwardRef<HTMLSpanElement, CaptionProps>(
  ({ variant = 'default', className, children, ...props }, ref) => {
    const variants = {
      default: 'text-caption text-gray-600',
      muted: 'text-caption text-gray-500',
      error: 'text-caption text-error',
    };

    return (
      <span ref={ref} className={cn(variants[variant], className)} {...props}>
        {children}
      </span>
    );
  },
);

Caption.displayName = 'Caption';

