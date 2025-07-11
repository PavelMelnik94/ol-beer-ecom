---
description: "Создание Zustand store"
mode: "agent"
---

# Create Zustand Store

Создай Zustand store со следующими требованиями:

## Store Structure
- TypeScript типизация для state и actions
- Плоская структура state
- Actions как методы store
- Selectors для вычисляемых значений

## Features
- Persist middleware для localStorage (если нужно)
- Devtools для development
- Immutable updates
- Error handling

## File Structure
- `${input:store-name}-store.ts` - основной store
- `types.ts` - TypeScript интерфейсы
- `selectors.ts` - селекторы (если много)

## Best Practices
- Один store на модуль/фичу
- Логическая группировка actions
- Async actions с loading states
- Type-safe selectors

Название store: ${input:store-name:my}-store
