import { lazy } from 'react';

export { ArticlePage } from './article/article-page';
export { BlogPage } from './blog/blog-page';
export { BreweriesPage } from './breweries/breweries-page';
export { HomePage } from './home/home-page';
export { ProductDetailsPage } from './product-details/product-details-page';
export { ProductsPage } from './products/products-page';

const LazyArticlePage = lazy(() => import('./article/article-page').then(module => ({ default: module.ArticlePage })));
const LazyBlogPage = lazy(() => import('./blog/blog-page').then(module => ({ default: module.BlogPage })));
const LazyBreweriesPage = lazy(() => import('./breweries/breweries-page').then(module => ({ default: module.BreweriesPage })));
const LazyProductsPage = lazy(() => import('./products/products-page').then(module => ({ default: module.ProductsPage })));
const LazyProductDetailsPage = lazy(() => import('./product-details/product-details-page').then(module => ({ default: module.ProductDetailsPage })));

export {
  LazyArticlePage,
  LazyBlogPage,
  LazyBreweriesPage,
  LazyProductDetailsPage,
  LazyProductsPage,
};
