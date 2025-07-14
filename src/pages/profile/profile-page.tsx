import { ProfileLayout } from '@modules/user';
import { Container } from '@radix-ui/themes';

export function ProfilePage() {
  return (
    <Container pr="5" pl="5" mt="7">
      <ProfileLayout />
    </Container>
  );
}
