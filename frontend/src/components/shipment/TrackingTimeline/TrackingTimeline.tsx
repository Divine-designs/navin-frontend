import React from 'react';
import './TrackingTimeline.css';

export interface Milestone {
  id: string;
  name: string;
  timestamp: string;
  location: string;
  status: 'completed' | 'current' | 'upcoming';
}

export interface TrackingTimelineProps {
  milestones: Milestone[];
}

const TrackingTimeline: React.FC<TrackingTimelineProps> = ({ milestones }) => {
  const getStatusIcon = (status: Milestone['status']) => {
    switch (status) {
      case 'completed':
        return (
          <svg
            className="timeline-icon timeline-icon-completed"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Completed"
          >
            <circle cx="12" cy="12" r="10" fill="currentColor" />
            <path
              d="M8 12l3 3 5-6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case 'current':
        return (
          <svg
            className="timeline-icon timeline-icon-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Current"
          >
            <circle cx="12" cy="12" r="10" fill="currentColor" />
            <circle cx="12" cy="12" r="4" fill="white" />
          </svg>
        );
      case 'upcoming':
        return (
          <svg
            className="timeline-icon timeline-icon-upcoming"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Upcoming"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        );
    }
  };

  return (
    <div className="tracking-timeline" role="list" aria-label="Shipment tracking timeline">
      {milestones.map((milestone, index) => (
        <div
          key={milestone.id}
          className={`timeline-item timeline-item-${milestone.status}`}
          role="listitem"
        >
          <div className="timeline-marker">
            {getStatusIcon(milestone.status)}
            {index < milestones.length - 1 && (
              <div
                className={`timeline-connector ${
                  milestone.status === 'completed'
                    ? 'timeline-connector-solid'
                    : 'timeline-connector-dashed'
                }`}
                aria-hidden="true"
              />
            )}
          </div>
          <div className="timeline-content">
            <h3 className="timeline-name">{milestone.name}</h3>
            <p className="timeline-timestamp">{milestone.timestamp}</p>
            <p className="timeline-location">{milestone.location}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrackingTimeline;
