---
description: "SCSS модули и стилизация"
applyTo: "**/*.{scss,css}"
---

# SCSS Modules Instructions

## SCSS Best Practices
- Используй CSS modules для изоляции стилей
- CSS custom properties для темизации
- Mobile-first подход для responsive design
- Предпочитай Flexbox и Grid

## File Structure
- Один SCSS файл на компонент
- Суффикс `.module.scss` для CSS modules
- Группируй селекторы логически
- Используй nested селекторы разумно (max 3 уровня)

## Variables and Mixins
- Используй CSS custom properties вместо Sass переменных
- Создавай mixins для переиспользуемых паттернов
- Группируй медиа-запросы в mixins

## Performance
- Избегай глубокого нестинга
- Используй сокращенные свойства где возможно
- Минимизируй количество селекторов
