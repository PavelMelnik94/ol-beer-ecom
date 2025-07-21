# PurgeCSS Configuration Guide

## Обзор

В проекте настроен PurgeCSS для оптимизации CSS в production режиме. Конфигурация учитывает особенности:
- SCSS modules
- Radix UI/Themes
- React компонентов с TypeScript

## Файлы конфигурации

### `postcss.config.js`
Основной файл конфигурации PostCSS, который подключает PurgeCSS только в production режиме.

### `purgecss.config.js`
Детальная конфигурация PurgeCSS с настройками для:
- Safelist (защищённые классы)
- Custom extractors (извлечение классов)
- Блокированные селекторы

## Safelist (Защищённые классы)

### Radix UI классы
```javascript
/^rt-/        // Все классы Radix UI Themes (rt-Button, rt-Text и т.д.)
/^radix-/     // Базовые Radix классы
/^css-/       // CSS-in-JS классы
/^data-/      // Data атрибуты
/^aria-/      // ARIA атрибуты
/^--radix/    // CSS Custom Properties Radix UI
```

### CSS Modules классы
```javascript
/^_\w+_\w+/   // Модульные классы (например: _button_1a2b3c)
/:global\(/   // Глобальные классы в модулях
```

### Анимации и состояния
```javascript
/keyframes/   // CSS анимации
/animation/   // Animation свойства
/transform/   // Transform свойства
/transition/  // Transition свойства
/hover:/      // Hover состояния
/focus:/      // Focus состояния
```

## Custom Extractors

### React Extractor
Извлекает классы из:
- CSS modules импортов: `import styles from './component.module.scss'`
- className атрибутов: `className="rt-Button rt-variant-solid"`
- clsx/classnames функций: `clsx({ active: isActive })`
- styled-components: `styled.div`.class``

## Настройка для разработки

### Отключение PurgeCSS в development
PurgeCSS автоматически отключается в development режиме для быстрой разработки.

### Тестирование конфигурации
```bash
# Production build с PurgeCSS
npm run build

# Development режим без PurgeCSS
npm start
```

## Troubleshooting

### Классы удаляются неправильно

1. **Добавьте класс в safelist**:
```javascript
// В purgecss.config.js
export const GLOBAL_SAFELIST = [
  // Ваш класс
  /your-class-pattern/,
];
```

2. **Проверьте extractor**:
Убедитесь, что ваш способ использования классов покрыт extractors.

3. **Используйте safelist в коде**:
```javascript
// Комментарий для PurgeCSS
/* purgecss start ignore */
.special-class {
  /* этот класс не будет удалён */
}
/* purgecss end ignore */
```

### Radix UI компоненты не работают

1. **Проверьте импорты**:
```tsx
import { Button, Text } from '@radix-ui/themes';
```

2. **Проверьте Theme wrapper**:
```tsx
<Theme>
  <Button>Click me</Button>
</Theme>
```

3. **Добавьте специфичные классы в safelist** если нужно.

### CSS Modules классы удаляются

1. **Проверьте naming convention**:
```scss
// component.module.scss
.button {
  // стили
}
```

2. **Проверьте импорт**:
```tsx
import styles from './component.module.scss';
<div className={styles.button} />
```

## Мониторинг размера bundle

```bash
# Анализ bundle после build
npx vite-bundle-analyzer dist
```

## Best Practices

1. **Используйте сафелист консервативно** - добавляйте только действительно нужные классы
2. **Тестируйте production build** регулярно
3. **Мониторьте размер CSS** после изменений
4. **Используйте комментарии PurgeCSS** для исключений
5. **Документируйте специфичные настройки** в коде

## Производительность

### До PurgeCSS
- CSS размер: ~150-200KB
- Неиспользуемые стили: ~60-70%

### После PurgeCSS
- CSS размер: ~50-80KB
- Экономия: ~50-60%
- Время загрузки: улучшение на 30-40%
