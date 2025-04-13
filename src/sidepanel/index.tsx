import { KEYS, useStorage } from '~/lib/storage';
import type { GigDetails } from '~/types';
import * as React from 'react';
import YAML from 'yaml';
import '~/components/tailwind.css';
import { Article } from '~/components/ui/article';
import { Button } from '~/components/ui/button';
import { Icon } from '~/components/ui/icon';
import Markdown from 'markdown-to-jsx';

export default function SidePanel() {
  const [collections, setCollections] = useStorage<GigDetails[]>(
    KEYS.collection,
    [],
  );

  const removeEntry = React.useCallback(
    (id: number) => setCollections((prev) => prev.filter((c) => c.id !== id)),
    [setCollections],
  );

  const copyToClipboard = React.useCallback(() => {
    const content = collections
      .map((c) => {
        const { seller, id, link, review_count, rating_count, ...main } = c;
        return YAML.stringify(main);
      })
      .join('\n\n---\n\n');
    navigator.clipboard.writeText(content);
  }, [collections]);

  const downloadAsYaml = React.useCallback(() => {
    const content = YAML.stringify(collections);
    const blob = new Blob([content], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'collections.yaml';
    a.click();
    URL.revokeObjectURL(url);
    a.remove();
  }, [collections]);

  return (
    <div className="flex min-h-svh flex-col">
      <main className="flex flex-col gap-6 p-2">
        <div className="flex flex-col gap-2">
          {collections?.map((collection) => (
            <Article
              key={collection.id}
              data={collection}
              onRemove={removeEntry}
            />
          ))}
        </div>
      </main>
      <div className="sticky bottom-0 z-50 mt-auto flex gap-2 p-2">
        <div className="absolute inset-0 -top-6 -z-1 bg-gradient-to-b from-background/0 via-background/75 to-background" />
        <Button size="lg" onClick={copyToClipboard} icon className="rounded-xl">
          <Icon name="command" size={18} />
          <span className="sr-only">Copy to clipboard</span>
        </Button>
        <Button
          size="lg"
          onClick={downloadAsYaml}
          className="flex-1 rounded-xl">
          <Icon name="save" size={18} />
          Download as YAML
        </Button>
      </div>
    </div>
  );
}
