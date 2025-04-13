import { cn } from '~/components/utils';
import * as React from 'react';

const AccordionRoot = React.memo(
  ({ className, style, ...props }: React.HTMLProps<HTMLDetailsElement>) => {
    return (
      <details
        className={cn(
          'group/accordion [&::details-content]:transition-discrete flex w-full flex-col border-b last:border-b-0 [&::details-content]:h-0 [&::details-content]:overflow-hidden [&::details-content]:transition-all [&[open]::details-content]:h-auto',
          className,
        )}
        {...props}
        style={{ ...style }}
      />
    );
  },
);
AccordionRoot.displayName = 'AccordionRoot';

const AccordionSummary = React.memo(
  ({ className, children, ...props }: React.HTMLProps<HTMLElement>) => {
    return (
      <summary
        className={cn(
          'group -mx-2 flex flex-1 cursor-pointer items-center rounded-md p-2 text-foreground outline-none transition-all marker:hidden focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
          className,
        )}
        {...props}>
        {children}
        <svg
          viewBox="0 0 24 24"
          className="ml-auto size-4 fill-none stroke-current stroke-2 transition-transform group-open/accordion:rotate-180"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M5 12h14" />
          <path
            d="M12 5v14"
            className="origin-center transition-transform group-open/accordion:rotate-90"
          />
        </svg>
      </summary>
    );
  },
);
AccordionSummary.displayName = 'AccordionSummary';

const AccordionContent = React.memo(
  ({ className, ...props }: React.HTMLProps<HTMLDivElement>) => {
    return (
      <div
        className={cn('overflow-hidden pb-2 text-muted-fg', className)}
        {...props}
      />
    );
  },
);
AccordionContent.displayName = 'AccordionContent';

export const Accordion = Object.assign(AccordionRoot, {
  Summary: AccordionSummary,
  Content: AccordionContent,
});
