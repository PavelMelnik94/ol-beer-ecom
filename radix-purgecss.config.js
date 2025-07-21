/**
 * Специфические настройки PurgeCSS для Radix UI компонентов
 * Этот файл содержит точные паттерны классов Radix UI, которые нужно сохранить
 */

// Radix UI Button классы
export const RADIX_BUTTON_CLASSES = [
  /rt-Button/,
  /rt-button/,
  /rt-BaseButton/,
  /rt-variant-solid/,
  /rt-variant-soft/,
  /rt-variant-outline/,
  /rt-variant-ghost/,
  /rt-variant-surface/,
  /rt-color-/,
  /rt-size-/,
  /rt-radius-/,
  /rt-loading/,
  /rt-disabled/,
];

// Radix UI Layout классы
export const RADIX_LAYOUT_CLASSES = [
  /rt-Box/,
  /rt-Container/,
  /rt-Flex/,
  /rt-Grid/,
  /rt-Section/,
  /rt-Separator/,
  /rt-AspectRatio/,
];

// Radix UI Typography классы
export const RADIX_TYPOGRAPHY_CLASSES = [
  /rt-Text/,
  /rt-Heading/,
  /rt-Quote/,
  /rt-Code/,
  /rt-Em/,
  /rt-Kbd/,
  /rt-Link/,
  /rt-Strong/,
];

// Radix UI Form классы
export const RADIX_FORM_CLASSES = [
  /rt-TextField/,
  /rt-TextArea/,
  /rt-Select/,
  /rt-Checkbox/,
  /rt-RadioGroup/,
  /rt-Switch/,
  /rt-Slider/,
];

// Radix UI Navigation классы
export const RADIX_NAVIGATION_CLASSES = [
  /rt-Tabs/,
  /rt-DropdownMenu/,
  /rt-ContextMenu/,
  /rt-NavigationMenu/,
];

// Radix UI Overlay классы
export const RADIX_OVERLAY_CLASSES = [
  /rt-Dialog/,
  /rt-AlertDialog/,
  /rt-Popover/,
  /rt-Tooltip/,
  /rt-HoverCard/,
];

// Radix UI Data Display классы
export const RADIX_DATA_CLASSES = [
  /rt-Avatar/,
  /rt-Badge/,
  /rt-Card/,
  /rt-Table/,
  /rt-Progress/,
  /rt-Spinner/,
];

// Все Radix UI классы объединённые
export const ALL_RADIX_CLASSES = [
  ...RADIX_BUTTON_CLASSES,
  ...RADIX_LAYOUT_CLASSES,
  ...RADIX_TYPOGRAPHY_CLASSES,
  ...RADIX_FORM_CLASSES,
  ...RADIX_NAVIGATION_CLASSES,
  ...RADIX_OVERLAY_CLASSES,
  ...RADIX_DATA_CLASSES,
];

// CSS Custom Properties специфичные для Radix UI
export const RADIX_CSS_VARS = [
  /--accent-/,
  /--gray-/,
  /--blue-/,
  /--red-/,
  /--green-/,
  /--yellow-/,
  /--orange-/,
  /--purple-/,
  /--pink-/,
  /--brown-/,
  /--sky-/,
  /--mint-/,
  /--lime-/,
  /--yellow-/,
  /--amber-/,
  /--orange-/,
  /--tomato-/,
  /--red-/,
  /--ruby-/,
  /--crimson-/,
  /--pink-/,
  /--plum-/,
  /--purple-/,
  /--violet-/,
  /--iris-/,
  /--indigo-/,
  /--blue-/,
  /--cyan-/,
  /--teal-/,
  /--jade-/,
  /--green-/,
  /--grass-/,
  /--bronze-/,
  /--gold-/,
  /--brown-/,
  /--sand-/,
  /--tomato-/,
  /--slate-/,
  /--mauve-/,
  /--olive-/,
  /--sage-/,
  /--black-/,
  /--white-/,
];

// Состояния и модификаторы Radix UI
export const RADIX_STATES = [
  /\[data-state/,
  /\[data-orientation/,
  /\[data-side/,
  /\[data-align/,
  /\[data-disabled/,
  /\[data-highlighted/,
  /\[data-placeholder/,
  /\[data-invalid/,
  /\[aria-/,
  /\[role=/,
];

// Псевдо-селекторы и интерактивные состояния
export const INTERACTIVE_STATES = [
  /:hover/,
  /:focus/,
  /:focus-visible/,
  /:focus-within/,
  /:active/,
  /:disabled/,
  /:checked/,
  /:indeterminate/,
  /:invalid/,
  /:valid/,
  /:required/,
  /:optional/,
  /:read-only/,
  /:read-write/,
  /:placeholder-shown/,
  /:default/,
  /:target/,
  /:visited/,
  /:link/,
  /:first-child/,
  /:last-child/,
  /:nth-child/,
  /:first-of-type/,
  /:last-of-type/,
  /:nth-of-type/,
  /:only-child/,
  /:only-of-type/,
  /:empty/,
  /:root/,
  /:before/,
  /:after/,
  /:selection/,
  /:backdrop/,
];

// Безопасная конфигурация PurgeCSS для Radix UI
export const SAFE_RADIX_CONFIG = {
  safelist: {
    standard: [
      ...ALL_RADIX_CLASSES,
      ...RADIX_CSS_VARS,
      ...RADIX_STATES,
      ...INTERACTIVE_STATES,
      // Добавляем общие CSS свойства
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
      /top/,
      /right/,
      /bottom/,
      /left/,
      /transform/,
      /transition/,
      /animation/,
      /opacity/,
      /visibility/,
      /overflow/,
      /z-index/,
      /box-shadow/,
      /text-shadow/,
      /border-radius/,
      /outline/,
      /cursor/,
      /pointer-events/,
      /user-select/,
      /white-space/,
      /word-wrap/,
      /word-break/,
      /line-height/,
      /text-align/,
      /text-decoration/,
      /text-transform/,
      /letter-spacing/,
      /vertical-align/,
      /list-style/,
      /flex/,
      /grid/,
      /align/,
      /justify/,
      /gap/,
      /order/,
    ],
    deep: [
      // Сохраняем все Radix UI классы полностью
      /rt-.*/,
      /radix-.*/,
      // Сохраняем все hover и focus состояния
      /.*:hover.*/,
      /.*:focus.*/,
      /.*:active.*/,
      /.*:disabled.*/,
      // Сохраняем CSS modules
      /_\w+_.*/,
      // Сохраняем data и aria атрибуты
      /.*\[data-.*/,
      /.*\[aria-.*/,
    ],
    greedy: [
      // Сохраняем все атрибутные селекторы
      /\[.*\]/,
      // Сохраняем CSS переменные
      /var\(--.*\)/,
      // Сохраняем calc() функции
      /calc\(.*\)/,
    ],
  },
};
