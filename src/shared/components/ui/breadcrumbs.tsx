import { Link } from 'react-router-dom';
import { Flex, Text } from '@radix-ui/themes';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string | undefined;
  to?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[] | [];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items.length) return null;

  return (
    <Flex align="center" mb="3" asChild wrap={'wrap'}>
      <nav aria-label="Breadcrumb">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <Flex align="center" key={item.to ?? item.label}>
              {!isLast && item.to ? (
                <Link to={item.to} style={{ textDecoration: 'none' }}>
                  <Text color="gray" size="1">{item.label}</Text>
                </Link>
              ) : (
                <Text weight="bold" mt={'1'} size="1">{item.label}</Text>
              )}
              {!isLast && <ChevronRight size={14} color='gray' style={{marginTop: '2px'}}  />}
            </Flex>
          );
        })}
      </nav>
    </Flex>
  );
}

