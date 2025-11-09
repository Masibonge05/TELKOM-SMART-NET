import React from 'react';
import { X, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import './MetricDrillDown.css';

const TELKOM_COLORS = {
  primary: '#00C1DE',
  secondary: '#0077C8',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444'
};

const MetricDrillDown = ({ metric, onClose }) => {
  if (!metric) return null;

  const Icon = metric.icon;

  // Convert drilldown data to chart format
  const getChartData = () => {
    const data = metric.drillDownData;
    return Object.entries(data).map(([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: typeof value === 'string' ? parseFloat(value) : value
    }));
  };

  return (
    <div className="metric-drilldown-overlay" onClick={onClose}>
      <div className="metric-drilldown-modal" onClick={(e) => e.stopPropagation()}>
        <div className="drilldown-header" style={{ borderBottomColor: metric.color }}>
          <div className="drilldown-title-section">
            <div className="drilldown-icon" style={{ background: `${metric.color}20`, color: metric.color }}>
              <Icon size={32} />
            </div>
            <div>
              <h2>{metric.title} - Detailed Analysis</h2>
              <p>Real-time metrics and performance breakdown</p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="drilldown-body">
          {/* Current Value Section */}
          <div className="drilldown-current">
            <div className="current-value-card" style={{ borderLeftColor: metric.color }}>
              <div className="current-label">Current Value</div>
              <div className="current-value" style={{ color: metric.color }}>
                {metric.value} {metric.unit}
              </div>
              {metric.trend && (
                <div className={`trend-indicator ${metric.trend > 0 ? 'up' : 'down'}`}>
                  <TrendingUp size={20} />
                  <span>{Math.abs(metric.trend)}% vs last period</span>
                </div>
              )}
            </div>
          </div>

          {/* Breakdown Chart */}
          <div className="drilldown-chart">
            <h3>Performance Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              {metric.id === 'sites' || metric.id === 'threats' ? (
                <PieChart>
                  <Pie
                    data={getChartData()}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {getChartData().map((entry, index) => {
                      const colors = [TELKOM_COLORS.success, TELKOM_COLORS.warning, TELKOM_COLORS.danger, TELKOM_COLORS.secondary];
                      return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                    })}
                  </Pie>
                  <Tooltip />
                </PieChart>
              ) : (
                <BarChart data={getChartData()}>
                  <XAxis dataKey="name" stroke={TELKOM_COLORS.primary} />
                  <YAxis stroke={TELKOM_COLORS.primary} />
                  <Tooltip />
                  <Bar dataKey="value" fill={metric.color} radius={[8, 8, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* Detailed Metrics Grid */}
          <div className="drilldown-details-grid">
            {Object.entries(metric.drillDownData).map(([key, value]) => (
              <div key={key} className="detail-metric-card">
                <div className="detail-metric-label">{key.charAt(0).toUpperCase() + key.slice(1)}</div>
                <div className="detail-metric-value">{value}</div>
              </div>
            ))}
          </div>

          {/* AI Insights Section */}
          <div className="drilldown-insights">
            <h3><CheckCircle size={20} /> AI Insights</h3>
            <div className="insight-card">
              <AlertCircle size={18} style={{ color: TELKOM_COLORS.warning }} />
              <p>Performance is within normal parameters. No anomalies detected in the last 24 hours.</p>
            </div>
            {metric.trend && metric.trend > 5 && (
              <div className="insight-card success">
                <TrendingUp size={18} style={{ color: TELKOM_COLORS.success }} />
                <p>Significant improvement detected. Current trajectory exceeds target benchmarks.</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="drilldown-actions">
            <button className="action-btn primary" style={{ background: metric.color }}>
              View Historical Data
            </button>
            <button className="action-btn secondary">
              Export Report
            </button>
            <button className="action-btn secondary">
              Configure Alerts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricDrillDown;