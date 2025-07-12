import React from 'react';
import { Button, Flex } from '@radix-ui/themes';
import styles from '../register-container/register-container.module.scss';
interface RegisterFooterProps {
  step: number;
  totalSteps: number;
  onClickBack: () => void;
}

export const RegisterFooter: React.FC<RegisterFooterProps> = ({ step, totalSteps, onClickBack }) => (
  <>
    <div className={styles.separator} />
    <Flex justify="between" align="center" pt={'5'} pb={'5'} className={styles.footer}>
      <Button variant="soft" disabled={step === 1} onClick={onClickBack}>Back</Button>
      <Button
        variant="soft"
        type="submit"
      >
        {step === totalSteps ? 'Finish' : 'Next'}
      </Button>
    </Flex>
  </>
);
