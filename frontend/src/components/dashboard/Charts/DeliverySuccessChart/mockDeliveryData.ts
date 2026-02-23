export interface DeliveryOutcome {
  status: string;
  count: number;
  color: string;
}

/**
 * Mock data for delivery success breakdown.
 * Shows distribution of shipment outcomes.
 */
export const MOCK_DELIVERY_DATA: DeliveryOutcome[] = [
  { status: 'Delivered', count: 856, color: '#10b981' },
  { status: 'In Transit', count: 342, color: '#3b82f6' },
  { status: 'Delayed', count: 42, color: '#f59e0b' },
  { status: 'Failed', count: 8, color: '#ef4444' },
];

/**
 * Calculate overall success rate (Delivered / Total)
 */
export function calculateSuccessRate(data: DeliveryOutcome[]): number {
  const total = data.reduce((sum, item) => sum + item.count, 0);
  const delivered = data.find(item => item.status === 'Delivered')?.count || 0;
  return total > 0 ? Math.round((delivered / total) * 100) : 0;
}
