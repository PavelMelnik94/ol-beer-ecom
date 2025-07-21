import { Box, Container, Flex, Heading, Link, Section, Separator, Text } from '@radix-ui/themes';
import { Image, Show } from '@shared/components';
import { Stepper } from '@shared/components/stepper';
import { Briefcase, BriefcaseBusiness, Github, Goal, Linkedin, Mailbox, SquareChartGantt } from 'lucide-react';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from './about-page.module.scss';

const contactLinks = [
  {
    icon: <Mailbox size={18} />,
    text: 'Gmail',
    href: 'mailto:recyclesordie94@gmail.com',
  },
  {
    icon: <Github size={18} />,
    text: 'Github',
    href: 'https://github.com/pavelmelnik94',
  },
  {
    icon: <Linkedin size={18} />,
    text: 'LinkedIn',
    href: 'https://www.linkedin.com/in/pavel-melnik-562495203/',
  },

];

const cvs = [

  {
    icon: <SquareChartGantt size={18} />,
    text: 'CV [EN]',
    href: 'https://beer.pvlmnk.xyz/api/auth/cv/middle-senior-frontend-react-EN.pdf',
  },
  {
    icon: <SquareChartGantt size={18} />,
    text: 'CV [RU]',
    href: 'https://beer.pvlmnk.xyz/api/auth/cv/middle-senior-frontend-react-RU.pdf',
  },
];

const goalsSection = {
  title: 'Goals',
  illustration: '/illustrations/dev/u_dev2.svg',
  points: [
    '4+ years of commercial experience with modern frontend stack (React 18+, TypeScript, MobX, Zustand, Webpack, Vite)',
    'Lead developer and architect of fintech SPA (frontend-backend via WebSocket)',
    'Mentoring, code review, onboarding new team members',
    'Corporate UI library development and npm publishing',
    'Strong in architecture design, introducing and supporting TypeScript, infrastructure setup (Webpack, ESLint, Storybook)',
    'Focus on SOLID, Clean Architecture, best practices, high code quality',
    'Passionate about clean code, modern patterns, and continuous improvement',
    'Experience with CI/CD, SLI utilities, Bash scripts, ESLint, Husky, Storybook',
  ],
};

const experienceSection = [
  {
    icon: <BriefcaseBusiness />,
    title: 'Product',
    items: [
      <Text size="4" key="company"><Link href="https://dot818.com/finturf/">Intelico Systems</Link></Text>,
      <Text mb="2" key="position">Frontend Developer | 07.2021 — present</Text>,
      <Text key="1">
        -
        <mark>Main contributor for "Application Service"</mark>
        {' '}
        SPA (React 18, TypeScript, MobX, SCSS, Centrifugo.js)
      </Text>,
      <Text key="2">- Designed project architecture: modularity, source of truth, dependency inversion, strict boundaries (ESLint)</Text>,
      <Text key="3">
        -
        <mark>Introduced and migrated the project to TypeScript</mark>
      </Text>,
      <Text key="4">- Responsible for infrastructure: Webpack, ESLint, Husky, Storybook</Text>,
      <Text key="5">- Implemented frontend integration with backend (WebSocket, multiple external APIs)</Text>,
      <Text key="6">- Quickly delivered support for new business scenarios and features</Text>,
    ],
  },
  {
    icon: <Briefcase />,
    title: 'Volunteer',
    items: [
      <Text size="4" key="org"><Link href="https://rs.school/">The Rolling Scopes School</Link></Text>,
      <Text key="position">Mentor for Education | Oct 2024 - Oct 2025 </Text>,
      <Text key="1">- Technical Guidance: Code reviews, architecture discussions, debugging assistance, and teaching best practices (React hooks, TypeScript, MobX)</Text>,
      <Text key="2">- Team Development: Onboarding juniors, conducting workshops, and creating comprehensive documentation</Text>,
      <Text key="3">- Process Improvement: Establishing CI/CD pipelines, enforcing coding standards, and optimizing workflows</Text>,
      <Text key="4">- Problem-Solving: Resolving technical bottlenecks, conflict management, and ensuring smooth collaboration</Text>,
      <Text key="5">- Leadership: Inspiring the team, decision-making, and fostering a productive environment</Text>,
      <Text key="6">- Continuous Learning: Staying up-to-date with modern practices and tools, applying them to benefit the team and project</Text>,
    ],
  },
];

