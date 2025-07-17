export function getTheme() {
  if (typeof window !== 'undefined') {
    if (document.documentElement.classList.contains('dark')) return 'dark';
    if (document.body.classList.contains('dark')) return 'dark';
    const root = document.querySelector('[data-is-root-theme]');
    if (root?.classList.contains('dark')) return 'dark';
  }
  return 'light';
}
