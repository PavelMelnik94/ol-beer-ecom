import { useEffect, useRef } from 'react';

export const useLoadMore = (hasNextPage: boolean, isFetchingNextPage: boolean, fetchNextPage: () => void) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (!hasNextPage || isFetchingNextPage) return;
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchNextPage();
          }
        },
        { threshold: 1 },
      );
      const node = loadMoreRef.current;
      if (node) observer.observe(node);

      return () => {
        if (node) observer.unobserve(node);
      };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    return loadMoreRef;
}
