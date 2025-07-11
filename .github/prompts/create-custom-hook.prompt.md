---
description: "Создание кастомного хука"
mode: "agent"
---

# Create Custom Hook

Создай кастомный хук со следующими характеристиками:

## Hook Structure
- TypeScript типизация для параметров и возвращаемых значений
- Префикс "use" в названии
- Возвращай объект для лучшей расширяемости
- Используй существующие React хуки как базу

## Best Practices
- Правильно указывай dependencies в useEffect
- Используй useCallback и useMemo для оптимизации
- Обрабатывай loading и error состояния
- Следуй принципам separation of concerns

## Files Structure
- `${input:hook-name}.ts` - основной хук
- `types.ts` - TypeScript типы

Название хука: ${input:hook-name:use-my-hook}
