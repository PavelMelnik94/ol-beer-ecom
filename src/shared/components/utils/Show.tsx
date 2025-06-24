import { type JSX, isValidElement } from 'react'

export interface ShowProps<T> {
  when: T | null | undefined
  fallback?: React.ReactNode | undefined
  children: React.ReactNode | ((props: T) => React.ReactNode)
}

export function Show<T>(props: ShowProps<T>): JSX.Element {
  const { when, fallback, children } = props
  let result: React.ReactNode

  if (!when) {
    result = fallback
  }
  else {
    result = typeof children === 'function' ? children(when) : children
  }

  return isValidElement(result) ? result : <>{result}</>
}
