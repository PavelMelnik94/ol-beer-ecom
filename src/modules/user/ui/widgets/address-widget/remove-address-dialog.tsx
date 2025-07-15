import { useDeleteAddress } from '@modules/user/hooks';
import { AlertDialog, Button, Flex, IconButton } from '@radix-ui/themes';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

export function RemoveAddressDialog({ addressId }: { addressId: string; }) {
  const [isOpen, setOpen] = useState(false);

  const mutation = useDeleteAddress();

  const handleDelete = async (addressId: string) => {
    await mutation.mutateAsync(addressId);
  };

  return (
    <AlertDialog.Root open={isOpen}>
      <IconButton variant="ghost" size="2" color="red" aria-label="Delete address" onClick={() => setOpen(true)}>
        <Trash2 size={16} />
      </IconButton>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Remove Address</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure? This action will permanently delete the address.
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button type="button" variant="soft" size="1" color="gray" disabled={mutation.isPending} onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              onClick={() => handleDelete(addressId)}
              variant="solid"
              size="1"
              color="red"
              loading={mutation.isPending}
              disabled={mutation.isPending}
            >
              Remove
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
