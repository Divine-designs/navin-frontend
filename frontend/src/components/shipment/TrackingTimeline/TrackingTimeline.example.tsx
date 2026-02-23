/**
 * Example usage of the TrackingTimeline component
 * This file demonstrates how to use the component in your application
 */

import TrackingTimeline, { Milestone } from './TrackingTimeline';

// Example 1: Basic usage with 5 milestones
export const BasicExample = () => {
  const milestones: Milestone[] = [
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

  return <TrackingTimeline milestones={milestones} />;
};

// Example 2: International shipment with more milestones
export const InternationalShipmentExample = () => {
  const milestones: Milestone[] = [
    {
      id: '1',
      name: 'Order Confirmed',
      timestamp: '2026-02-15 09:00 AM',
      location: 'Shanghai, China',
      status: 'completed',
    },
    {
      id: '2',
      name: 'Picked Up',
      timestamp: '2026-02-15 03:00 PM',
      location: 'Shanghai, China',
      status: 'completed',
    },
    {
      id: '3',
      name: 'Departed Origin Port',
      timestamp: '2026-02-16 11:00 AM',
      location: 'Shanghai Port, China',
      status: 'completed',
    },
    {
      id: '4',
      name: 'In Transit - Sea Freight',
      timestamp: '2026-02-18 08:00 AM',
      location: 'Pacific Ocean',
      status: 'completed',
    },
    {
      id: '5',
      name: 'Arrived at Destination Port',
      timestamp: '2026-02-22 02:00 PM',
      location: 'Los Angeles Port, CA',
      status: 'completed',
    },
    {
      id: '6',
      name: 'Customs Clearance',
      timestamp: '2026-02-23 10:30 AM',
      location: 'Los Angeles, CA',
      status: 'current',
    },
    {
      id: '7',
      name: 'Out for Delivery',
      timestamp: 'Expected: 2026-02-24 09:00 AM',
      location: 'Los Angeles, CA',
      status: 'upcoming',
    },
    {
      id: '8',
      name: 'Delivered',
      timestamp: 'Expected: 2026-02-24 05:00 PM',
      location: 'Los Angeles, CA',
      status: 'upcoming',
    },
  ];

  return <TrackingTimeline milestones={milestones} />;
};

// Example 3: Early stage shipment (mostly upcoming)
export const EarlyStageExample = () => {
  const milestones: Milestone[] = [
    {
      id: '1',
      name: 'Order Placed',
      timestamp: '2026-02-23 11:30 AM',
      location: 'Miami, FL',
      status: 'completed',
    },
    {
      id: '2',
      name: 'Processing',
      timestamp: '2026-02-23 02:00 PM',
      location: 'Miami, FL',
      status: 'current',
    },
    {
      id: '3',
      name: 'Ready for Pickup',
      timestamp: 'Expected: 2026-02-24 10:00 AM',
      location: 'Miami, FL',
      status: 'upcoming',
    },
    {
      id: '4',
      name: 'In Transit',
      timestamp: 'Expected: 2026-02-24 03:00 PM',
      location: 'En route to Atlanta, GA',
      status: 'upcoming',
    },
    {
      id: '5',
      name: 'Out for Delivery',
      timestamp: 'Expected: 2026-02-25 09:00 AM',
      location: 'Atlanta, GA',
      status: 'upcoming',
    },
    {
      id: '6',
      name: 'Delivered',
      timestamp: 'Expected: 2026-02-25 05:00 PM',
      location: 'Atlanta, GA',
      status: 'upcoming',
    },
  ];

  return <TrackingTimeline milestones={milestones} />;
};
