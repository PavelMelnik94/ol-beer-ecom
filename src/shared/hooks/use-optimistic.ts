import { useCallback, useEffect, useRef, useState, useTransition } from 'react';

export function useOptimistic<T>(
  baseState: T,
): {
  optimisticValue: T;
  addOptimistic: (updateFn: (draft: T) => T) => void;
  rollback: () => void;
  isPending: boolean;
  confirm: () => void;
} {
  const [optimisticValue, setOptimisticValue] = useState<T>(baseState);
  const [isPending, startTransition] = useTransition();

  const previousStateRef = useRef<T>(baseState);
  const hasOptimisticUpdateRef = useRef(false);

  useEffect(() => {
    if (!hasOptimisticUpdateRef.current) {
      setOptimisticValue(baseState);
      previousStateRef.current = baseState;
    }
  }, [baseState]);

  const addOptimistic = useCallback((updateFn: (draft: T) => T) => {
    startTransition(() => {
      setOptimisticValue((currentValue) => {
        previousStateRef.current = currentValue;
        hasOptimisticUpdateRef.current = true;

        const cloned = structuredClone(currentValue);
        return updateFn(cloned);
      });
    });
  }, []);

  const rollback = useCallback(() => {
    startTransition(() => {
      setOptimisticValue(previousStateRef.current);
      hasOptimisticUpdateRef.current = false;
    });
  }, []);

  const confirm = useCallback(() => {
    hasOptimisticUpdateRef.current = false;
  }, []);

  return {
    optimisticValue,
    addOptimistic,
    rollback,
    isPending,
    confirm,
  };
}
