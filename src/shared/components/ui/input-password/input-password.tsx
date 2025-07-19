import type { ForwardedRef, InputHTMLAttributes } from 'react';
import { TextField } from '@radix-ui/themes';
import clsx from 'clsx';
import { Eye, EyeClosed } from 'lucide-react';
import React, { forwardRef, useRef, useState } from 'react';
import styles from './input-password.module.scss';

interface InputPasswordProperties extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: string;
  icon?: React.ReactNode;
  label?: string;
}

export const InputPassword = forwardRef((
  { error, icon, label, className, ...inputProperties }: InputPasswordProperties,
  reference: ForwardedRef<HTMLInputElement>,
) => {
  const [visible, setVisible] = useState(false);
  const inputReference = useRef<HTMLInputElement>(null);

  const setReferences = (element: HTMLInputElement) => {
    if (typeof reference === 'function') reference(element);
    else if (reference && 'current' in reference) (reference as { current: HTMLInputElement | null; }).current = element;
    if (inputReference && 'current' in inputReference) (inputReference as { current: HTMLInputElement | null; }).current = element;
  };

  const handleToggleVisible = () => {
    const input = inputReference.current;
    if (!input) return;
    const { selectionStart, selectionEnd } = input;
    setVisible((v) => {
      setTimeout(() => {
        if (input && selectionStart !== null && selectionEnd !== null) {
          input.setSelectionRange(selectionStart, selectionEnd);
          input.focus();
        }
      });
      return !v;
    });
  };

  return (
    <div className={clsx(styles.wrapper, className)}>
      {label && <label className={styles.label}>{label}</label>}
      <TextField.Root
        // @ts-expect-error
        color={error ? 'red' as const : undefined}
        type={visible ? 'text' : 'password'}
        ref={setReferences}
        {...inputProperties}
        className={clsx(error && styles.errorInput)}
      >
        <TextField.Slot
          onClick={handleToggleVisible}
          style={{ cursor: 'pointer' }}
          tabIndex={0}
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible
            ? <Eye height={16} width={16} />
            : <EyeClosed height={16} width={16} />}
        </TextField.Slot>
      </TextField.Root>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
});
