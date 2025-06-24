type Dict<T = any> = Record<string, T>
export interface ForProps<T> {

  each: T[] | readonly T[] | undefined
  fallback?: React.ReactNode | undefined
  children: (item: Exclude<T, undefined>, index: number) => React.ReactNode
}

export function For<T extends string | number | Dict | undefined>(
  props: ForProps<T>,
): React.ReactNode {
  const { each, fallback, children } = props

  if (each?.length === 0) {
    return fallback || null
  }

  return each?.map(children as any)
}
