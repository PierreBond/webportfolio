/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "rgb(var(--color-canvas) / <alpha-value>)",
        frost: "rgb(var(--color-text) / <alpha-value>)",
        silver: "rgb(var(--color-border) / <alpha-value>)",
        mint: "rgb(var(--color-accent) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        sans: ['Space Grotesk', 'sans-serif'],
      },
      maxWidth: {
        site: '1200px',
      },
      spacing: {
        'section': '100px',
        'card': '20px',
      },
      borderRadius: {
        pill: '9999px',
        card: '0px',
        link: '8.64px',
      },
      fontSize: {
        'caption': ['13px', { lineHeight: '1.5' }],
        'body-lg': ['17px', { lineHeight: '1.62' }],
        'subheading': ['22px', { lineHeight: '1.38' }],
        'heading-sm': ['30px', { lineHeight: '1.27', letterSpacing: '-0.032em' }],
        'heading': ['46px', { lineHeight: '1.27', letterSpacing: '-0.032em' }],
        'heading-lg': ['54px', { lineHeight: '1', letterSpacing: '-0.032em' }],
        'display': ['110px', { lineHeight: '1', letterSpacing: '-0.036em' }],
        'display-xl': ['220px', { lineHeight: '1', letterSpacing: '-0.036em' }],
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
    },
  },
  plugins: [],
}
