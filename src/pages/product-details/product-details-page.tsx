import type { Product } from '@kernel/types';
import { useGoTo } from '@kernel/hooks';
import { QUERY_KEYS } from '@kernel/query';
import { PromoCodeVelocity } from '@modules/cart';
import { Comments, commentsProductsApi, useComments } from '@modules/comments';
import { ProductDetails, ProductsGrid, useProductDetails, useProductsRelated } from '@modules/products';
import { Box, Container, Text } from '@radix-ui/themes';
import { Breadcrumbs, Pagination } from '@shared/components';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

const { usePagination: useCommentPagination } = Pagination;
export function ProductDetailsPage() {
  const { navigateToProductItem } = useGoTo();
  const { id } = useParams<{ id: string; }>();
  const { product } = useProductDetails(id!);
  const { products: relatedProducts } = useProductsRelated(product?.id ?? '');
  const isMobile = window.innerWidth < 768;

  const breadcrumbs = useMemo(() => {
    const items = [
      { label: 'Showcase', to: '/showcase' },
      product?.brewery?.name && product?.brewery?.id
        ? { label: product.brewery.name, to: `/showcase?breweryId=${product.brewery.id}` }
        : null,
      product
        ? { label: product.title, to: `/products/${product.id}` }
        : null,
    ];
    return items.filter((item): item is { label: string; to: string; } => Boolean(item && item.label));
  }, [product]);

  const { page: commentPage, isPageChanging, handlePageChange } = useCommentPagination();

  const {
    comments,
    pagination,
    isLoading,
    isCreating,
    createComment,
    updateComment,
    deleteComment,
    likeComment,
    error,
  } = useComments({
    page: commentPage,
    parentId: String(id),
    api: commentsProductsApi,
    queryKey: QUERY_KEYS.products.commentList(String(id), commentPage),
  });

  const handleClickOnCard = (product: Product) => {
    navigateToProductItem(product.id);
  };

  const handleOnClickRating = (rating: number, productId: string) => {
    // Handle product rating click
    console.log('Product rating clicked:', rating, 'Product ID:', productId);
  };

  const handleOnClickAddToWishlist = (product: Product) => {
    // Handle adding product to wishlist
    console.log('Add to wishlist:', product);
  };

  const handleCreateComment = async (content: string) => {
    await createComment(content);
  };

  const handleUpdateComment = async (id: string, content: string) => {
    await updateComment(id, content);
  };

  const handleDeleteComment = async (id: string) => {
    await deleteComment(id);
  };

  const handleLikeComment = async (id: string) => {
    await likeComment(id);
  };

  return (
    <div>
      {isMobile
        ? (
            <>
              <Box pr="1" pl="1" pt="1">
                <Breadcrumbs items={breadcrumbs} />
              </Box>
              <ProductDetails
                product={product}
                onClickRating={handleOnClickRating}
                onClickAddToWishlist={handleOnClickAddToWishlist}
              />
              <Comments
                comments={comments}
                error={error}

                pagination={pagination}
                onPageChange={handlePageChange}

                onCreateComment={handleCreateComment}
                onUpdateComment={handleUpdateComment}
                onDeleteComment={handleDeleteComment}
                onLikeComment={handleLikeComment}

                isLoading={isLoading}
                isCreating={isCreating}
                isPageChanging={isPageChanging}
              />
            </>
          )
        : (
            <Container pr="5" pl="5" pt="5" pb="5">
              <Breadcrumbs items={breadcrumbs} />
              <ProductDetails
                product={product}
                onClickRating={handleOnClickRating}
                onClickAddToWishlist={handleOnClickAddToWishlist}
              />
              <Comments
                comments={comments}
                error={error}

                pagination={pagination}
                onPageChange={handlePageChange}

                onCreateComment={handleCreateComment}
                onUpdateComment={handleUpdateComment}
                onDeleteComment={handleDeleteComment}
                onLikeComment={handleLikeComment}

                isLoading={isLoading}
                isCreating={isCreating}
                isPageChanging={isPageChanging}
              />
            </Container>
          )}

      <Box mt="5">
        <PromoCodeVelocity />
      </Box>

      <Box pr="5" pl="5" mt="9">
        <Text as="div" size="7" weight="bold" align="center" mb="3">
          Related Products
        </Text>
        <ProductsGrid
          products={relatedProducts}
          onClickCard={handleClickOnCard}
          isShow={relatedProducts && relatedProducts?.length > 0}
          imageAsSlider
          onAddToWishlist={(product) => {
            // Handle adding product to wishlist
            console.log('Add to wishlist:', product);
          }}
          onAddToBasket={(product) => {
            // Handle adding product to basket
            console.log('Add to basket:', product);
          }}
        />
      </Box>
    </div>
  );
}
