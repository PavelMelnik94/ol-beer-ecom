import { Section } from '@radix-ui/themes'

interface Props {
  posts: unknown[]
}
export function Posts({ posts }: Props) {
  return (
    <Section>
      {posts.map((item, index) => <div key={index}>{item?.title}</div>)}
    </Section>
  )
}
