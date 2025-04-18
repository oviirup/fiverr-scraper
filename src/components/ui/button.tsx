import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: `bg-primary text-primary-fg hover:bg-primary/90`,
        destructive: `bg-destructive text-destructive-fg hover:bg-destructive/90`,
        outline: `border border-input bg-background hover:bg-accent hover:text-accent-fg`,
        secondary: `border border-transparent bg-secondary text-secondary-fg hover:bg-secondary/80 focus-visible:border-ring`,
        ghost: `border border-transparent hover:bg-accent hover:text-accent-fg focus-visible:border-ring`,
        link: `text-primary underline-offset-4 hover:underline`,
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> &
  React.RefAttributes<HTMLButtonElement> & {
    icon?: boolean;
    asChild?: boolean;
  };
function Button({
  icon,
  variant,
  size,
  asChild = false,
  ref,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  props.type ??= 'button';
  props.className = cn(
    buttonVariants({ variant, size }),
    icon ? 'aspect-square p-0' : undefined,
    props.className,
  );

  return <Comp ref={ref} {...props} />;
}

namespace Button {
  export type props = ButtonProps;
}

export { Button, buttonVariants };
