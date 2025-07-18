import { Text } from '@radix-ui/themes';
import styles from './about-page.module.scss';
import blockStyles from './about-page-blocks.module.scss';

const DEV_ILLUSTRATIONS = [
  '/illustrations/dev/u_dev1.svg',
  '/illustrations/dev/u_dev2.svg',
  '/illustrations/dev/u_dev3.svg',
  '/illustrations/dev/u_dev4.svg',
];

const BLOCKS = [
  {
    title: 'Profile',
    content: [
      '4 years of commercial experience with modern frontend stack (React 18+, TypeScript, MobX, Zustand, Webpack, Vite)',
      'Strong in architecture design, introducing and supporting TypeScript, infrastructure setup (Webpack, ESLint, Storybook)',
      'Lead developer and architect of fintech SPA (frontend-backend via WebSocket)',
      'Experience with CI/CD, ESLint, Husky, Storybook, corporate UI library',
      'Mentoring, code review, onboarding new team members',
      'Focus on SOLID, Clean Architecture, best practices, high code quality',
      'Corporate UI library development and npm publishing',
      'Passionate about clean code, modern patterns, and continuous improvement',
    ],
  },
  {
    title: 'Key Skills',
    content: [
      'Languages: TypeScript, JavaScript (ES6+)',
      'Frameworks: React (Hooks), MobX, Zustand',
      'Styling: SCSS, CSS Modules',
      'Infrastructure: Webpack, Vite, ESLint, Prettier, Husky, Storybook',
      'Testing: Jest, Vitest, Cypress (basic)',
      'Backend integration: WebSocket, Centrifugo.js, REST API',
      'Patterns: Clean Architecture, Flux, Dependency Inversion, Source of Truth',
    ],
  },
  {
    title: 'Soft Skills',
    content: [
      'Self-organization',
      'Fast learner',
      'High responsibility',
      'Teamwork experience',
      'Mentoring',
    ],
  },
  {
    title: 'Work Experience',
    content: [
      'Intelico Systems',
      'Frontend Developer | 07.2021 — present',
      'Lead developer and main contributor for "Application Service" SPA (React 18, TypeScript, MobX, SCSS, Centrifugo.js, WebSocket)',
      'Designed project architecture: modularity, source of truth, dependency inversion, strict boundaries (ESLint)',
      'Introduced and migrated the project to TypeScript',
      'Responsible for infrastructure: Webpack, ESLint, Husky, Storybook',
      'Implemented frontend integration with backend (WebSocket, multiple external APIs)',
      'Quickly delivered support for new business scenarios and features',
      'Mentored students (Rolling Scopes School, 3 mentees), participated in code reviews',
    ],
  },
  {
    title: 'Volunteer',
    content: [
      'Mentor for Education',
      ' https://rs.school/',
      'Oct 2024 - Jun 2025',
      'The Rolling Scopes School',
      'Technical Guidance: Code reviews, architecture discussions, debugging assistance, and teaching best practices (React hooks, TypeScript, MobX)',
      'Team Development: Onboarding juniors, conducting workshops, and creating comprehensive documentation',
      'Process Improvement: Establishing CI/CD pipelines, enforcing coding standards, and optimizing workflows',
      'Problem-Solving: Resolving technical bottlenecks, conflict management, and ensuring smooth collaboration',
      'Leadership: Inspiring the team, decision-making, and fostering a productive environment',
      'Continuous Learning: Staying up-to-date with modern practices and tools, applying them to benefit the team and project',
    ],
  },
  {
    title: 'English',
    content: [
      'Can read and understand technical documentation (A1-A2)',
    ],
  },
];

export const AboutPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Text as="p" className={styles.title} weight="bold">Pavel Melnik</Text>
        <Text as="p" className={styles.subtitle} color="gray">
          Middle+ / Senior Frontend Developer (React/TypeScript)
        </Text>
        <Text size="3" color="gray"> recyclesordie94@gmail.com</Text>
        <Text size="2" color="gray">Profiles: <span className={styles.link}>pavelmelnik94</span></Text>
      </div>

      {BLOCKS.map((block, i) => (
        <div
          key={block.title}
          className={i % 2 === 0 ? blockStyles.row : `${blockStyles.row} ${blockStyles.rowReverse}`}
        >
          <img
            src={DEV_ILLUSTRATIONS[i % DEV_ILLUSTRATIONS.length]}
            alt={`dev-illustration-${i + 1}`}
            className={blockStyles.illustration}
            loading="lazy"
          />
          <div className={blockStyles.block}>
            <Text as="p" weight="bold" size="4" style={{ marginBottom: '0.5rem' }}>{block.title}</Text>
            {block.content.map((line, idx) =>
              <Text as="p" size="2" color={idx === 0 ? undefined : 'gray'} key={idx}>{line}</Text>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
