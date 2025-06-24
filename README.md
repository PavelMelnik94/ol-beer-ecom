# Frontend Architecture для Beer API

## Обзор архитектуры

Архитектура основана на принципах Clean Architecture с четким разделением ответственности между слоями. Каждый слой имеет строгие правила импортов и зависимостей.

## Структура проекта

```
src/
├── shared/           # Переиспользуемые компоненты и утилиты (уровень 0)
├── kernel/           # Системное ядро приложения (уровень 1)
├── modules/          # Бизнес-логика и фичи (уровень 2)
├── pages/            # Страницы приложения (уровень 3)
└── app/              # Корень приложения (уровень 4)
```

---

## 📁 shared/ (Уровень 0 - Базовый)

> **Принцип**: Не зависит ни от чего. Переиспользуемые компоненты и утилиты.

```
shared/
├── components/       # UI компоненты
│   ├── ui/          # Базовые UI элементы
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.stories.tsx
│   │   │   └── index.ts
│   │   ├── Input/
│   │   ├── Modal/
│   │   ├── Spinner/
│   │   ├── Card/
│   │   ├── Badge/
│   │   └── Tooltip/
│   ├── layout/      # Компоненты лейаута
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── Sidebar/
│   │   └── Container/
│   └── forms/       # Форм компоненты
│       ├── FormField/
│       ├── FormError/
│       └── FormValidation/
├── utils/           # Утилиты
│   ├── format/      # Форматирование
│   │   ├── currency.ts
│   │   ├── date.ts
│   │   └── number.ts
│   ├── validation/  # Валидация
│   │   ├── schemas.ts
│   │   └── validators.ts
│   ├── helpers/     # Хелперы
│   │   ├── array.ts
│   │   ├── object.ts
│   │   └── string.ts
│   └── constants/   # Константы
│       ├── colors.ts
│       ├── sizes.ts
│       └── breakpoints.ts
├── hooks/           # Переиспользуемые хуки
│   ├── useLocalStorage.ts
│   ├── useDebounce.ts
│   ├── useToggle.ts
│   └── useWindowSize.ts
├── types/           # Общие типы
│   ├── common.ts
│   ├── ui.ts
│   └── utility.ts
└── styles/          # Стили
    ├── globals.css
    ├── variables.css
    └── mixins.css
```

**Правила импортов для shared:**

- ❌ НЕ МОЖЕТ импортировать: `kernel`, `modules`, `pages`, `app`
- ✅ МОЖЕТ импортировать: только другие файлы из `shared`

---

## 📁 kernel/ (Уровень 1 - Системный)

> **Принцип**: Системное ядро. Конфигурации, API, глобальное состояние.

```
kernel/
├── api/             # HTTP клиент и API
│   ├── client.ts    # Axios конфигурация
│   ├── interceptors.ts # Request/Response interceptors
│   ├── endpoints.ts # API endpoints константы
│   └── types.ts     # API типы ответов
├── auth/            # Аутентификация
│   ├── auth-store.ts    # MobX store для auth
│   ├── auth-service.ts  # API calls для auth
│   ├── auth-utils.ts    # JWT utilities
│   ├── auth-guards.tsx  # Route guards
│   └── types.ts         # Auth типы
├── query/           # React Query
│   ├── query-client.ts  # QueryClient конфигурация
│   ├── query-keys.ts    # Query keys фабрики
│   ├── hooks/           # Базовые query hooks
│   │   ├── useInfiniteQuery.ts
│   │   ├── useMutationWithToast.ts
│   │   └── useOptimisticUpdate.ts
│   └── types.ts         # Query типы
├── stores/          # MobX глобальные stores
│   ├── root-store.ts    # Корневой store
│   ├── ui-store.ts      # UI состояние
│   ├── cart-store.ts    # Корзина (локальная синхронизация)
│   ├── store-provider.tsx # React Provider
│   └── types.ts         # Store типы
├── router/          # Роутинг
│   ├── router-config.ts # React Router 7 конфигурация
│   ├── route-paths.ts   # Константы путей
│   ├── route-guards.tsx # Компоненты защиты
│   └── types.ts         # Router типы
├── errors/          # Обработка ошибок
│   ├── error-handler.ts # Глобальная обработка
│   ├── error-boundary.tsx # React Error Boundary
│   ├── api-errors.ts    # API error mappers
│   └── types.ts         # Error типы
├── notifications/   # Уведомления
│   ├── notification-store.ts # Toast/notification store
│   ├── notification-service.ts # Сервис уведомлений
│   └── types.ts         # Notification типы
├── types/           # Системные типы
│   ├── index.ts     # Re-export shared-types
│   ├── api.ts       # API response wrappers
│   ├── app.ts       # App-level типы
│   └── environment.ts # Env типы
├── config/          # Конфигурации
│   ├── app.ts       # Конфиг приложения
│   ├── api.ts       # API конфиг
│   ├── env.ts       # Environment variables
│   └── constants.ts # Системные константы
└── index.ts         # Главный экспорт kernel
```

