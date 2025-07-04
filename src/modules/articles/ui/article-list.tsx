
import { ArticlePreviewSkeleton } from '@modules/articles/ui/article-preview/article-preview-skeleton';
import { Container, Section } from '@radix-ui/themes';
import { For, Show } from '@shared/components';
import React, { useEffect, useRef } from 'react';
import { useArticlesInfinite } from '../hooks/use-articles-infinite';
import { ArticlePreview } from './article-preview/article-preview';

const Skeletons = (
  <div>
    <ArticlePreviewSkeleton />
    <ArticlePreviewSkeleton />
    <ArticlePreviewSkeleton />
  </div>
);

interface ArticleListProps {
  promoSlots?: {
    every4: React.ReactNode;
    every7: React.ReactNode;
  }
}

export function ArticleList({promoSlots}: ArticleListProps) {
  const { isLoading, isError, articles, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } = useArticlesInfinite();

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

  if (isError) refetch();

  return (
    <Section pb="0">

      <For each={articles}>
        {(article, index) => {
          if (index % 4 === 0 && index !== 0 && React.isValidElement(promoSlots?.every4)) {
            return (
              <React.Fragment key={article.id + '-promo'}>
                {promoSlots.every4}
                <Container pr="5" pl="5">
                            <ArticlePreview article={article} key={article.id} />
                          </Container>
              </React.Fragment>
            );
          } else if (index % 7 === 0 && index !== 0 && React.isValidElement(promoSlots?.every7)) {
            return (
              <React.Fragment key={article.id}>
                {promoSlots.every7}
                <Container pr="5" pl="5">
                            <ArticlePreview article={article} key={article.id} />
                          </Container>
              </React.Fragment>
            );
          } else {
            return (
              <Container pr="5" pl="5" key={article.id}>
                <ArticlePreview article={article} key={article.id} />
              </Container>
            );
          }
        }}
      </For>

      <div ref={loadMoreRef} style={{ height: 1 }} />

      <Show when={isFetchingNextPage || isLoading}>
        <Container pr="5" pl="5">
          {Skeletons}
        </Container>
      </Show>
    </Section>
  );
}
