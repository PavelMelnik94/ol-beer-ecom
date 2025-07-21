import { purgeCSSPlugin } from '@fullhuman/postcss-purgecss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import { purgeCSSConfig } from './purgecss.config.js';

export default {
  plugins: [
    autoprefixer,
    cssnano({
      preset: 'default',
    }),
    // Применяем PurgeCSS только в production mode и если явно разрешено
    ...(process.env.NODE_ENV === 'production' && process.env.ENABLE_PURGECSS === 'true'
      ? [purgeCSSPlugin(purgeCSSConfig)]
      : []),
  ],
};
