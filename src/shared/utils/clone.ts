export function clone<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map(item => clone(item)) as unknown as T;
  } else if (value && typeof value === 'object') {
    return Object.keys(value).reduce((acc, key) => {
      acc[key] = clone((value as Record<string, any>)[key]);
      return acc;
    }, {} as Record<string, any>) as T;
  }
  return value;
}
