import React from 'react';
import {
  ChevronDown,
  Building2,
  ShieldCheck,
  Package,
  Plus,
  Box,
  FileText,
  TrendingDown,
  TrendingUp,
  Link as LinkIcon
} from 'lucide-react';
import '../../dashboard/Dashboard.css';

const CompanyDashboard: React.FC = () => {
  const stats = [
    {
      label: 'PENDING PAYMENT',
      value: '$42.5k',
      trend: '-1.2%',
      trendType: 'down',
      icon: <Building2 size={24} color="#f59e0b" />,
      iconBg: 'rgba(245, 158, 11, 0.15)',
    },
    {
      label: 'DELIVERED',
      value: '856',
      trend: '98% Goal',
      trendType: 'up',
      icon: <ShieldCheck size={24} color="#10b981" />,
      iconBg: 'rgba(16, 185, 129, 0.15)',
    },
    {
      label: 'IN TRANSIT',
      value: '342',
      trend: 'Active',
      trendType: 'neutral',
      icon: <Box size={24} color="#a855f7" />,
      iconBg: 'rgba(168, 85, 247, 0.15)',
    },
    {
      label: 'TOTAL SHIPMENTS',
      value: '1,248',
      trend: '+4.2%',
      trendType: 'up',
      icon: <FileText size={24} color="#3b82f6" />,
      iconBg: 'rgba(59, 130, 246, 0.15)',
    },
  ];

  const shipments = [
    {
      id: '#SHP-9021',
      origin: 'Singapore',
      destination: 'Rotterdam',
      status: 'IN TRANSIT',
      hash: '0x4a9b...2f81',
      hashColor: '#10b981',
    },
    {
      id: '#SHP-8842',
      origin: 'Hong Kong',
      destination: 'Los Angeles',
      status: 'DELIVERED',
      hash: '0x9c1a...9e55',
      hashColor: '#10b981',
    },
    {
      id: '#SHP-8711',
      origin: 'Mumbai',
      destination: 'Dubai',
      status: 'PENDING APPROVAL',
      hash: 'Awaiting Mining...',
      hashColor: '#8a8f9d',
    },
  ];

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'IN TRANSIT':
        return 'status-in-transit';
      case 'DELIVERED':
        return 'status-delivered';
      case 'PENDING APPROVAL':
        return 'status-pending';
      default:
        return '';
    }
  };

  return (
    <div className="dashboard-home">
      <div className="dashboard-header">
        <div className="header-title">
          <h1>Logistics Overview</h1>
          <p>Real-time status of your global supply chain on the blockchain.</p>
        </div>
        <div className="date-selector">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          <span>Last 30 Days</span>
          <ChevronDown size={14} />
        </div>
      </div>

      <div className="stats-grid-full">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card">
            <div className="stat-header">
              <div className="stat-icon-wrapper" style={{ backgroundColor: stat.iconBg }}>
                {stat.icon}
              </div>
              <div className={`stat-trend trend-${stat.trendType}`}>
                {stat.trend}
                {stat.trendType === 'up' && <TrendingUp size={14} />}
                {stat.trendType === 'down' && <TrendingDown size={14} />}
              </div>
            </div>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-value">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-content-grid">
        <div className="dashboard-left-col">
          <div className="content-section">
            <div className="section-title">
              <h2>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="14" width="7" height="7" rx="1"></rect><rect x="3" y="14" width="7" height="7" rx="1"></rect></svg>
                Recent Shipments
              </h2>
              <span className="view-all">View All</span>
            </div>
            <table className="shipments-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>ORIGIN /<br />DESTINATION</th>
                  <th>STATUS</th>
                  <th>BLOCKCHAIN HASH</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((shipment) => (
                  <tr key={shipment.id}>
                    <td className="shipment-id-cell">{shipment.id}</td>
                    <td>
                      <div className="location-cell">
                        <span className="location-label">From: {shipment.origin}</span>
                        <span className="location-sublabel">To: {shipment.destination}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${getStatusClass(shipment.status)}`}>
                        {shipment.status}
                      </span>
                    </td>
                    <td className="hash-cell" style={{ color: shipment.hashColor }}>
                      <LinkIcon size={14} style={{ marginRight: 6 }} />
                      {shipment.hash}
                    </td>
                    <td>
                      <button className="verify-button">Verify</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="right-rail">
          <div className="rail-card">
            <h3>Quick Actions</h3>
            <div className="quick-actions-list">
              <button className="action-button">
                <span className="action-label">Create New<br />Shipment</span>
                <div className="action-icon-circle border-cyan text-cyan">
                  <Plus size={16} />
                </div>
              </button>
              <button className="action-button">
                <span className="action-label">Track Token<br />Asset</span>
                <div className="action-icon-circle border-white text-white">
                  <Package size={16} />
                </div>
              </button>
              <button className="action-button">
                <span className="action-label">Generate<br />Settlement</span>
                <div className="action-icon-circle border-white text-white">
                  <FileText size={16} />
                </div>
              </button>
            </div>
          </div>

          <div className="rail-card network-card">
            <div className="distribution-header">
              <h3>NETWORK<br />DISTRIBUTION</h3>
            </div>
            <div className="map-placeholder">
              <svg viewBox="0 0 200 100" className="world-map-svg">
                {/* Simplified world map path from dots */}
                <path d="M20,20 Q30,10 40,20 T60,20 T80,10" stroke="var(--border-color)" fill="none" />
                <path d="M120,30 Q140,20 160,30 T190,40" stroke="var(--border-color)" fill="none" />

                {/* Landmass area representations (mocked map for the aesthetic) */}
                <path d="M 10 30 C 20 20, 40 20, 50 40 C 60 70, 40 80, 20 60 Z" fill="#4B5563" opacity="0.4" />
                <path d="M 60 20 C 80 10, 100 20, 110 40 C 120 70, 90 80, 70 60 Z" fill="#4B5563" opacity="0.4" />
                <path d="M 120 10 C 150 5, 180 20, 190 40 C 180 70, 140 80, 130 50 Z" fill="#4B5563" opacity="0.4" />

                <circle cx="45" cy="55" r="4" fill="#3b82f6" />
                <circle cx="100" cy="70" r="4" fill="#3b82f6" />
                <circle cx="160" cy="18" r="4" fill="#10b981" />
              </svg>
            </div>
            <div className="distribution-stats">
              <span className="dist-text">Active Nodes: <strong className="text-white">142</strong></span>
              <span className="dist-text">TPS: <strong className="text-white">2,140</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
