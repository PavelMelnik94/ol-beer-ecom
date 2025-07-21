import { lazy } from 'react';

export { AboutPage } from './about/about-page';
export { ArticlePage } from './article/article-page';
export { BlogPage } from './blog/blog-page';
export { BreweriesPage } from './breweries/breweries-page';
export { CartPage } from './cart/cart-page';
export { FavoritesPage } from './favorites/favorites-page';
export { HomePage } from './home/home-page';
export { OrdersPage } from './orders/orders-page';
export { ProductDetailsPage } from './product-details/product-details-page';
export { ProductsPage } from './products/products-page';
export { ProfilePage } from './profile/profile-page';
const LazyBlogPage = lazy(() => import('./blog/blog-page').then(module => ({ default: module.BlogPage })));
const LazyBreweriesPage = lazy(() => import('./breweries/breweries-page').then(module => ({ default: module.BreweriesPage })));
const LazyProductsPage = lazy(() => import('./products/products-page').then(module => ({ default: module.ProductsPage })));
const LazyRegisterPage = lazy(() => import('./register/register-page').then(module => ({ default: module.RegisterPage })));

const LazyCartPage = lazy(() => import('./cart/cart-page').then(module => ({ default: module.CartPage })));
const LazyFavoritesPage = lazy(() => import('./favorites/favorites-page').then(module => ({ default: module.FavoritesPage })));
const LazyHomePage = lazy(() => import('./home/home-page').then(module => ({ default: module.HomePage })));
const LazyOrdersPage = lazy(() => import('./orders/orders-page').then(module => ({ default: module.OrdersPage })));
const LazyProfilePage = lazy(() => import('./profile/profile-page').then(module => ({ default: module.ProfilePage })));
const LazyAboutPage = lazy(() => import('./about/about-page').then(module => ({ default: module.AboutPage })));

export {
  LazyAboutPage,
  LazyBlogPage,
  LazyBreweriesPage,
  LazyCartPage,
  LazyFavoritesPage,
  LazyHomePage,
  LazyOrdersPage,
  LazyProductsPage,
  LazyProfilePage,
  LazyRegisterPage,
};