**Правила импортов для kernel:**

- ❌ НЕ МОЖЕТ импортировать: `modules`, `pages`, `app`
- ✅ МОЖЕТ импортировать: `shared`

---

## 📁 modules/ (Уровень 2 - Бизнес-логика)

> **Принцип**: Бизнес-фичи. Каждый модуль инкапсулирует свою предметную область.

```
modules/
├── products/        # Модуль продуктов
│   ├── api/         # API слой модуля
│   │   ├── products-api.ts    # API calls
│   │   ├── products-queries.ts # React Query hooks
│   │   └── types.ts           # API типы модуля
│   ├── stores/      # Локальные stores модуля
│   │   ├── products-filter-store.ts # Фильтры
│   │   ├── products-search-store.ts # Поиск
│   │   └── types.ts               # Store типы
│   ├── components/  # Компоненты модуля
│   │   ├── ProductCard/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductCard.stories.tsx
│   │   │   └── index.ts
│   │   ├── ProductList/
│   │   ├── ProductFilters/
│   │   ├── ProductSearch/
│   │   └── ProductModal/
│   ├── hooks/       # Хуки модуля
│   │   ├── useProductFilters.ts
│   │   ├── useProductSearch.ts
│   │   └── useProductInfiniteScroll.ts
│   ├── utils/       # Утилиты модуля
│   │   ├── product-helpers.ts
│   │   └── product-formatters.ts
│   ├── types/       # Типы модуля
│   │   ├── index.ts
│   │   ├── product.ts
│   │   └── filters.ts
│   └── index.ts     # Экспорт модуля
│
├── auth/            # Модуль аутентификации
│   ├── api/
│   │   ├── auth-api.ts
│   │   ├── auth-queries.ts
│   │   └── types.ts
│   ├── components/
│   │   ├── LoginForm/
│   │   ├── RegisterForm/
│   │   ├── ForgotPasswordForm/
│   │   └── AuthModal/
│   ├── hooks/
│   │   ├── useLogin.ts
│   │   ├── useRegister.ts
│   │   └── useAuthForm.ts
│   ├── utils/
│   │   ├── auth-validation.ts
│   │   └── password-strength.ts
│   ├── types/
│   │   ├── index.ts
│   │   └── auth.ts
│   └── index.ts
│
├── cart/            # Модуль корзины
│   ├── api/
│   │   ├── cart-api.ts
│   │   ├── cart-queries.ts
│   │   └── types.ts
│   ├── stores/
│   │   ├── cart-ui-store.ts    # UI состояние корзины
│   │   └── types.ts
│   ├── components/
│   │   ├── CartItem/
│   │   ├── CartSummary/
│   │   ├── CartDrawer/
│   │   ├── PromoCodeInput/
│   │   └── CheckoutButton/
│   ├── hooks/
│   │   ├── useCart.ts
│   │   ├── useCartItem.ts
│   │   ├── usePromoCode.ts
│   │   └── useCartSync.ts
│   ├── utils/
│   │   ├── cart-calculations.ts
│   │   └── cart-validation.ts
│   ├── types/
│   │   ├── index.ts
│   │   └── cart.ts
│   └── index.ts
│
├── categories/      # Модуль категорий
│   ├── api/
│   │   ├── categories-api.ts
│   │   ├── categories-queries.ts
│   │   └── types.ts
│   ├── components/
│   │   ├── CategoryCard/
│   │   ├── CategoryList/
│   │   ├── CategoryTree/
│   │   └── CategoryBreadcrumbs/
│   ├── hooks/
│   │   ├── useCategories.ts
│   │   └── useCategoryProducts.ts
│   ├── utils/
│   │   └── category-helpers.ts
│   ├── types/
│   │   ├── index.ts
│   │   └── category.ts
│   └── index.ts
│
├── breweries/       # Модуль пивоварен
│   ├── api/
│   │   ├── breweries-api.ts
│   │   ├── breweries-queries.ts
│   │   └── types.ts
│   ├── components/
│   │   ├── BreweryCard/
│   │   ├── BreweryList/
│   │   ├── BreweryDetails/
│   │   └── BreweryMap/
│   ├── hooks/
│   │   ├── useBreweries.ts
│   │   └── useBreweryProducts.ts
│   ├── utils/
│   │   └── brewery-helpers.ts
│   ├── types/
│   │   ├── index.ts
│   │   └── brewery.ts
│   └── index.ts
│
└── user/            # Модуль пользователя
    ├── api/
    │   ├── user-api.ts
    │   ├── user-queries.ts
    │   └── types.ts
    ├── components/
    │   ├── UserProfile/
    │   ├── UserAddresses/
    │   ├── UserAvatar/
    │   ├── UserSettings/
    │   └── AddressForm/
    ├── hooks/
    │   ├── useUserProfile.ts
    │   ├── useUserAddresses.ts
    │   └── useAvatarUpload.ts
    ├── utils/
    │   ├── user-validation.ts
    │   └── address-helpers.ts
    ├── types/
    │   ├── index.ts
    │   ├── user.ts
    │   └── address.ts
    └── index.ts
```

