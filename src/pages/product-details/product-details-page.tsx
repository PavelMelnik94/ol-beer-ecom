import type { Product, ProductWithFavoritesAndRatings } from '@kernel/types';
import { useGoTo } from '@kernel/hooks';
import { QUERY_KEYS, queryClient } from '@kernel/query';
import { useAuthStore, useUserStore } from '@kernel/stores';
import { useCartStore, usePromoCode } from '@modules/cart';
import { commentsProductsApi, useComments } from '@modules/comments';
import { ProductDetails, useProductDetails, useProductRate, useProductsRelated } from '@modules/products';
import { useToggleFavorite, useUserFavorites, useUserRatings } from '@modules/user';
import { Box, Container, Text } from '@radix-ui/themes';
import { Breadcrumbs, Pagination, Show } from '@shared/components';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

const Comments = React.lazy(() => import('@modules/comments').then(module => ({ default: module.Comments })));

const PromoCodeVelocity = React.lazy(() => import('@modules/cart').then(module => ({ default: module.PromoCodeVelocity })));

const ProductsGrid = React.lazy(() => import('@modules/products').then(module => ({ default: module.ProductsGrid })));

const { usePagination: useCommentPagination } = Pagination;
export function ProductDetailsPage() {
  const { navigateToProductItem } = useGoTo();
  const { id } = useParams<{ id: string; }>();
  const { product } = useProductDetails(id!);
  const { products: relatedProducts } = useProductsRelated(product?.id ?? '');
  const isAuth = useAuthStore(s => s.isAuth);

  useUserFavorites({ enabled: isAuth });
  useUserRatings({ enabled: isAuth });

  const isMobile = window.innerWidth < 768;

  const { page: commentPage, isPageChanging, handlePageChange } = useCommentPagination();

  const { rateProduct } = useProductRate();
  const favorites = useUserStore(state => state.favorites);
  const ratings = useUserStore(state => state.ratings);
  const { hasFavorite, hasRating } = useUserStore();
  const { mutateAsync: toggleFavorite } = useToggleFavorite();

  const cartSize = useCartStore(s => s.addedItemIds.size);

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

  const promo = usePromoCode();

  const handleClickOnCard = (product: Product) => {
    navigateToProductItem(product.id);
  };

  const handleOnClickRating = async (rating: number, productId: string) => {
    try {
      await rateProduct({ productId, rate: rating });
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.user.ratings(),
        }),
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.products.detail(productId),
        }),
      ]);
    }
    catch (error) {
      console.error('Failed to rate product:', error);
    }
  };

  const handleClickPromoCode = async (promoCode: string) => {
    void promo.applyPromo({ promoCode });
  };

  const handleOnClickAddToWishlist = async (product: Product) => {
    await toggleFavorite({ productId: product.id });
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

  const breadcrumbs = useMemo(() => {
    const items = [
      { label: 'Showcase', to: '/showcase' },
      product?.brewery?.name && product?.brewery?.id
        ? { label: product.brewery.name, to: `/showcase?breweryId=${product.brewery.id}` }
        : undefined,
      product
        ? { label: product.title, to: `/products/${product.id}` }
        : undefined,
    ];
    return items.filter((item): item is { label: string; to: string; } => Boolean(item?.label));
  }, [product]);

  const productWithFavoritesAndRatings: ProductWithFavoritesAndRatings | undefined = useMemo(() => {
    if (!product) return;
    return {
      ...product,
      isFavorite: hasFavorite(product.id),
      userRating: hasRating(product.id)?.rating || 0,
    };
  }, [product, favorites, ratings, hasFavorite, hasRating]);

  const relatedProductsWithFavoritesAndRatings = useMemo(() => {
    return relatedProducts?.map(product => ({
      ...product,
      isFavorite: hasFavorite(product.id),
      userRating: hasRating(product.id)?.rating || 0,
    })) || [];
  }, [relatedProducts, favorites, ratings, hasFavorite, hasRating]);

  return (
    <div>
      {isMobile
        ? (
            <>
              <Box pr="1" pl="1" pt="1">
                <Breadcrumbs items={breadcrumbs} />
              </Box>
              <ProductDetails
                product={productWithFavoritesAndRatings}
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
                product={productWithFavoritesAndRatings}
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

      <Show when={cartSize > 0}>
        <Box mt="5">
          <PromoCodeVelocity onClickPromocode={handleClickPromoCode} />
        </Box>
      </Show>

      <Box pr="5" pl="5" mt="9">
        <Text as="div" size="7" weight="bold" align="center" mb="3">
          Related Products
        </Text>
        <ProductsGrid
          products={relatedProductsWithFavoritesAndRatings}
          onClickCard={handleClickOnCard}
          isShow={relatedProductsWithFavoritesAndRatings && relatedProductsWithFavoritesAndRatings?.length > 0}
          imageAsSlider
          onAddToWishlist={handleOnClickAddToWishlist}
        />
      </Box>
    </div>
  );
}
