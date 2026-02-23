import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { MOCK_DELIVERY_DATA, calculateSuccessRate } from './mockDeliveryData';
import type { DeliveryOutcome } from './mockDeliveryData';
import './DeliverySuccessChart.css';

interface DeliverySuccessChartProps {
  data?: DeliveryOutcome[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { name?: string; value?: number }[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="delivery-tooltip">
      <div className="delivery-tooltip-label">{payload[0].name}</div>
      <div className="delivery-tooltip-value">{payload[0].value} shipments</div>
    </div>
  );
}

export default function DeliverySuccessChart({ data = MOCK_DELIVERY_DATA }: DeliverySuccessChartProps) {
  const successRate = calculateSuccessRate(data);
  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="delivery-chart-section">
      <div className="delivery-chart-header">
        <h2 className="delivery-chart-title">
          <TrendingUp size={18} />
          Delivery Success Rate
        </h2>
      </div>

      <div className="delivery-chart-body">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="count"
              nameKey="status"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        <div className="delivery-center-label">
          <div className="success-percentage">{successRate}%</div>
          <div className="success-label">Success</div>
        </div>
      </div>

      <div className="delivery-legend">
        {data.map(item => (
          <div key={item.status} className="legend-item">
            <div className="legend-color" style={{ backgroundColor: item.color }} />
            <div className="legend-details">
              <span className="legend-status">{item.status}</span>
              <span className="legend-count">{item.count}</span>
            </div>
          </div>
        ))}
        <div className="legend-total">
          <span className="legend-total-label">Total</span>
          <span className="legend-total-count">{total}</span>
        </div>
      </div>
    </div>
  );
}
