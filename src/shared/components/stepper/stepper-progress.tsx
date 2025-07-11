import type { StepperProgressProps } from '@shared/components/stepper/types';
import { Box, Flex, Progress, Text } from '@radix-ui/themes';
import { useStepper } from '@shared/components/stepper/use-stepper';
import { memo } from 'react';

export const StepperProgress: React.FC<StepperProgressProps> = memo(({ withLabels = true, width = '100%', ...boxProps }) => {
  const { activeStep } = useStepper();
  const progress = ((activeStep + 1) / 3) * 100;

  return (
    <Box width={width} {...boxProps}>
      {withLabels && (
        <Flex justify="between" align="center" flexGrow="1">
          <Text size="1" color="gray">
            Progress
          </Text>
          <Text size="1" color="gray">
            {progress.toFixed(0)}
            % Completed
          </Text>
        </Flex>
      )}
      <Progress value={progress} duration="30s" variant="soft" />
    </Box>
  );
});
