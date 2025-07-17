import type { ReactNode } from 'react';
import { Badge, Card, Flex, Heading, Text } from '@radix-ui/themes';
import styles from './register-container.module.scss';

interface Props {
  step: number;
  totalSteps: number;
  stepTitle: string;
  stepDescription: string;
  children: ReactNode;
}
export function RegisterContainer({
  step = 1,
  totalSteps = 3,
  stepTitle = 'Personal Information',
  stepDescription = 'Tell us about yourself',
  children,
}: Props) {
  return (
    <Card className={styles.container} data-step={step} data-total-steps={totalSteps} data-container>

      {/*  HEADER */}
      <Flex className={styles.header} direction="column" p="5">
        <Flex justify="between" align="center" wrap="wrap" className={styles.headerContent}>
          <Heading size="6" className={styles.heading}>
            Step
            {' '}
            {step}
            {' '}
            of
            {' '}
            {totalSteps}
          </Heading>

          <Badge color="gray" variant="outline" radius="full">
            <Text size="1" weight="bold">
              {stepTitle}
            </Text>
          </Badge>
        </Flex>
        <Text size="2" color="gray" className={styles.headerDescription}>
          {stepDescription}
        </Text>

      </Flex>

      {/*  CONTENT */}
      <Flex direction="column" pr="5" pl="5" flexGrow="1" className={styles.content}>
        {children}
      </Flex>

    </Card>
  );
}
