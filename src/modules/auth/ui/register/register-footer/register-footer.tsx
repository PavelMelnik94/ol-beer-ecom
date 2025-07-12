import { Button, Flex } from '@radix-ui/themes';
import React from 'react';
import styles from '../register-container/register-container.module.scss';

interface RegisterFooterProps {
  step: number;
  totalSteps: number;
  onClickBack: () => void;
  isLockButtons?: boolean;
}

export const RegisterFooter: React.FC<RegisterFooterProps> = ({ step, totalSteps, onClickBack, isLockButtons }) => {
  return (
    <>
      <div className={styles.separator} />
      <Flex justify="between" align="center" pt="5" pb="5" className={styles.footer}>
        <Button
          variant="soft"
          disabled={step === 1 || isLockButtons}
          onClick={onClickBack}
        >
          Back
        </Button>
        <Button
          loading={isLockButtons}
          disabled={isLockButtons}
          variant="soft"
          type="submit"
        >
          {step === totalSteps ? 'Finish' : 'Next'}
        </Button>
      </Flex>
    </>
  );
};
