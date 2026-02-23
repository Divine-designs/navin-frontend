# TrackingTimeline Component

A reusable React component that displays a vertical timeline visualization of shipment milestones with clear visual distinctions between completed, current, and upcoming statuses.

## Features

- ✅ Vertical timeline layout
- ✅ Three distinct milestone states: completed, current, and upcoming
- ✅ Animated pulsing effect on current milestone
- ✅ Solid connector lines for completed milestones
- ✅ Dashed connector lines for upcoming milestones
- ✅ Displays milestone name, timestamp, and location
- ✅ Fully responsive design
- ✅ Accessible with ARIA labels
- ✅ TypeScript support

## Installation

The component is located at:
```
frontend/src/components/shipment/TrackingTimeline/
```

## Usage

```tsx
import TrackingTimeline, { Milestone } from '@components/shipment/TrackingTimeline/TrackingTimeline';

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
    name: 'In Transit',
    timestamp: '2026-02-21 08:15 AM',
    location: 'Philadelphia, PA',
    status: 'current',
  },
  {
    id: '3',
    name: 'Delivered',
    timestamp: 'Expected: 2026-02-23 05:00 PM',
    location: 'Boston, MA',
    status: 'upcoming',
  },
];

function MyComponent() {
  return <TrackingTimeline milestones={milestones} />;
}
```

## Props

### TrackingTimelineProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `milestones` | `Milestone[]` | Yes | Array of milestone objects to display |

### Milestone

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier for the milestone |
| `name` | `string` | Yes | Display name of the milestone (e.g., "Order Placed") |
| `timestamp` | `string` | Yes | Timestamp or expected time (e.g., "2026-02-20 10:00 AM") |
| `location` | `string` | Yes | Location of the milestone (e.g., "New York, NY") |
| `status` | `'completed' \| 'current' \| 'upcoming'` | Yes | Current status of the milestone |

## Status Types

### Completed
- Solid blue circle with white checkmark icon
- Solid blue connector line to next milestone
- Full color text

### Current
- Solid blue circle with white dot icon
- Pulsing/glowing animation effect
- Dashed gray connector line to next milestone
- Full color text

### Upcoming
- Hollow gray circle icon
- Dashed gray connector line to next milestone
- Grayed out text

## Styling

The component uses CSS classes that can be customized:

- `.tracking-timeline` - Main container
- `.timeline-item` - Individual milestone container
- `.timeline-item-completed` - Completed milestone
- `.timeline-item-current` - Current milestone
- `.timeline-item-upcoming` - Upcoming milestone
- `.timeline-icon` - Icon container
- `.timeline-connector` - Connector line between milestones
- `.timeline-content` - Content area (name, timestamp, location)

### Brand Color

The default brand color is `#2563eb` (blue). To customize, update the color values in `TrackingTimeline.css`:

```css
.timeline-icon-completed,
.timeline-icon-current {
  color: #YOUR_BRAND_COLOR;
}

.timeline-connector-solid {
  background-color: #YOUR_BRAND_COLOR;
}
```

## Examples

See `TrackingTimeline.example.tsx` for complete usage examples including:
- Basic 5-milestone timeline
- International shipment with 8 milestones
- Early stage shipment (mostly upcoming)

## Testing

Run tests with:
```bash
npm run test
```

The component includes comprehensive tests covering:
- Rendering with multiple milestones
- Visual distinction between status types
- Display of all milestone information
- Connector line styling
- Component reusability

## Accessibility

- Semantic HTML structure with proper roles
- ARIA labels for screen readers
- Keyboard navigation support
- Sufficient color contrast

## Browser Support

Works in all modern browsers that support:
- CSS Grid
- CSS Animations
- SVG

## License

Part of the Navin Frontend project.
