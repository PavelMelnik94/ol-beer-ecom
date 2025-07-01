import { Flex, Text } from '@radix-ui/themes'

export function CommentActions({ withDelete, withEdit }: { withDelete: boolean, withEdit: boolean }) {
  return (
    <Flex justify="end" gap="4" mt="2">
      {withDelete && <Text size="2" className="pointer" color="blue">Edit</Text>}
      {withEdit && <Text size="2" className="pointer" color="ruby">Delete</Text>}
    </Flex>
  )
}
