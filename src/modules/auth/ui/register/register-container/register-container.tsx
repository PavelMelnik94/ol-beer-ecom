import { Badge, Button, Card, Flex, Heading, Separator, Text } from '@radix-ui/themes';
import styles from './register-container.module.scss';

interface Props {
  step: number;
  totalSteps: number;
  stepTitle: string;
  stepDescription: string;

  onClickNext: () => void;
  onClickBack: () => void;
}
export function RegisterContainer({
  step = 1,
  totalSteps = 3,
  stepTitle = 'Personal Information',
  stepDescription = 'Tell us about yourself',

  onClickBack,
  onClickNext,
}: Props) {
  return (
    <Card className={styles.container}>

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
        <div>content</div>
      </Flex>

      <div className={styles.separator} />
      {/*  CONTROLS FOOTER */}
      <Flex justify="between" align="center" p="5" className={styles.footer}>
        <Button variant="soft" onClick={onClickBack}>Back</Button>
        <Button variant="soft" onClick={onClickNext}>Next</Button>
      </Flex>
    </Card>
  );
}
