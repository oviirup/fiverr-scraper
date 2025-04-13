import * as React from 'react';
import type IconSprite from '~/icon.sprite.json';

export type IconProps = React.SVGAttributes<SVGElement> & {
  name: keyof (typeof IconSprite)['icons'];
  internal?: boolean;
  size?: number | string;
};

/**
 * Icon component with svg sprites
 *
 * @see {@link https://youtu.be/1-Gjec48nJs}
 * @see {@link https://benadam.me/thoughts/react-svg-sprites/}
 */
function Icon({ size = '1em', name, internal = false, ...props }: IconProps) {
  let iconSourceHref = `#${name}`;
  if (typeof chrome !== 'undefined' && !internal) {
    // prevents error in case of server script
    iconSourceHref = chrome.runtime.getURL(`assets/icon.sprite.svg#${name}`);
  }
  return (
    <svg
      width={size}
      height={size}
      fill="none"
      stroke="currentcolor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
      viewBox="0 0 24 24"
      role="img"
      data-icon={name}
      aria-hidden>
      <use href={iconSourceHref} />
    </svg>
  );
}

namespace Icon {
  export type Props = IconProps;
  export type IconName = keyof (typeof IconSprite)['icons'];
}

export { Icon };
