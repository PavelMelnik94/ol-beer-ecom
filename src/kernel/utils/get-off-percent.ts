export function getOffPercent(price: number, discount: number): number {
  if (price <= 0 || discount <= 0) return 0;
  const percent = ((price - discount) / price) * 100;
  return Number.parseFloat(percent.toFixed(0));
}
