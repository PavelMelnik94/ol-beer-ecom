export function throttle<T extends (...args: any[]) => void>(func: T, limit: number): (...args: Parameters<T>) => void {
  let lastFunc: ReturnType<typeof setTimeout> | null;
  let lastRan: number | null = null;

  return function (this: unknown, ...args: Parameters<T>) {
    const context = this;
    const now = Date.now();

    if (lastRan && now - lastRan < limit) {
      if (lastFunc) {
        clearTimeout(lastFunc);
      }

      lastFunc = setTimeout(() => {
        if (now - lastRan! >= limit) {
          func.apply(context, args);
          lastRan = now;
        }
      }, limit - (now - lastRan));
    } else {
      func.apply(context, args);
      lastRan = now;
    }
  };
}
