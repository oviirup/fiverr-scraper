import { Storage } from '@plasmohq/storage';
import { useStorage as usePlasmoStorage } from '@plasmohq/storage/hook';
import * as React from 'react';

export const storage = new Storage({ area: 'local' });

export const KEYS = {
  collection: 'collection',
  token: 'token',
};

type Setter<T> = ((v?: T, isHydrated?: boolean) => T) | T;

export function useStorage<T = any>(storageKey: string, init?: Setter<T>) {
  const [value, setValue, { isLoading }] = usePlasmoStorage<T>(
    { instance: storage, key: storageKey },
    init,
  );

  React.useEffect(() => {
    const changeHandler = (
      data: Record<string, chrome.storage.StorageChange>,
    ) => {
      for (const key in data) {
        const target = data[key];
        if (key !== storageKey || target.newValue === target.oldValue) continue;
        try {
          const newValue = JSON.parse(target.newValue);
          setValue(newValue);
        } catch {
          // do nothing
        }
      }
    };
    chrome.storage.local.onChanged.addListener(changeHandler);
    return () => {
      chrome.storage.local.onChanged.removeListener(changeHandler);
    };
  }, []);

  return [value, setValue, isLoading] as const;
}
