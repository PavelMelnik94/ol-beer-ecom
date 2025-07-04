import { ArticleList } from '@modules/articles';
import { PromoCodeVelocity } from '@modules/cart';
import { Box, Container } from '@radix-ui/themes';
import { Hero } from './ui/hero';

export function BlogPage() {
  return (
    <Box>
      <Container>
        <Hero />
      </Container>
      <ArticleList
        promoSlots={{
          every4: <PromoCodeVelocity />,
          every7: <div>Promo for every 7th article</div>,
        }}
      />
    </Box>
  );
}
