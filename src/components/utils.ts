import { isFunction, isObject } from '~/lib/assertions';
import { cx } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

/** Creates a formatted className from given arguments */
export function cn(...args: any[]): string {
  return twMerge(cx(args));
}

type PossibleRef<El> = React.Ref<El> | undefined;
/** Use multiple refs on a single element */
export function referrals<El extends Element>(...refs: PossibleRef<El>[]) {
  if (!refs.length) return;
  return (el: El) => {
    for (const ref of refs) {
      if (!ref) continue;
      else if (isFunction(ref)) ref(el);
      else if (isObject(ref)) ref.current = el;
    }
  };
}
