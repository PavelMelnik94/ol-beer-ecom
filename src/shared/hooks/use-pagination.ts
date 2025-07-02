import { parseAsInteger, useQueryState } from 'nuqs';
import { useCallback, useEffect, useState } from 'react';

interface UsePaginationOptions {
  shouldGoToPrevPage?: boolean;
  isLoading?: boolean;
}

export function usePagination({ shouldGoToPrevPage = false, isLoading = false }: UsePaginationOptions = {}) {
  const [page = 1, setPage] = useQueryState('commentPage', parseAsInteger);
  const [isPageChanging, setIsPageChanging] = useState(false);

  useEffect(() => {
    if (shouldGoToPrevPage && (page || 1) > 1) {
      setPage((page || 1) - 1);
    }
  }, [shouldGoToPrevPage, page, setPage]);

  const handlePageChange = useCallback((newPage: number) => {
    setIsPageChanging(true);
    setPage(newPage);
  }, [setPage]);

  useEffect(() => {
    if (!isLoading && isPageChanging) {
      setIsPageChanging(false);
    }
  }, [isLoading, isPageChanging]);

  return {
    page: page || 1,
    isPageChanging,
    handlePageChange,
  };
}
