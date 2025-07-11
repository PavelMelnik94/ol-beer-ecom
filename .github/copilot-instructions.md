# Copilot Custom Instructions

## Технический стек
Используй следующий технический стек для всех решений:
- React 18 с функциональными компонентами и хуками
- TypeScript с строгой типизацией
- SCSS modules для стилизации (Tailwind запрещен)
- Zustand для state management
- Vite как build tool и dev server
- React Hook Form для работы с формами
- Zod для валидации и типизации данных
- React Query для работы с серверным состоянием
- ESLint  для code quality
- Radix-ui/Themes для UI компонентов
- React-spring для анимаций
- Lucide Icons для иконок


## Архитектурные принципы
Следуй принципам GRASP, SOLID, YAGNI, KISS:
- **Высокая связанность, низкое сцепление** (high cohesion, low coupling)
-  используй структуру module/group/model/lib/ui. global API(modules)
- **Separation of Concerns**: разделяй логику на слои (api, stores, hooks, ui, model)
- **DRY но без over-engineering**: не создавай абстракции раньше времени

## TypeScript конвенции
- Используй строгую типизацию (`strict: true`)
- Предпочитай `interface` для описания объектов
- Используй `type` для unions, intersections и computed types
- Экспортируй типы отдельно от значений
- Используй generics для переиспользуемых компонентов
- Всегда типизируй пропсы компонентов, хуки и функции

## React best practices
- Только функциональные компоненты с хуками
- Используй `React.memo()` для оптимизации перерендеров
- Предпочитай composition над inheritance
- Кастомные хуки для переиспользуемой логики
- Правильная работа с dependencies в useEffect
- Используй React Hook Form для всех форм
- Валидация через Zod schemas

## Структура модулей
Каждый модуль должен содержать:
```
module/
├── index.ts          # Public API модуля
├── api/              # HTTP запросы и endpoints
├── hooks/            # Кастомные хуки модуля
├── stores/           # Zustand stores
├── types/            # TypeScript типы и interfaces
├── ui/               # UI компоненты
├── model/            # Бизнес-логика и entities
└── utils/            # Утилитарные функции
```

изучий файл README.md в корне модуля для подробной информации о архитектуре проекта.

## Naming conventions
- Компоненты: kebab-case (`user-profile.tsx`)
- Хуки: kebab-case с префиксом `use` (`use-auth.ts`)
- Файлы: kebab-case (`user-profile.module.scss`)
- Stores: kebab-case с суффиксом `Store` (`auth-store.ts`)
- Константы: SCREAMING_SNAKE_CASE (`API_ENDPOINTS`)
- Типы: PascalCase (`UserProfile`, `AuthState`)

## Code style
- ES6+ синтаксис везде где возможно
- Деструктуризация для объектов и массивов
- Template literals вместо конкатенации строк
- Arrow functions для callbacks и простых функций
- Optional chaining (`?.`) и nullish coalescing (`??`)
- Предпочитай `const` над `let`, избегай `var`

## SCSS modules
- Используй SCSS modules для изоляции стилей
- CSS custom properties для темизации
- Mobile-first подход для responsive design
- Предпочитай Flexbox и Grid над float
- Используй clsx для условных классов

## State management (Zustand)
- Один store на модуль/фичу
- Плоская структура state
- Immutable updates с immer при необходимости
- Actions как методы store
- Selectors для вычисляемых значений
- Persist middleware для localStorage

## Error handling
- Используй Error Boundary для ошибок компонентов
- Try-catch для async операций
- Custom Error классы для разных типов ошибок
- Centralized error logging
- Graceful degradation UI при ошибках

## Performance optimization
- React.memo для компонентов
- useMemo для expensive calculations
- useCallback для функций в dependencies
- Lazy loading для route components
- Code splitting по модулям
- Optimize bundle size с анализом webpack-bundle-analyzer

## Testing strategy
- Unit tests для utils и hooks
- Integration tests для API calls
- Component testing с @testing-library/react
- E2E tests для critical user paths
- Mock external dependencies
- Test coverage минимум 80%

## API интеграция
- Используй React Query или SWR для server state
- Custom hooks для API calls
- Centralized error handling
- Request/response interceptors
- Proper loading и error states
- Optimistic updates где уместно

## Безопасность
- Validate всех входных данных через Zod
- Sanitize user input
- Proper CORS configuration
- Secure headers
- Environment variables для sensitive data
- HTTPS в production

## Developer Experience
- ESLint + Prettier для code quality

## Локализация
Отвечай на русском языке, технические термины можно на английском.
При необходимости указывай npm-пакеты и команды для установки.

## Качество кода
- Не добавляй комментарии к коду (код должен быть self-documenting)
- Читаемость важнее краткости
- Предпочитай явное над неявным
- Consistent code formatting
- Meaningful variable и function names
- Small, focused functions (max 20-30 lines)

## Modern practices 2025
- Используй последние фичи React 18 (Concurrent features, Suspense)
- Server Components где уместно
- Progressive Web App capabilities
- Web Components для переиспользуемых элементов
- CSS Container Queries для responsive design
- Web Vitals optimization
- Accessibility (WCAG 2.1 AA compliance)

## Package management
- Используй npm или yarn
- Lock файлы в git
- Regular dependency updates
- Audit для security vulnerabilities
- Bundle size analysis
- Tree shaking optimization
