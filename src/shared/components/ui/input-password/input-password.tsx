import type { ForwardedRef, InputHTMLAttributes } from 'react';
import React, { forwardRef, useRef, useState } from 'react';
import { TextField } from '@radix-ui/themes';
import { Eye, EyeClosed } from 'lucide-react';
import clsx from 'clsx';
import styles from './input-password.module.scss';

interface InputPasswordProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: string;
  icon?: React.ReactNode;
  label?: string;
}

export const InputPassword = forwardRef((
  { error, icon, label, className, ...inputProps }: InputPasswordProps,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  const [visible, setVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const setRefs = (el: HTMLInputElement) => {
    if (typeof ref === 'function') ref(el);
    else if (ref && 'current' in ref) (ref as { current: HTMLInputElement | null }).current = el;
    // @ts-ignore
    if (inputRef && 'current' in inputRef) (inputRef as { current: HTMLInputElement | null }).current = el;
  };

  const handleToggleVisible = () => {
    const input = inputRef.current;
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
        ref={setRefs}
        {...inputProps}
        className={clsx(error && styles.errorInput)}
      >
        {icon && <TextField.Slot>{icon}</TextField.Slot>}
        <TextField.Slot
          onClick={handleToggleVisible}
          style={{ cursor: 'pointer' }}
          tabIndex={0}
          aria-label={visible ? 'Скрыть пароль' : 'Показать пароль'}
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
