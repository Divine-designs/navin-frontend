import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import TrackingTimeline, { Milestone } from './TrackingTimeline';

describe('TrackingTimeline', () => {
  const mockMilestones: Milestone[] = [
    {
      id: '1',
      name: 'Order Placed',
      timestamp: '2026-02-20 10:00 AM',
      location: 'New York, NY',
      status: 'completed',
    },
    {
      id: '2',
      name: 'Picked Up',
      timestamp: '2026-02-20 02:30 PM',
      location: 'New York, NY',
      status: 'completed',
    },
    {
      id: '3',
      name: 'In Transit',
      timestamp: '2026-02-21 08:15 AM',
      location: 'Philadelphia, PA',
      status: 'completed',
    },
    {
      id: '4',
      name: 'Out for Delivery',
      timestamp: '2026-02-23 09:00 AM',
      location: 'Boston, MA',
      status: 'current',
    },
    {
      id: '5',
      name: 'Delivered',
      timestamp: 'Expected: 2026-02-23 05:00 PM',
      location: 'Boston, MA',
      status: 'upcoming',
    },
  ];

  it('renders a vertical timeline with at least 5 milestones', () => {
    render(<TrackingTimeline milestones={mockMilestones} />);

    const timeline = screen.getByRole('list', { name: /shipment tracking timeline/i });
    expect(timeline).toBeInTheDocument();

    const items = screen.getAllByRole('listitem');
    expect(items.length).toBeGreaterThanOrEqual(5);
  });

  it('displays milestone name, timestamp, and location for each node', () => {
    render(<TrackingTimeline milestones={mockMilestones} />);

    expect(screen.getByText('Order Placed')).toBeInTheDocument();
    expect(screen.getByText('2026-02-20 10:00 AM')).toBeInTheDocument();
    expect(screen.getByText('New York, NY')).toBeInTheDocument();

    expect(screen.getByText('Out for Delivery')).toBeInTheDocument();
    expect(screen.getByText('2026-02-23 09:00 AM')).toBeInTheDocument();
    expect(screen.getByText('Boston, MA')).toBeInTheDocument();
  });

  it('shows visual distinction between completed, current, and upcoming nodes', () => {
    render(<TrackingTimeline milestones={mockMilestones} />);

    const completedIcon = screen.getByLabelText('Completed');
    expect(completedIcon).toHaveClass('timeline-icon-completed');

    const currentIcon = screen.getByLabelText('Current');
    expect(currentIcon).toHaveClass('timeline-icon-current');

    const upcomingIcon = screen.getByLabelText('Upcoming');
    expect(upcomingIcon).toHaveClass('timeline-icon-upcoming');
  });

  it('applies correct CSS classes for milestone status', () => {
    const { container } = render(<TrackingTimeline milestones={mockMilestones} />);

    const completedItems = container.querySelectorAll('.timeline-item-completed');
    expect(completedItems.length).toBe(3);

    const currentItems = container.querySelectorAll('.timeline-item-current');
    expect(currentItems.length).toBe(1);

    const upcomingItems = container.querySelectorAll('.timeline-item-upcoming');
    expect(upcomingItems.length).toBe(1);
  });

  it('renders solid connectors for completed milestones', () => {
    const { container } = render(<TrackingTimeline milestones={mockMilestones} />);

    const solidConnectors = container.querySelectorAll('.timeline-connector-solid');
    expect(solidConnectors.length).toBeGreaterThan(0);
  });

  it('renders dashed connectors for current and upcoming milestones', () => {
    const { container } = render(<TrackingTimeline milestones={mockMilestones} />);

    const dashedConnectors = container.querySelectorAll('.timeline-connector-dashed');
    expect(dashedConnectors.length).toBeGreaterThan(0);
  });

  it('accepts milestone data as props (reusable component)', () => {
    const customMilestones: Milestone[] = [
      {
        id: 'a',
        name: 'Custom Milestone',
        timestamp: '2026-02-23 12:00 PM',
        location: 'Custom Location',
        status: 'completed',
      },
    ];

    render(<TrackingTimeline milestones={customMilestones} />);

    expect(screen.getByText('Custom Milestone')).toBeInTheDocument();
    expect(screen.getByText('2026-02-23 12:00 PM')).toBeInTheDocument();
    expect(screen.getByText('Custom Location')).toBeInTheDocument();
  });
});