**Правила импортов для modules:**

- ❌ НЕ МОЖЕТ импортировать: `pages`, `app`, другие модули напрямую
- ✅ МОЖЕТ импортировать: `shared`, `kernel`
- ✅ ИСКЛЮЧЕНИЕ: модули могут импортировать типы из других модулей

---

## 📁 pages/ (Уровень 3 - Презентационный)

> **Принцип**: Страницы приложения. Композиция модулей в готовые экраны.

```
pages/
├── home/            # Главная страница
│   ├── HomePage.tsx
│   ├── components/
│   │   ├── HeroSection/
│   │   ├── FeaturedProducts/
│   │   ├── CategoryShowcase/
│   │   └── PromoSection/
│   ├── hooks/
│   │   └── useHomePage.ts
│   └── index.ts
│
├── products/        # Страницы продуктов
│   ├── ProductsPage.tsx      # Список продуктов
│   ├── ProductDetailPage.tsx # Детали продукта
│   ├── components/
│   │   ├── ProductsGrid/
│   │   ├── ProductsFilters/
│   │   ├── ProductsSort/
│   │   └── ProductsPagination/
│   ├── hooks/
│   │   ├── useProductsPage.ts
│   │   └── useProductDetail.ts
│   └── index.ts
│
├── categories/      # Страницы категорий
│   ├── CategoriesPage.tsx
│   ├── CategoryPage.tsx
│   ├── components/
│   │   ├── CategoriesGrid/
│   │   └── CategoryProducts/
│   ├── hooks/
│   │   └── useCategoryPage.ts
│   └── index.ts
│
├── breweries/       # Страницы пивоварен
│   ├── BreweriesPage.tsx
│   ├── BreweryPage.tsx
│   ├── components/
│   │   ├── BreweriesGrid/
│   │   └── BreweryProducts/
│   ├── hooks/
│   │   └── useBreweryPage.ts
│   └── index.ts
│
├── cart/            # Страница корзины
│   ├── CartPage.tsx
│   ├── CheckoutPage.tsx
│   ├── components/
│   │   ├── CartItems/
│   │   ├── CartSummary/
│   │   ├── CheckoutForm/
│   │   └── OrderSummary/
│   ├── hooks/
│   │   ├── useCartPage.ts
│   │   └── useCheckout.ts
│   └── index.ts
│
├── profile/         # Страницы профиля
│   ├── ProfilePage.tsx
│   ├── AddressesPage.tsx
│   ├── OrdersPage.tsx
│   ├── components/
│   │   ├── ProfileForm/
│   │   ├── AddressList/
│   │   └── OrderHistory/
│   ├── hooks/
│   │   └── useProfilePage.ts
│   └── index.ts
│
├── auth/            # Страницы аутентификации
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── ForgotPasswordPage.tsx
│   ├── components/
│   │   └── AuthLayout/
│   ├── hooks/
│   │   └── useAuthPage.ts
│   └── index.ts
│
└── error/           # Страницы ошибок
    ├── NotFoundPage.tsx
    ├── ErrorPage.tsx
    ├── components/
    │   └── ErrorLayout/
    └── index.ts
```

**Правила импортов для pages:**

- ❌ НЕ МОЖЕТ импортировать: `app`, другие страницы напрямую
- ✅ МОЖЕТ импортировать: `shared`, `kernel`, `modules`

---

## 📁 app/ (Уровень 4 - Корневой)

> **Принцип**: Корень приложения. Инициализация и глобальная конфигурация.

