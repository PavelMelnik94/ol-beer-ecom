import antfu from '@antfu/eslint-config'
import security from 'eslint-plugin-security'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import boundaries from 'eslint-plugin-boundaries'

export default antfu({
  react: true,
  yaml: false,
  markdown: false,

  ignores: [
    '!**/*',
    '*.test.ts',
    '.history/*',
    '.idea',
    '.vscode',
    'node_modules/*',
    'coverage/*',
    'dist',
  ],
  plugins: {
    security,
    'jsx-a11y': jsxA11y,
    boundaries,
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
        paths: {
          '@shared/*': ['./src/shared/*'],
          '@kernel/*': ['./src/kernel/*'],
          '@modules/*': ['./src/modules/*'],
          '@pages/*': ['./src/pages/*'],
          '@app/*': ['./src/app/*'],
          '@/*': ['./src/*'],
        },
      },
      node: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    },
    'boundaries/include': ['src/**/*'],
    'boundaries/ignore': ['**/*.test.*', '**/*.spec.*'],
    'boundaries/elements': [
      // Shared слой (уровень 0)
      {
        type: 'shared',
        pattern: 'src/shared/**/*',
      },
      // Kernel слой (уровень 1)
      {
        type: 'kernel',
        pattern: 'src/kernel/**/*',
      },
      // Modules слой (уровень 2)
      {
        type: 'modules',
        pattern: 'src/modules/**/*',
        capture: ['module'],
      },
      // Pages слой (уровень 3)
      {
        type: 'pages',
        pattern: 'src/pages/**/*',
      },
      // App слой (уровень 4)
      {
        type: 'app',
        pattern: 'src/app/**/*',
      },
    ],
  },
  rules: {
    'boundaries/element-types': [2, {
      default: 'allow',
      rules: [
        {
          from: ['shared', 'kernel', 'modules', 'pages', 'app'],
          allow: ['**/node_modules/**'],
        },
        {
          from: ['shared'],
          disallow: ['kernel', 'modules', 'pages', 'app'],
          message: 'Shared слой не может импортировать из других слоев. Используйте только shared компоненты.',
        },
        {
          from: ['kernel'],
          disallow: ['modules', 'pages', 'app'],
          message: 'Kernel слой не может импортировать из modules, pages или app слоев.',
        },
        // Теперь modules могут импортировать другие modules
        {
          from: ['modules'],
          disallow: [
            'pages',
            'app',
          ],
          message: 'Модули не могут импортировать из pages или app.',
        },
        {
          from: ['pages'],
          disallow: ['app'],
          message: 'Pages не могут импортировать из app слоя.',
        },
      ],
    }],
    'boundaries/entry-point': [2, {
      default: 'allow',
      message: 'Импорты из внутренних файлов запрещены. Импортируйте только из index.ts файлов.',
      rules: [
        {
          target: ['shared', 'kernel', 'modules', 'pages', 'app'],
          allow: ['index.{ts,tsx}', '*/index.{ts,tsx}'],
        },
        {
          target: ['kernel', 'modules', 'pages'],
          disallow: [
            '!**/index.{ts,tsx}',
          ],
        },
      ],
    }],
    /* плагин для безопасного кода */
    'security/detect-possible-timing-attacks': 'error',
    'security/detect-child-process': 'error',
    'security/detect-disable-mustache-escape': 'error',
    'security/detect-eval-with-expression': 'error',
    'security/detect-no-csrf-before-method-override': 'error',
    'security/detect-non-literal-fs-filename': 'error',
    'security/detect-non-literal-regexp': 'error',
    'security/detect-non-literal-require': 'error',
    'security/detect-buffer-noassert': 'error',

    /* доступность */
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/anchor-is-valid': 'error',
    'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-role': 'error',
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/heading-has-content': 'error',

    // overrides antfu
    'node/prefer-global/process': 'off',
    'style/semi': 'off',
    'style/member-delimiter-style': 'off',
    'antfu/if-newline': 'off',
    'react-refresh/only-export-components': 'error',
    'react-hooks-extra/no-direct-set-state-in-use-effect': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/no-array-index-key': 'off',
    'ts/no-namespace': 'off',
    'ts/ban-ts-comment': 'off',
    'no-async-promise-executor': 'off',
    'prefer-const': 'off',
    'react/no-unstable-context-value': 'off',
  },
})
