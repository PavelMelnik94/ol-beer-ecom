import { parseAsInteger, useQueryState } from 'nuqs';
import { useCallback, useEffect, useState } from 'react';

interface UseProductsPaginationStateOptions {
  shouldGoToPrevPage?: boolean;
  isLoading?: boolean;
}

export function useProductsPaginationState({ shouldGoToPrevPage = false, isLoading = false }: UseProductsPaginationStateOptions = {}) {
  const [page = 1, setPage] = useQueryState('page', {
    ...parseAsInteger,
    defaultValue: 1,
    clearOnDefault: false,
    history: 'replace',
  });
  const [isPageChanging, setIsPageChanging] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has('page')) {
      setPage(1);
    }
  }, [setPage]);

  useEffect(() => {
    if (shouldGoToPrevPage && page > 1) {
      setPage(page - 1);
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
    page,
    setPage,
    isPageChanging,
    handlePageChange,
  };
}