```
app/
├── App.tsx          # Основной компонент приложения
├── providers/       # Провайдеры
│   ├── QueryProvider.tsx     # React Query
│   ├── StoreProvider.tsx     # MobX stores
│   ├── RouterProvider.tsx    # React Router
│   ├── ThemeProvider.tsx     # Тема
│   ├── AuthProvider.tsx      # Аутентификация
│   └── index.tsx             # Комбинированный провайдер
├── layouts/         # Лейауты приложения
│   ├── MainLayout.tsx        # Основной лейаут
│   ├── AuthLayout.tsx        # Лейаут для auth страниц
│   ├── EmptyLayout.tsx       # Пустой лейаут
│   └── index.ts
├── routes/          # Конфигурация маршрутов
│   ├── routes.tsx            # Определение маршрутов
│   ├── protected-routes.tsx  # Защищенные маршруты
│   ├── lazy-routes.tsx       # Ленивая загрузка
│   └── index.ts
└── index.ts         # Точка входа
```

**Правила импортов для app:**

- ✅ МОЖЕТ импортировать: `shared`, `kernel`, `modules`, `pages`

---

## Правила зависимостей и импортов

### 🎯 Общие принципы

1. **Однонаправленность**: Зависимости идут только вниз по уровням
2. **Инкапсуляция**: Каждый модуль экспортирует только публичный API
3. **Типизация**: Типы могут импортироваться между любыми слоями
4. **Переиспользование**: Shared компоненты должны быть максимально переиспользуемыми

### 📊 Матрица зависимостей

| Слой    | shared | kernel | modules | pages | app |
| ------- | ------ | ------ | ------- | ----- | --- |
| shared  | ✅     | ❌     | ❌      | ❌    | ❌  |
| kernel  | ✅     | ✅     | ❌      | ❌    | ❌  |
| modules | ✅     | ✅     | 📝\*    | ❌    | ❌  |
| pages   | ✅     | ✅     | ✅      | ❌    | ❌  |
| app     | ✅     | ✅     | ✅      | ✅    | ✅  |

\*📝 Модули могут импортировать только типы из других модулей

### 🔧 Специфические правила для Beer API

#### Аутентификация

- `kernel/auth` - глобальное состояние пользователя
- `modules/auth` - формы и компоненты аутентификации
- JWT токены управляются в `kernel/auth/auth-store.ts`

#### Корзина

- `kernel/stores/cart-store.ts` - глобальное состояние корзины
- `modules/cart` - UI компоненты корзины
- Синхронизация между локальным состоянием и сервером

#### Продукты

- Infinite scroll для списка продуктов
- Фильтрация и поиск в `modules/products/stores`
- Кэширование через React Query

#### API интеграция

- Все API вызовы через `kernel/api/client.ts`
- Типы из `shared-types` импортируются в `kernel/types`
- React Query hooks в каждом модуле для специфичных данных

---

## 🔄 Потоки данных

### Пример: Добавление товара в корзину

1. **UI событие** (`modules/products/components/ProductCard`)
2. **Mutation hook** (`modules/cart/hooks/useCart.ts`)
3. **API call** (`modules/cart/api/cart-api.ts`)
4. **Global store update** (`kernel/stores/cart-store.ts`)
5. **UI update** (автоматически через MobX)

### Пример: Аутентификация пользователя

1. **Login form** (`modules/auth/components/LoginForm`)
2. **Auth API** (`kernel/auth/auth-service.ts`)
3. **Store update** (`kernel/auth/auth-store.ts`)
4. **Router redirect** (`kernel/router/route-guards.tsx`)
5. **Header update** (`shared/components/layout/Header`)

---

## 🚀 Преимущества архитектуры

1. **Масштабируемость**: Легко добавлять новые модули
2. **Тестируемость**: Четкое разделение ответственности
3. **Переиспользование**: Shared компоненты используются везде
4. **Типобезопасность**: Строгая типизация на всех уровнях
5. **Performance**: Ленивая загрузка модулей и оптимизация React Query

---

## 📝 Рекомендации по разработке

### Создание нового модуля

1. Создать структуру папок в `modules/`
2. Определить типы в `types/`
3. Создать API слой в `api/`
4. Добавить React Query hooks
5. Создать компоненты
6. Экспортировать публичный API в `index.ts`

### Добавление нового API endpoint

1. Добавить endpoint в `kernel/api/endpoints.ts`
2. Создать типы в соответствующем модуле
3. Добавить API функцию в модуле
4. Создать React Query hook
5. Использовать в компонентах

### Создание переиспользуемого компонента

1. Добавить в `shared/components/ui/`
2. Создать Storybook story
3. Добавить типизацию
4. Экспортировать в `shared/index.ts`
5. Использовать в модулях


## полезные материалы
- [чеклист дизайна](https://www.checklist.design/)
