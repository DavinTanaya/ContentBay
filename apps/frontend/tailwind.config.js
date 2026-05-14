import plugin from 'tailwindcss/plugin';
import { antPalette, typographyTokens } from './src/shared/constants/ant-theme';

/** @type {import('tailwindcss').Config} */
export default {
  // Menghapus 'important: true' untuk menggunakan sistem CSS @layer murni
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ...antPalette,
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {};
      
      Object.entries(typographyTokens).forEach(([key, value]) => {
        const className = key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
        
        newUtilities[`.${className}`] = {
          fontSize: typeof value.fontSize === 'number' ? `${value.fontSize}px` : value.fontSize,
          lineHeight: value.lineHeight,
          fontWeight: value.fontWeight.toString(),
          fontFamily: value.fontFamily,
          ...(value.letterSpacing && { letterSpacing: value.letterSpacing }),
        };
      });

      addUtilities(newUtilities);
    }),
  ],
};
