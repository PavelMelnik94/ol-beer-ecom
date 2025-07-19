type Dict<T = any> = Record<string, T>;
export interface ForProperties<T> {

  each: T[] | readonly T[] | undefined;
  fallback?: React.ReactNode | undefined;
  children: (item: Exclude<T, undefined>, index: number) => React.ReactNode;
}

export function For<T extends string | number | Dict | undefined>(
  properties: ForProperties<T>,
): React.ReactNode {
  const { each, fallback, children } = properties;

  if (each?.length === 0) {
    return fallback || undefined;
  }

  return each?.map(children as any);
}

For.displayName = 'For';
