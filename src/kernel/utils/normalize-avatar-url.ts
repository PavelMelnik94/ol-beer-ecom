export function normalizeAvatarUrl(url: string | null): string | null {
  if (!url) return null;
  return url.replace('http://localhost:3000', `${import.meta.env.VITE_BACKEND_DOMAIN}`);
}
