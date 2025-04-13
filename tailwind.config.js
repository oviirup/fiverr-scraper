import typography from '@tailwindcss/typography';
import pluggables from 'tailwindcss-pluggables';
import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.{html,ts,tsx}'],
  theme: {
    container: { center: true },
    extend: {
      colors: {
        background: 'hsl(var(--color-background))',
        foreground: 'hsl(var(--color-foreground))',
        border: 'hsl(var(--color-border))',
        input: 'hsl(var(--color-input))',
        ring: 'hsl(var(--color-ring))',
        primary: {
          DEFAULT: 'hsl(var(--color-primary))',
          fg: 'hsl(var(--color-primary-fg))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--color-secondary))',
          fg: 'hsl(var(--color-secondary-fg))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--color-destructive))',
          fg: 'hsl(var(--color-destructive-fg))',
        },
        muted: {
          DEFAULT: 'hsl(var(--color-muted))',
          fg: 'hsl(var(--color-muted-fg))',
        },
        accent: {
          DEFAULT: 'hsl(var(--color-accent))',
          fg: 'hsl(var(--color-accent-fg))',
        },
        popover: {
          DEFAULT: 'hsl(var(--color-popover))',
          fg: 'hsl(var(--color-popover-fg))',
        },
        card: {
          DEFAULT: 'hsl(var(--color-card))',
          fg: 'hsl(var(--color-card-fg))',
        },
      },
      borderRadius: {
        xl: 'calc(var(--radius) + 2px)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        body: 'Inter, serif',
        heading: 'Raleway, serif',
      },
    },
  },
  future: { disableColorOpacityUtilitiesByDefault: true },
  plugins: [
    ...pluggables(),
    typography,
    plugin((tw) => {
      tw.addUtilities({
        '.transition-discrete': { transitionBehavior: 'allow-discrete' },
        '.field-sizing-fixed': { fieldSizing: 'fixed' },
        '.field-sizing-content': { fieldSizing: 'content' },
      });
    }),
  ],
};

export default config;
