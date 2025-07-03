import { Flex, IconButton, SegmentedControl } from '@radix-ui/themes';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { parseAsInteger, useQueryState } from 'nuqs';
import React, { useCallback, useEffect, useState } from 'react';

import styles from './pagination.module.scss';

interface PaginationProps {
  page: number;
  total: number;
  onPageChange: (p: number) => void;
  siblingCount?: number;
  className?: string;
}

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

interface UsePaginationOptions {
  shouldGoToPrevPage?: boolean;
  isLoading?: boolean;
}

function usePagination({ shouldGoToPrevPage = false, isLoading = false }: UsePaginationOptions = {}) {
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
    setPage,
    isPageChanging,
    handlePageChange,
  };
}

interface PaginationComponent extends React.FC<PaginationProps> {
  usePagination: typeof usePagination;
}

const Pagination: PaginationComponent = ({
  page,
  total,
  onPageChange,
  className,
}) => {
  const pages = total <= 9 ? range(1, total) : range(1, Math.min(total, 9));

  const handleChange = (value: string) => {
    const pageNum = Number(value);
    if (!Number.isNaN(pageNum) && pageNum !== page) {
      onPageChange(pageNum);
    }
  };

  return (
    <Flex align="center" gap="2" className={className}>
      <IconButton
        radius="full"
        variant="soft"
        color="gray"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page"
        size="1"
      >
        <ChevronLeft size={16} />
      </IconButton>
      <SegmentedControl.Root
        value={String(page)}
        onValueChange={handleChange}
        radius="full"
        className={styles.segmented}
      >
        {pages.map(num => (
          <SegmentedControl.Item key={num} value={String(num)}>
            {num}
          </SegmentedControl.Item>
        ))}
      </SegmentedControl.Root>
      <IconButton
        radius="full"
        variant="soft"
        color="gray"
        disabled={page === total}
        onClick={() => onPageChange(page + 1)}
        aria-label="Next page"
        size="1"
      >
        <ChevronRight size={16} />
      </IconButton>
    </Flex>
  );
};

Pagination.displayName = 'Pagination';
Pagination.usePagination = usePagination;

export { Pagination };
