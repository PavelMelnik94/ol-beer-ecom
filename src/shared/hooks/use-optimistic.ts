import { useCallback, useEffect, useRef, useState, useTransition } from 'react';

export function useOptimistic<T>(
  baseState: T,
): {
  optimisticValue: T;
  addOptimistic: (updateFunction: (draft: T) => T) => void;
  rollback: () => void;
  isPending: boolean;
  confirm: () => void;
} {
  const [optimisticValue, setOptimisticValue] = useState<T>(baseState);
  const [isPending, startTransition] = useTransition();

  const previousStateReference = useRef<T>(baseState);
  const hasOptimisticUpdateReference = useRef(false);

  useEffect(() => {
    if (!hasOptimisticUpdateReference.current) {
      setOptimisticValue(baseState);
      previousStateReference.current = baseState;
    }
  }, [baseState]);

  const addOptimistic = useCallback((updateFunction: (draft: T) => T) => {
    startTransition(() => {
      setOptimisticValue((currentValue) => {
        previousStateReference.current = currentValue;
        hasOptimisticUpdateReference.current = true;

        const cloned = structuredClone(currentValue);
        return updateFunction(cloned);
      });
    });
  }, []);

  const rollback = useCallback(() => {
    startTransition(() => {
      setOptimisticValue(previousStateReference.current);
      hasOptimisticUpdateReference.current = false;
    });
  }, []);

  const confirm = useCallback(() => {
    hasOptimisticUpdateReference.current = false;
  }, []);

  return {
    optimisticValue,
    addOptimistic,
    rollback,
    isPending,
    confirm,
  };
}
