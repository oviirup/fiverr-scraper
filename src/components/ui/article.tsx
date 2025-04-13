import type { GigDetails } from '~/types';
import Markdown from 'markdown-to-jsx';
import { Accordion } from './accordion';
import { Button } from './button';
import { Icon } from './icon';

type ArticleProps = {
  data: GigDetails;
  onRemove: (id: number) => void;
};
export function Article({ data, onRemove }: ArticleProps) {
  return (
    <article
      key={data.id}
      className="flex max-w-full flex-col gap-3 rounded-xl bg-card p-3">
      <a href={data.link || '#'} target="_blank" className="text-foreground">
        <h3 className="text-lg font-medium leading-tight">
          I will {data.title}
        </h3>
      </a>
      <div className="flex items-center gap-3">
        <a
          href={data.seller.link}
          target="_blank"
          className="flex items-center gap-1">
          <img
            src={data.seller.image}
            alt={data.seller.displayName}
            className="size-6 rounded-full"
          />
          <span className="underline decoration-muted-fg underline-offset-2">
            {data.seller.displayName || data.seller.username}
          </span>
        </a>
        <div className="flex items-center gap-1 text-sm">
          <Icon name="star" size={16} fill="hsl(var(--color-muted-fg) / 0.5)" />
          <span>{data.rating}</span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <Icon
            name="reviews"
            size={16}
            fill="hsl(var(--color-muted-fg) / 0.5)"
          />
          <span className="ml-1 inline-flex text-sm">{data.review_count}</span>
        </div>
      </div>
      <Markdown
        className="prose prose-neutral max-h-24 overflow-hidden text-sm text-muted-fg *:my-1 *:first:mt-0 *:last:mb-0 [&_*]:text-muted-fg"
        style={{
          mask: `linear-gradient(to bottom, black 48px, transparent )`,
        }}>
        {data.description.replace(/\n/, '\n\n')}
      </Markdown>
      <div className="flex flex-col">
        {data.packages.map((pkg) => (
          <Accordion
            key={pkg.title}
            name={`packages::${data.id}`}
            className="flex flex-col p-1 text-sm leading-none not-last:mb-1 not-last:border-b not-last:pb-1">
            <Accordion.Summary className="flex items-center gap-1 text-muted-fg *:shrink-0">
              <span className="font-medium text-foreground">{pkg.price}</span>-
              <span className="text-right">
                {pkg.duration === 1 ? '1 day' : `${pkg.duration} days`}
              </span>
            </Accordion.Summary>
            <Accordion.Content>
              <div className="flex items-start gap-2 capitalize">
                {pkg.title.toLowerCase()}
              </div>
              <div className="text-sm text-muted-fg">{pkg.description}</div>
            </Accordion.Content>
          </Accordion>
        ))}
      </div>
      <Button
        variant="outline"
        className="text-destructive"
        size="sm"
        onClick={() => onRemove(data.id)}>
        <Icon name="trash" size={16} />
        Remove
      </Button>
    </article>
  );
}
