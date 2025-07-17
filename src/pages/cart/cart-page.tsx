import { CartMediator } from '@modules/cart';
import { Container } from '@radix-ui/themes';

export function CartPage() {
  return <Container pl="5" pr="5" mt="9"><CartMediator /></Container>;
}
