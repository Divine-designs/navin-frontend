import { describe, it, expect, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import DeliverySuccessChart from './DeliverySuccessChart';
import { MOCK_DELIVERY_DATA } from './mockDeliveryData';

// Recharts uses ResizeObserver internally
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeAll(() => {
  global.ResizeObserver = ResizeObserverStub as unknown as typeof ResizeObserver;
});

describe('DeliverySuccessChart', () => {
  it('renders the chart title', () => {
    render(<DeliverySuccessChart />);
    expect(screen.getByText('Delivery Success Rate')).toBeInTheDocument();
  });

  it('displays the success percentage', () => {
    render(<DeliverySuccessChart />);
    const successRate = screen.getByText(/\d+%/);
    expect(successRate).toBeInTheDocument();
  });

  it('renders all legend items', () => {
    render(<DeliverySuccessChart />);
    MOCK_DELIVERY_DATA.forEach(item => {
      expect(screen.getByText(item.status)).toBeInTheDocument();
      expect(screen.getByText(item.count.toString())).toBeInTheDocument();
    });
  });

  it('displays total count', () => {
    render(<DeliverySuccessChart />);
    const total = MOCK_DELIVERY_DATA.reduce((sum, item) => sum + item.count, 0);
    expect(screen.getByText(total.toString())).toBeInTheDocument();
  });

  it('accepts custom data prop', () => {
    const customData = [
      { status: 'Delivered', count: 100, color: '#10b981' },
      { status: 'Failed', count: 10, color: '#ef4444' },
    ];
    render(<DeliverySuccessChart data={customData} />);
    expect(screen.getByText('Delivered')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });
});
