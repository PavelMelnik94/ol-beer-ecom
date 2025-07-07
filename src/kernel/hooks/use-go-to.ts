import { useNavigate } from 'react-router-dom';
import { ROUTES } from './../router';

export function useGoTo() {
  const navigate = useNavigate();

  return {
    navigateTo: (path: string) => navigate(path),
    navigateToHome: () => navigate(ROUTES.home.root),
    navigateToArticle: (id: string) => navigate(ROUTES.articles.article(id)),
    navigateToBreweries: () => navigate(ROUTES.breweries.root),
    navigateToRegister: () => navigate(ROUTES.auth.register.full),
    navigateToLogin: () => navigate(ROUTES.auth.login.full),
    navigateToShowcase: () => navigate(ROUTES.showcase.root),
    navigateToProductItem: (id: string) => navigate(ROUTES.showcase.item(id)),
    navigateToAbout: () => navigate(ROUTES.about.root),
    navigateToProfile: () => navigate(ROUTES.profile.root),
    navigateToBasket: () => navigate(ROUTES.basket.root),
    navigateToBlog: () => navigate(ROUTES.articles.root),
    navigateToOrders: () => navigate(ROUTES.profile.orders.full),
    navigateToFavorites: () => navigate(ROUTES.profile.favorites.full),
  };
}
