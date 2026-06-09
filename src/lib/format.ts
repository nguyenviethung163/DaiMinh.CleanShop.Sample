// format.ts — Hàm định dạng dùng chung.

/** Định dạng tiền VND: 1234000 -> "1.234.000đ" */
export const formatVND = (n: number): string =>
  (n || 0).toLocaleString('vi-VN', { maximumFractionDigits: 0 }) + 'đ';

/** Rút gọn tiền: 1284500000 -> "1.28 tỷ" / 48720000 -> "49tr" tuỳ scale */
export const shortVND = (n: number): string => {
  if (n >= 1e9) return (n / 1e9).toFixed(2) + ' tỷ';
  if (n >= 1e6) return (n / 1e6).toFixed(0) + 'tr';
  if (n >= 1e3) return (n / 1e3).toFixed(0) + 'K';
  return String(n);
};

/** Số có dấu phân cách: 8247 -> "8.247" */
export const formatNum = (n: number): string => (n || 0).toLocaleString('vi-VN');
