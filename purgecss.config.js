// PurgeCSS конфигурация для проекта с SCSS modules и Radix UI
// Этот файл можно использовать для fine-tuning настроек PurgeCSS

import { SAFE_RADIX_CONFIG } from './radix-purgecss.config.js';

/**
 * Радикс UI классы, которые нужно всегда сохранять
 */
export const RADIX_SAFELIST = [
  // Базовые Radix UI Theme классы
  /^rt-/,
  /^radix-/,

  // CSS-in-JS классы
  /^css-/,

  // Состояния и атрибуты
  /^data-/,
  /^aria-/,
  /\[data-/,
  /\[aria-/,

  // CSS Custom Properties
  /^--radix/,
  /^--color/,
  /^--space/,
  /^--font/,
  /^--radius/,
  /^--shadow/,
  /^--cursor/,

  // Состояния компонентов и псевдо-селекторы
  /:hover/,
  /:focus/,
  /:active/,
  /:disabled/,
  /:checked/,
  /:selected/,
  /:open/,
  /:closed/,
  /:visited/,
  /:link/,
  /:first-child/,
  /:last-child/,
  /:nth-child/,

  // Padding, margin и spacing классы
  /padding/,
  /margin/,
  /space/,
  /gap/,
  /^p-/,
  /^m-/,
  /^px-/,
  /^py-/,
  /^pt-/,
  /^pb-/,
  /^pl-/,
  /^pr-/,
  /^mx-/,
  /^my-/,
  /^mt-/,
  /^mb-/,
  /^ml-/,
  /^mr-/,
];

/**
 * CSS модули классы, которые нужно сохранять
 */
export const CSS_MODULES_SAFELIST = [
  // Модульные классы
  /^_\w+_\w+/,

  // Глобальные классы в модулях
  /:global\(/,

  // Анимации
  /keyframes/,
  /animation/,
  /transform/,
  /transition/,
];

/**
 * Глобальные классы, которые нужно сохранять
 */
export const GLOBAL_SAFELIST = [
  // HTML элементы
  'html',
  'body',
  '*',
  '::before',
  '::after',

  // Утилитарные классы
  /hidden/,
  /visible/,
  /sr-only/,

  // Классы для анимаций
  /fade/,
  /slide/,
  /zoom/,
  /rotate/,
  /scale/,

  // Layout и sizing
  /flex/,
  /grid/,
  /block/,
  /inline/,
  /absolute/,
  /relative/,
  /fixed/,
  /sticky/,
  /w-/,
  /h-/,
  /min-/,
  /max-/,

  // Colors и backgrounds
  /bg-/,
  /text-/,
  /border/,
  /shadow/,

  // Typography
  /font/,
  /text/,
  /leading/,
  /tracking/,
  /whitespace/,

  // Все CSS свойства (консервативный подход)
  /padding/,
  /margin/,
  /border/,
  /background/,
  /color/,
  /font/,
  /display/,
  /position/,
  /width/,
  /height/,
  /overflow/,
  /opacity/,
  /transform/,
  /transition/,
];

/**
 * Блокированные селекторы (которые нельзя удалять)
 */
export const BLOCKED_SELECTORS = [
  // Псевдо-селекторы
  /:hover/,
  /:focus/,
  /:active/,
  /:disabled/,
  /:checked/,

  // Медиа-запросы (сохраняем содержимое)
  /@media/,
  /@supports/,
  /@container/,

  // Keyframes
  /@keyframes/,
];

/**
 * Кастомный extractor для React компонентов
 */
export function reactExtractor(content) {
  // Классы из CSS modules
  const cssModuleImports = content.match(/import\s+(\w+)\s+from\s+['"][^'"]*\.module\.scss['"];?/gi) || [];
  const cssModuleClasses = cssModuleImports.flatMap((match) => {
    const className = match.match(/import\s+(\w+)/i)?.[1];
    return className ? [className] : [];
  });

  // Классы из className атрибутов
  const classNames = content.match(/className=['"]([^'"]*)['"]/gi) || [];
  const extractedClasses = classNames.flatMap((match) => {
    const classMatch = match.match(/className=['"]([^'"]*)['"]/i);
    return classMatch ? classMatch[1].split(/\s+/).filter(Boolean) : [];
  });

  // Классы из clsx/classnames функций
  const clsxMatches = content.match(/clsx\(([^)]+)\)/gi) || [];
  const clsxClasses = clsxMatches.flatMap((match) => {
    const classMatch = match.match(/['"]([^'"]+)['"]/g) || [];
    return classMatch.map(cls => cls.replaceAll(/['"]/g, ''));
  });

  // Селекторы из styled-components или emotion
  const styledMatches = content.match(/styled\.\w+`([^`]*)`/gi) || [];
  const styledClasses = styledMatches.flatMap((match) => {
    const classMatch = match.match(/\.(\w+)/g) || [];
    return classMatch.map(cls => cls.replace('.', ''));
  });

  // Обычные CSS селекторы
  const generalClasses = content.match(/\b[a-z]\w*\b/gi) || [];

  return [
    ...cssModuleClasses,
    ...extractedClasses,
    ...clsxClasses,
    ...styledClasses,
    ...generalClasses,
  ].filter(Boolean);
}

/**
 * Полная конфигурация PurgeCSS
 */
export const purgeCSSConfig = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
    './src/**/*.module.scss',
    './src/**/*.scss',
    './src/**/*.css',
    // Включаем Radix UI исходники для определения используемых классов
    './node_modules/@radix-ui/**/*.{js,ts}',
  ],

  safelist: {
    standard: [
      ...RADIX_SAFELIST,
      ...CSS_MODULES_SAFELIST,
      ...GLOBAL_SAFELIST,
      ...SAFE_RADIX_CONFIG.safelist.standard,
      // Дополнительные псевдо-селекторы
      /:hover/,
      /:focus/,
      /:active/,
      /:disabled/,
      /:checked/,
      /:visited/,
      /:first-child/,
      /:last-child/,
      /:nth-child/,
      /:before/,
      /:after/,
      // CSS переменные
      /^--/,
      // Медиа-запросы и at-правила
      /@media/,
      /@supports/,
      /@keyframes/,
    ],
    deep: [
      ...SAFE_RADIX_CONFIG.safelist.deep,
    ],
    greedy: [
      ...SAFE_RADIX_CONFIG.safelist.greedy,
    ],
  },

  // Не блокируем ничего - пусть лучше сохранится лишнее
  blocklist: [],

  extractors: [
    {
      extractor: reactExtractor,
      extensions: ['tsx', 'ts', 'jsx', 'js'],
    },
  ],

  // Более консервативные настройки
  variables: false, // Не удаляем CSS переменные
  keyframes: false, // Не удаляем keyframes
  fontFace: false, // Не удаляем font-face
  rejected: false,
  rejectedCss: false,

  // Дополнительные настройки для безопасности
  defaultExtractor: (content) => {
    // Более щадящий экстрактор по умолчанию
    const matches = content.match(/[\w\-/:]+/g) || [];
    return matches;
  },
};
