import { PostPreview } from '@pages/blog/components/post-preview/post-preview'
import { Box, Flex, Heading, Section, Separator, Text } from '@radix-ui/themes'

interface Props {
  posts: unknown[]
}
export function Posts({ posts }: Props) {
  return (
    <Section>
      {posts?.map((item, index) => (
        <PostPreview post={item} key={index} />
      ))}
    </Section>
  )
}
