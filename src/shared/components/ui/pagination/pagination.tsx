import { Flex, IconButton, SegmentedControl } from '@radix-ui/themes';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';
import styles from './pagination.module.scss';

interface PaginationProps {
  page: number;
  total: number;
  onPageChange: (p: number) => void;
  siblingCount?: number;
  className?: string;
}

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  total,
  onPageChange,
  className,
}) => {
  // Для больших списков стоит показывать "..." — но для SegmentedControl лучше ограничить до 7-9 страниц
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
