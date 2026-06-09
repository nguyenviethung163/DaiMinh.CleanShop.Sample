export const ORDER_TABS = [
  { value: 'all', label: 'Tất cả' },
  { value: 'pending', label: 'Chờ xác nhận' },
  { value: 'confirmed', label: 'Đã xác nhận' },
  { value: 'shipping', label: 'Đang giao' },
  { value: 'done', label: 'Hoàn thành' },
  { value: 'cancelled', label: 'Đã huỷ' },
] as const;

export type OrderTab = (typeof ORDER_TABS)[number]['value'];
