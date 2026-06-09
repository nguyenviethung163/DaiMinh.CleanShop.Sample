export function formatTrillion(value: number) {
  return `${(value / 1e6).toFixed(0)}tr`;
}
