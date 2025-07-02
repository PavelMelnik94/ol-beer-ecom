import { useCallback, useEffect, useRef, useState, useTransition } from 'react';

export function useOptimistic<T>(
  baseState: T,
): [T, (updateFn: (draft: T) => void) => void, () => void, boolean] {
  const [optimisticValue, setOptimisticValue] = useState<T>(baseState);
  const baseStateRef = useRef(baseState);

  const previousStateRef = useRef<T>(baseState);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (baseStateRef.current !== baseState) {
      setOptimisticValue(baseState);
      baseStateRef.current = baseState;
      previousStateRef.current = baseState;
    }
  }, [baseState]);

  const queueUpdate = useCallback((updateFn: (draft: T) => void) => {
    startTransition(() => {
      setOptimisticValue((prev) => {
        previousStateRef.current = prev;
        const draft = structuredClone(prev) as T;
        updateFn(draft);
        return draft;
      });
    });
  }, []);

  const rollback = useCallback(() => {
    startTransition(() => {
      setOptimisticValue(previousStateRef.current);
    });
  }, []);

  return [optimisticValue, queueUpdate, rollback, isPending];
}
