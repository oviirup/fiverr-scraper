import { Storage } from '@plasmohq/storage';

const CACHED_TOKEN: string = undefined;
const storage = new Storage({ area: 'local' });

chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    const token = details.requestHeaders.find(
      (e) => e.name.toLowerCase() === 'x-csrf-token',
    )?.value;
    // save csrf token to local storage
    if (!token || token === CACHED_TOKEN) return;
    storage.set('CSRF_TOKEN', token);
  },
  { urls: ['https://www.fiverr.com/*'] },
  ['requestHeaders'],
);
