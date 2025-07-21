import { Flex, IconButton, SegmentedControl } from '@radix-ui/themes';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { parseAsInteger, useQueryState } from 'nuqs';
import React, { useCallback, useEffect, useState } from 'react';
import { useMediaQuery } from '@shared/hooks';

import styles from './pagination.module.scss';

interface PaginationProperties {
  page: number;
  total: number;
  onPageChange: (p: number) => void;
  siblingCount?: number;
  className?: string;
}

interface UsePaginationOptions {
  shouldGoToPreviousPage?: boolean;
  isLoading?: boolean;
}

function usePagination({ shouldGoToPreviousPage = false, isLoading = false }: UsePaginationOptions = {}) {
  const [page = 1, setPage] = useQueryState('commentPage', parseAsInteger);
  const [isPageChanging, setIsPageChanging] = useState(false);

  useEffect(() => {
    if (shouldGoToPreviousPage && (page || 1) > 1) {
      setPage((page || 1) - 1);
    }
  }, [shouldGoToPreviousPage, page, setPage]);

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

interface PaginationComponent extends React.FC<PaginationProperties> {
  usePagination: typeof usePagination;
}

const Pagination: PaginationComponent = ({
  page,
  total,
  onPageChange,
  className,
}) => {
  const isMobile = useMediaQuery('(max-width: 576px)');

  const generatePageNumbers = (): number[] => {
    if (isMobile) {
      if (total <= 5) {
        return Array.from({ length: total }, (_, index) => index + 1);
      }

      if (page <= 3) {
        return [1, 2, 3, total];
      }

      if (page >= total - 2) {
        return [1, total - 2, total - 1, total];
      }

      return [1, page - 1, page, page + 1, total];
    }
    else {
      if (total <= 9) {
        return Array.from({ length: total }, (_, index) => index + 1);
      }

      if (page <= 5) {
        return [1, 2, 3, 4, 5, 6, total];
      }

      if (page >= total - 4) {
        return [1, total - 5, total - 4, total - 3, total - 2, total - 1, total];
      }

      return [1, page - 2, page - 1, page, page + 1, page + 2, total];
    }
  };

  const pageNumbers = generatePageNumbers();

  const handleChange = (value: string) => {
    const pageNumber = Number(value);
    if (!Number.isNaN(pageNumber) && pageNumber !== page) {
      onPageChange(pageNumber);
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
        {pageNumbers.map(number_ => (
          <SegmentedControl.Item key={number_} value={String(number_)}>
            {number_}
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
