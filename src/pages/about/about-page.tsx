import { Container, Flex, Heading, Link, Section, Separator, Text } from '@radix-ui/themes';
import { Image } from '@shared/components';
import { Stepper } from '@shared/components/stepper';
import { Briefcase, BriefcaseBusiness, Github, Goal, Linkedin, Mailbox } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';
import styles from './about-page.module.scss';

const profileConstructor = {
  illustration: '/illustrations/dev/u_dev4.svg',
  title: 'Me',
  content: [
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

const workConstructor = {
  illustration: '/illustrations/dev/u_dev1.svg',
  blocks: [
    {
      icon: <BriefcaseBusiness />,
      title: <Text size="6">Product</Text>,
      content: [
        <Text size="4" key={0}><Link href="https://dot818.com/finturf/">Intelico Systems</Link></Text>,
        <Text mb="2" key={1}>Frontend Developer | 07.2021 — present</Text>,
        <Text key={2}>- Lead developer and main contributor for "Application Service" SPA (React 18, TypeScript, MobX, SCSS, Centrifugo.js)</Text>,
        <Text key={3}>- Designed project architecture: modularity, source of truth, dependency inversion, strict boundaries (ESLint)</Text>,
        <Text key={4}>- Introduced and migrated the project to TypeScript</Text>,
        <Text key={5}>- Responsible for infrastructure: Webpack, ESLint, Husky, Storybook</Text>,
        <Text key={6}>- Implemented frontend integration with backend (WebSocket, multiple external APIs)</Text>,
        <Text key={7}>- Quickly delivered support for new business scenarios and features</Text>,
      ],
    },
    {
      icon: <Briefcase />,
      title: <Text size="6">Volunteer</Text>,
      content: [
        <Text size="4" key={0}><Link href="https://rs.school/">The Rolling Scopes School</Link></Text>,
        <Text key={1}>Mentor for Education | Oct 2024 - Oct 2025 </Text>,
        <Text key={2}>- Technical Guidance: Code reviews, architecture discussions, debugging assistance, and teaching best practices (React hooks, TypeScript, MobX)</Text>,
        <Text key={3}>- Team Development: Onboarding juniors, conducting workshops, and creating comprehensive documentation</Text>,
        <Text key={4}>- Process Improvement: Establishing CI/CD pipelines, enforcing coding standards, and optimizing workflows</Text>,
        <Text key={5}>- Problem-Solving: Resolving technical bottlenecks, conflict management, and ensuring smooth collaboration</Text>,
        <Text key={6}>- Leadership: Inspiring the team, decision-making, and fostering a productive environment</Text>,
        <Text key={7}>- Continuous Learning: Staying up-to-date with modern practices and tools, applying them to benefit the team and project</Text>,
      ],
    },
  ],
};

export function AboutPage() {
  const isColumn = useMediaQuery({
    query: '(max-width: 1180px)',
  });
  return (
    <Container mr="5" ml="5">
      <Flex direction="column" gap="4" align="center">

        <Section>
          <Heading size="9" as="h1" align={isColumn ? 'center' : 'left'}>Pavel Melnik</Heading>
          <Heading size="7" as="h2" align="center">
            Middle+ / Senior Frontend Developer (React/TypeScript)
          </Heading>

          <Flex direction="row" mt="4" gap="2" align="center" justify={isColumn ? 'center' : 'start'}>

            <Text size="3" color="gray">
              <Flex gap="1" align="center">
                <Mailbox size={20} />
                <Link href="mailto:recyclesordie94@gmail.com">Gmail</Link>
              </Flex>
            </Text>

            <Separator orientation="vertical" />

            <Text size="3" color="gray">
              <Flex gap="1" align="center">
                <Github size={20} />
                <Link href="https://github.com/pavelmelnik94">Github</Link>
              </Flex>
            </Text>

            <Separator orientation="vertical" />

            <Text size="3" color="gray">
              <Flex gap="1" align="center">
                <Linkedin size={20} />
                <Link href="https://www.linkedin.com/in/pavel-melnik-562495203/">LinkedIn</Link>
              </Flex>
            </Text>

          </Flex>
        </Section>

        <Section>
          <Heading size="9" as="h3" align="center">
            {' '}
            {profileConstructor.title}
            {' '}
          </Heading>

          <Flex direction={isColumn ? 'column' : 'row'} gap="3">
            <Image src={profileConstructor.illustration} alt="Profile Picture" containerClassName={styles.imageLeft} />

            <Flex direction="column" gap="2" justify="center">
              {profileConstructor.content.map(li => (
                <div key={li} className={styles.itemGrid}>
                  <Goal color="green" />
                  <Text size="2" key={li}>{li}</Text>
                </div>
              ))}
            </Flex>
          </Flex>

        </Section>

        <Section>
          <Heading size="9" as="h3" align="center">
            Experience
          </Heading>

          <Stepper.Root activeStep={workConstructor.blocks.length} completedSteps={Array.from({ length: workConstructor.blocks.length }, (_, i) => i)} direction="column">
            {workConstructor.blocks.map((place, index) => (
              <Stepper.Step
                key={index}
                index={index}
                label={place.title}
                icon={place.icon}
                className="rt-r-mt-6"
                description={(
                  <div>
                    {place.content.map((row, index) => {
                      return <div key={index} className={index === 2 ? 'rt-r-mt-2' : ''}>{row}</div>;
                    })}
                  </div>
                )}
              />
            ),
            )}
          </Stepper.Root>

        </Section>

      </Flex>

    </Container>
  );
}
