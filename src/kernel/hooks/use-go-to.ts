import { useNavigate } from 'react-router-dom'
import { ROUTES } from './../router'

export function useGoTo() {
  const navigate = useNavigate()

  return {
    navigateTo: (path: string) => navigate(path),

    navigateToHome: () => navigate(ROUTES.home.root),
    navigateToArticle: (id: string) => navigate(ROUTES.articles.article(id)),

    navigateToBreweries: () => navigate(ROUTES.breweries.root),
    navigateToRegister: () => navigate(ROUTES.auth.register),
    navigateToLogin: () => navigate(ROUTES.auth.login),
    navigateToStore: () => navigate(ROUTES.showcase.root),
    navigateToAbout: () => navigate(ROUTES.about.root),
    navigateToProfile: () => navigate(ROUTES.profile.root),
    navigateToBasket: () => navigate(ROUTES.basket.root),
    navigateToBlog: () => navigate(ROUTES.articles.root),
  }
}
