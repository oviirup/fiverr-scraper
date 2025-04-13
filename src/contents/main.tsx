import { parseMetadata } from '~/contents/parser';
import type { PlasmoCSConfig } from 'plasmo';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { observe } from 'selector-observer';
import './styles.css';
import { KEYS, useStorage } from '~/lib/storage';
import type { GigDetails } from '~/types';

function Button() {
  const [token] = useStorage(KEYS.token);
  const [, setCollections] = useStorage<GigDetails[]>(KEYS.collection, []);
  const [pending, startTransition] = React.useTransition();

  const generateLink = React.useCallback(
    async (id: number, fallback?: string) => {
      if (!token) return fallback;
      const generateLinkURL = 'https://www.fiverr.com/sharing/generate_link';
      const options = {
        method: 'POST',
        body: JSON.stringify({
          is_resource_owner: false,
          medium: 'copy_link',
          resource_id: id,
          resource_type: 'gig',
          source: 'gigs_show_buyers',
        }),
        headers: {
          accept: 'application/json',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7,bn;q=0.6',
          'content-type': 'application/json',
          'x-csrf-token': token,
          'x-requested-with': 'XMLHttpRequest',
        },
      };

      return await fetch(generateLinkURL, options)
        .then(async (res) => {
          if (!res.ok || res.status > 400) return fallback;
          return (await res.json()).link;
        })
        .catch((err) => {
          console.error(err);
          return fallback;
        });
    },
    [token],
  );

  const handleOnClick = React.useCallback(() => {
    startTransition(async () => {
      try {
        const jsonLD = document.querySelector('script#perseus-initial-props');
        const raw = jsonLD.textContent.trim();
        const data = parseMetadata(JSON.parse(raw));
        data.link = await generateLink(data.id, data.link);
        setCollections((prev) => {
          const index = prev.findIndex((c) => c.id === data.id);
          if (index === -1) prev.push(data);
          return prev;
        });
      } catch (err) {
        console.error(err);
      }
    });
  }, [token, pending, startTransition]);

  // prettier-ignore
  return (
    <button className="ZnV0WzM Fbl5sBD co-white bg-co-black inline-flex w-full items-center text-sm font-medium disabled:opacity-75" type="button" onClick={handleOnClick} disabled={pending}>
      <span className='flex-1 text-center'>
      Add to Collection
      </span>
      <span className="atCuSzl rf" aria-hidden="true">
      <svg  width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3"/><path d="M16 19h6"/><path d="M19 22v-6"/></svg>
      </span>
    </button>
  );
}

observe('.sticky-outer-wrapper.sidebar.react-sticky .collect-wrapper', {
  constructor: HTMLDivElement,
  add: (el) => {
    const parent = el.parentElement;
    const wrapper = document.createElement('span');
    wrapper.className = 'flex w-full mb-4';
    parent.before(wrapper);
    createRoot(wrapper).render(<Button />);
  },
});

export const config: PlasmoCSConfig = {
  matches: ['https://www.fiverr.com/*'],
};
