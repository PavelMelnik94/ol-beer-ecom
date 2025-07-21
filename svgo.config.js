export default {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false, // Сохраняет viewBox для масштабирования
        },
      },
    },
    'removeDimensions', // Удаляет width/height, чтобы использовать CSS
  ],
};
