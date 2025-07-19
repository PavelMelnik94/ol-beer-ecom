export function normalizeAvatarUrl(url: string | null): string | undefined {
  if (!url) return;
  return url.replace('http://localhost:3000', `${import.meta.env.VITE_BACKEND_DOMAIN}`);
}
