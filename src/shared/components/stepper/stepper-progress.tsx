import type { StepperProgressProperties } from '@shared/components/stepper/types';
import { Box, Flex, Progress, Text } from '@radix-ui/themes';
import { useStepper } from '@shared/components/stepper/use-stepper';
import { memo } from 'react';

export const StepperProgress: React.FC<StepperProgressProperties> = memo(({ withLabels = true, width = '100%', ...boxProperties }) => {
  const { activeStep } = useStepper();
  const progress = ((activeStep + 1) / 3) * 100;

  return (
    <Box width={width} {...boxProperties}>
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
      <Progress value={progress} variant="soft" />
    </Box>
  );
});
