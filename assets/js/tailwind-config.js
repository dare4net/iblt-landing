// External Tailwind CDN configuration
window.tailwind = window.tailwind || {};
window.tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        'background-light': '#ffffff',
        'background-dark': '#111827',
        'text-light': '#374151',
        'text-dark': '#e5e7eb',
        'card-light': '#f9fafb',
        'card-dark': '#1f2937',
        'border-light': '#e5e7eb',
        'border-dark': '#374151',
      },
      fontFamily: {
        display: ['Roboto', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
      },
    },
  },
};
