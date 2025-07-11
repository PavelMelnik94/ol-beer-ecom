---
description: "TypeScript и React специфичные инструкции"
applyTo: "**/*.{ts,tsx}"
---

# TypeScript & React Instructions

## TypeScript Best Practices
- Используй строгую типизацию везде
- Предпочитай `interface` для описания объектов
- Используй `type` для unions и computed types
- Всегда типизируй пропсы компонентов
- Используй generics для переиспользуемых компонентов

## React Component Guidelines
- Только функциональные компоненты с хуками
- Используй `React.memo()` для оптимизации
- Деструктурируй пропсы в параметрах функции
- Используй TypeScript для типизации пропсов
- Группируй хуки в начале компонента

## Hooks Rules
- Всегда указывай dependencies в useEffect
- Используй useCallback для функций в dependencies
- Используй useMemo для expensive calculations
- Кастомные хуки начинаются с "use"
- Возвращай объект из кастомных хуков для лучшей расширяемости

## Naming Conventions
- Компоненты: snake-case (`user-profile.tsx`)
- Хуки: camelCase с префиксом "use"
- Типы и интерфейсы: PascalCase
- Константы: SCREAMING_SNAKE_CASE
