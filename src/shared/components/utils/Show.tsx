import type { JSX } from 'react';
import { isValidElement } from 'react';

export interface ShowProperties<T> {
  when: T | null | undefined;
  fallback?: React.ReactNode | undefined;
  children: React.ReactNode | ((properties: T) => React.ReactNode);
}

export function Show<T>(properties: ShowProperties<T>): JSX.Element {
  const { when, fallback, children } = properties;
  let result: React.ReactNode;

  if (when) {
    result = typeof children === 'function' ? children(when) : children;
  }
  else {
    result = fallback;
  }

  return isValidElement(result) ? result : <>{result}</>;
}

Show.displayName = 'Show';