const personalSection = {
  illustration: '/illustrations/dev/u_dev4.svg',
  paragraphs: [
    'My name is Pavel, I am 30 years old.',
    'Outside of work, I am interested in programming in general, not just frontend. I watch podcasts, read articles, release descriptions, watch meetups. Very curious. I have permanent professional goals for the near future.',
    'On weekends, when the brain wants to take a break from everything, I watch TV series (mostly true crime) and drink beer.',
  ],
};

export function AboutPage() {
  const isTabletLayout = useMediaQuery({ query: '(max-width: 1180px)' });
  const isMediumScreen = useMediaQuery({ query: '(max-width: 1000px)' });
  const isMobileScreen = useMediaQuery({ query: '(max-width: 576px)' });

  return (
    <Container mr="5" ml="5">
      <Flex direction="column" gap="4" align="center">
        {/* Header */}
        <Section>
          <Heading size="9" as="h1" align={isTabletLayout ? 'center' : 'left'}>Pavel Melnik</Heading>
          <Heading size="7" as="h2" align="center">Middle+ / Senior Frontend Developer (React/TypeScript)</Heading>

          <Flex direction="row" mt="4" gap="2" align="center" justify={isTabletLayout ? 'center' : 'start'}>
            {contactLinks.map(({ icon, text, href }, index) => (
              <React.Fragment key={index}>
                <Text size="1" color="gray">
                  <Flex gap="1" align="center">
                    {icon}
                    <Link href={href} target="_blank" rel="noopener noreferrer">{text}</Link>
                  </Flex>
                </Text>
                {index !== contactLinks.length - 1 && <Separator orientation="vertical" />}
              </React.Fragment>
            ))}
          </Flex>

          <Flex direction="row" mt="4" gap="2" align="center" justify={isTabletLayout ? 'center' : 'start'}>
            {cvs.map(({ icon, text, href }, index) => (
              <React.Fragment key={index}>
                <Text size="1" color="gray">
                  <Flex gap="1" align="center">
                    {icon}
                    <Link href={href} target="_blank" rel="noopener noreferrer">{text}</Link>
                  </Flex>
                </Text>
              </React.Fragment>
            ))}
          </Flex>
        </Section>

        {/* Goals */}
        <Section>
          <Heading size="9" as="h3" align="center">{goalsSection.title}</Heading>

          <Flex direction={isMediumScreen ? 'column' : 'row'} gap="9">
            <Show when={!isMediumScreen}>
              <Image width="50%" src={goalsSection.illustration} alt="Goals illustration" containerClassName={styles.imageLeft} />
            </Show>
            <Flex direction="column" gap="2" justify="center" mt={isMediumScreen ? '6' : '0'}>
              {goalsSection.points.map(point => (
                <div key={point} className={styles.itemGrid}>
                  <Goal color="green" />
                  <Text size="2">{point}</Text>
                </div>
              ))}
            </Flex>
          </Flex>
        </Section>

        {/* Experience */}
        <Section>
          <Heading size="9" as="h3" align="center">Experience</Heading>
          <Stepper.Root
            activeStep={experienceSection.length}
            completedSteps={Array.from({ length: experienceSection.length }, (_, index) => index)}
            direction="column"
          >
            {experienceSection.map((job, index) => (
              <Stepper.Step
                key={index}
                index={index}
                label={<Text size="6">{job.title}</Text>}
                icon={isTabletLayout ? undefined : job.icon}
                className="rt-r-mt-6"
                description={(
                  <div>
                    {job.items.map((item, index_) => (
                      <div key={index_} className={index_ === 2 ? 'rt-r-mt-2' : ''}>{item}</div>
                    ))}
                  </div>
                )}
              />
            ))}
          </Stepper.Root>
        </Section>

        {/* Personal */}
        <Section>
          <Heading size="9" as="h3" align="center">Me</Heading>
          <Flex
            direction={isMobileScreen ? 'column-reverse' : 'row'}
            justify={isMobileScreen ? 'center' : 'between'}
            align={isMobileScreen ? 'center' : 'start'}
            gap="3"
            mt="6"
          >
            <Box>
              {personalSection.paragraphs.map((text, index) => (
                <Text as="p" key={index}>{text}</Text>
              ))}
            </Box>
            <Image src={personalSection.illustration} alt="About me" containerClassName={styles.image} />
          </Flex>
        </Section>

        <Section>
          <Heading size="9" as="h3" align="center">
            This App
          </Heading>

          <Flex direction="column" gap="5" mt="6" align="start">
            <Image
              src="/illustrations/dev/u_dev3.svg"
              alt="Project illustration"
              containerClassName={styles.imageLeft}
            />

            <Flex direction="column" gap="3">
              <Text as="p" size="3">
                This project, OL Beer Ecom, is a presentation of your coding skills and expertise. It showcases a modern e-commerce platform for beer-related products, built with a focus on clean architecture, best practices, and cutting-edge technologies.
              </Text>

              <Text mb="-2"><strong>Key Features:</strong></Text>
              <Text size="3">
                <ul className={styles.list}>
                  <li>E-commerce Functionality: Includes modules for products, categories, cart, orders, user profiles, and more.</li>
                  <li>Dynamic Pages: Implements various pages like home, about, blog, breweries, favorites, and product details.</li>
                  <li>Responsive Design: Fully responsive UI with SCSS modules and mobile-first design principles.</li>
                  <li>Interactive Components: Uses Radix UI components, animations with React Spring, and Lucide Icons for a polished user experience.</li>
                  <li>State Management: Zustand is used for modular and feature-specific state management.</li>
                  <li>Server State Handling: React Query is utilized for efficient server state management and API integration.</li>
                  <li>Form Handling: React Hook Form combined with Zod for form validation and type safety.</li>
                  <li>Error Handling: Centralized error boundaries and graceful degradation for a robust user experience.</li>
                </ul>
              </Text>

              <Text mb="-2"><strong>Technologies:</strong></Text>
              <Text size="3">
                <ul className={styles.list}>
                  <li>Frontend: React 18 with functional components and hooks, TypeScript for strict type safety.</li>
                  <li>Styling: SCSS modules with CSS custom properties for theming.</li>
                  <li>Build Tool: Vite for fast development and optimized builds.</li>
                  <li>API Integration: Custom hooks for API calls, React Query for caching, and optimistic updates.</li>
                  <li>Testing: Strategy includes unit tests, integration tests, and E2E tests with a focus on high coverage.</li>
                  <li>Performance: React.memo, useMemo, and useCallback for optimization, lazy loading, and code splitting.</li>
                </ul>
              </Text>

              <Text mb="-2"><strong>Architecture:</strong></Text>
              <Text size="3">
                <ul className={styles.list}>
                  <li>Modular Structure: Organized into modules with clear separation of concerns (api, hooks, stores, ui, model, etc.).</li>
                  <li>GRASP & SOLID Principles: High cohesion, low coupling, and adherence to clean architecture.</li>
                  <li>Reusable Components: Focus on composition over inheritance and reusable hooks.</li>
                  <li>Error Handling: Centralized error logging and graceful UI degradation.</li>
                  <li>Modern Practices: Implements React 18 features like concurrent rendering and Suspense.</li>
                </ul>
              </Text>

              <Text mb="-2"><strong>Architecture:</strong></Text>
              <Text size="3">
                Improvisation without a mockup and continuous improvement. The project is designed with scalability, maintainability and performance in mind, with an emphasis on providing a high-quality user experience.
              </Text>

              <Text as="p" color="gray" size="2">
                This project serves as a comprehensive demonstration of your ability to design, develop, and maintain a scalable, performant, and maintainable application using modern web development practices.
              </Text>

              <Text as="p" color="gray" size="2">
                This project is powered by a real backend built using NestJS, showcasing your full-stack development skills. The backend was developed with the assistance of GitHub Copilot, demonstrating your ability to leverage AI tools for efficient and high-quality code generation. It includes features like RESTful APIs and robust data validation, ensuring seamless communication between the frontend and backend.
              </Text>

              <Text as="p" color="gray" size="2">
                App repository for code review:
                {' '}
                <Link href="https://github.com/PavelMelnik94/ol-beer-ecom">https://github.com/PavelMelnik94/ol-beer-ecom</Link>
              </Text>
            </Flex>
          </Flex>
        </Section>
      </Flex>
    </Container>
  );
}
