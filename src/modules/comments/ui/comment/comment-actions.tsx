import { Flex, Text } from '@radix-ui/themes';

export function CommentActions({
  editLabel = 'Edit',
  deleteLabel = 'Delete',

  withDelete,
  withEdit,

  onDelete,
  onEdit,
}: {
  editLabel?: string;
  deleteLabel?: string;

  withDelete: boolean;
  withEdit: boolean;

  onDelete?: () => void;
  onEdit?: () => void;
}) {
  return (
    <Flex justify="end" gap="4" mt="2">
      {withEdit && <Text size="2" className="pointer" color="blue" onClick={onEdit}>{editLabel}</Text>}
      {withDelete && <Text size="2" className="pointer" color="ruby" onClick={onDelete}>{deleteLabel}</Text>}
    </Flex>
  )
}
