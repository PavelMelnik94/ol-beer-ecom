import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@kernel/index'
import { Pulse } from '@shared/components'
import clsx from 'clsx'
import { Hero } from './components/hero'
import styles from './blog-page.module.scss'
import { Posts } from './components/posts'

export function BlogPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () => apiClient.get('blog/posts?limit=25'),
  })

  return (
    <div className={clsx(styles.page, 'blog')}>

      <Hero />

      <Posts posts={data?.data?.data} />

    </div>
  )
}
