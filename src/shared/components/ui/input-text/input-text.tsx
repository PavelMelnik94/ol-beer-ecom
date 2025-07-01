import type { ForwardedRef, InputHTMLAttributes } from 'react';
import { TextField } from '@radix-ui/themes';
import clsx from 'clsx';
import React, { forwardRef } from 'react';
import styles from './input-text.module.scss';

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  icon?: React.ReactNode;
  label?: string;
}

export const InputText = forwardRef((
  { error, icon, label, className, ...inputProps }: InputTextProps,
  ref: ForwardedRef<HTMLInputElement>,
) => (
  <div className={clsx(styles.wrapper, className)}>
    {label && <label className={styles.label}>{label}</label>}
    <TextField.Root
    // @ts-expect-error
      color={error ? ('red' as const) : 'bronze'}
      ref={ref}
      {...inputProps}
    >
      {icon && <TextField.Slot>{icon}</TextField.Slot>}
    </TextField.Root>
    {error && <div className={styles.error}>{error}</div>}
  </div>
));
