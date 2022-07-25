module.exports = {
  purge: {
    enabled: true,
    content: ['./src/**/*.{js,jsx,ts,tsx,vue}'],
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
  theme: {
    extend: {
      aspectRatio: {
        cinema: '21/9',
        card: '4/3',
      },
      colors: {
        'primary': 'var(--zmp-theme-color)',
        'secondary': 'var(--zmp-secondary-color)',
      },
      zIndex: {
        'max': '10000'
      },
      border: {
        'border-b-1': 'border-bottom-width: 1px'
      }
    },
  },
};
