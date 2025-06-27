import { Section } from '@radix-ui/themes'
import { useEffect, useRef } from 'react'
import { ArticleSkeleton } from '@modules/articles/ui/article-list/article/article-skeleton'
import { For, Show } from '@shared/components'
import { useArticlesInfinite } from '../../hooks/use-articles-infinite'
import { ArticlePreview } from './article/article-preview'

const Skeletons = (
  <div>
    <ArticleSkeleton />
    <ArticleSkeleton />
    <ArticleSkeleton />
  </div>
)

export function ArticleList() {
  const { isLoading, isError, articles, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } = useArticlesInfinite()

  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage()
        }
      },
      { threshold: 1 },
    )
    const node = loadMoreRef.current
    if (node) observer.observe(node)

    return () => {
      if (node) observer.unobserve(node)
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  if (isError) refetch();

  return (
    <Section>

      <For each={articles}>
        {article => (
          <ArticlePreview article={article} key={article.id} />
        )}
      </For>

      <div ref={loadMoreRef} style={{ height: 1 }} />

      <Show when={isFetchingNextPage || isLoading}>
        {Skeletons}
      </Show>
    </Section>
  )
}
