import React, { useState } from 'react';
import { DollarSign, AlertTriangle, Shield, TrendingUp, Activity, Lock, Ban, CheckCircle, Wrench, Zap } from 'lucide-react';
import { PieChart, Pie, BarChart, Bar, LineChart, Line, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './RevenueDashboard.css';

const TELKOM_COLORS = {
  primary: '#00C1DE',
  secondary: '#0077C8',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444'
};

const RevenueDashboard = () => {
  const [selectedLeak, setSelectedLeak] = useState(null);

  const revenueMetrics = {
    leakageDetected: 'R12.4M',
    leakageRecovered: 'R8.9M',
    fraudCasesPrevented: 47,
    unbilledServicesFound: 234,
    accuracyRate: 96.3,
    activeInvestigations: 12
  };

  const leakageCategories = [
    { name: 'Unbilled Services', value: 45, amount: 'R5.6M', color: TELKOM_COLORS.danger },
    { name: 'Rating Errors', value: 28, amount: 'R3.5M', color: TELKOM_COLORS.warning },
    { name: 'Fraud', value: 18, amount: 'R2.2M', color: TELKOM_COLORS.primary },
    { name: 'System Errors', value: 9, amount: 'R1.1M', color: TELKOM_COLORS.secondary }
  ];

  const revenueLeaks = [
    {
      id: 'LEAK-2025-089',
      severity: 'critical',
      type: 'Unbilled Enterprise Services',
      customer: 'Corporate Account #4521',
      detectedDate: '2 days ago',
      estimatedLoss: 'R450K',
      monthlyImpact: 'R150K/month',
      duration: '3 months undetected',
      status: 'investigating',
      confidence: 98,
      description: 'Enterprise fiber connection upgraded from 100Mbps to 1Gbps but billing remained at lower tier',
      rootCause: 'Billing system not synced with provisioning database after upgrade',
      evidence: ['Network logs show 1Gbps traffic', 'Contract shows 100Mbps pricing', 'Provisioning ticket #8834'],
      recommendedAction: 'Issue corrected invoice + backdate 3 months',
      assignedTo: 'Revenue Assurance Team'
    },
    {
      id: 'LEAK-2025-087',
      severity: 'high',
      type: 'Rating Configuration Error',
      customer: 'Multiple Accounts (234)',
      detectedDate: '5 days ago',
      estimatedLoss: 'R280K',
      monthlyImpact: 'R93K/month',
      duration: '3 months',
      status: 'resolved',
      confidence: 94,
      description: 'International call rating misconfigured for South African dialing codes to SADC region',
      rootCause: 'Tariff table update error - incorrect zone classification',
      evidence: ['CDR analysis shows pattern', 'Tariff comparison', 'Customer complaints'],
      recommendedAction: 'Reconfigure rating table + credit affected customers',
      resolution: 'Rating corrected, R280K recovered through adjusted billing',
      resolvedBy: 'AI Revenue Engine'
    },
    {
      id: 'LEAK-2025-085',
      severity: 'medium',
      type: 'Promotional Discount Overstay',
      customer: 'Consumer Accounts (89)',
      detectedDate: '1 week ago',
      estimatedLoss: 'R125K',
      monthlyImpact: 'R42K/month',
      duration: '3 months',
      status: 'in-progress',
      confidence: 91,
      description: '89 customers still receiving 6-month promotional discount after expiry',
      rootCause: 'Automatic discount removal failed - CRM system bug',
      evidence: ['Discount end dates passed', 'CRM logs', 'Contract terms'],
      recommendedAction: 'Remove discounts + notify customers',
      assignedTo: 'Billing Operations'
    },
    {
      id: 'LEAK-2025-082',
      severity: 'critical',
      type: 'Suspected Fraud - SIM Boxing',
      customer: 'Account #7832',
      detectedDate: '3 days ago',
      estimatedLoss: 'R890K',
      monthlyImpact: 'R297K/month',
      duration: '3 months',
      status: 'investigating',
      confidence: 97,
      description: 'Abnormal international call patterns - 15,000+ calls/day to premium rate numbers',
      rootCause: 'Potential SIM box operation routing international calls as local',
      evidence: ['Call pattern analysis', 'Location data mismatch', 'Volume anomaly'],
      recommendedAction: 'URGENT: Suspend service + legal investigation',
      assignedTo: 'Fraud Investigation Unit'
    }
  ];

  const monthlyTrend = [
    { month: 'Jan', detected: 8.2, recovered: 5.8 },
    { month: 'Feb', detected: 9.5, recovered: 6.9 },
    { month: 'Mar', detected: 11.2, recovered: 7.8 },
    { month: 'Apr', detected: 10.8, recovered: 8.1 },
    { month: 'May', detected: 12.4, recovered: 8.9 },
    { month: 'Jun', detected: 12.4, recovered: 8.9 }
  ];

  const detectionAccuracy = [
    { category: 'True Positive', value: 452, color: TELKOM_COLORS.success },
    { category: 'False Positive', value: 18, color: TELKOM_COLORS.warning }
  ];

  const LeakCard = ({ leak }) => {
    const severityConfig = {
      critical: { color: TELKOM_COLORS.danger, icon: Ban, label: 'CRITICAL' },
      high: { color: TELKOM_COLORS.warning, icon: AlertTriangle, label: 'HIGH' },
      medium: { color: TELKOM_COLORS.primary, icon: Activity, label: 'MEDIUM' }
    };
    const config = severityConfig[leak.severity];
    const SeverityIcon = config.icon;

    const statusConfig = {
      investigating: { color: TELKOM_COLORS.warning, icon: '🔍', label: 'Investigating' },
      'in-progress': { color: TELKOM_COLORS.primary, icon: '⚙️', label: 'In Progress' },
      resolved: { color: TELKOM_COLORS.success, icon: '✅', label: 'Resolved' }
    };
    const statusInfo = statusConfig[leak.status];

    return (
      <div 
        className="leak-card" 
        style={{ borderLeftColor: config.color }}
        onClick={() => setSelectedLeak(leak)}
      >
        <div className="leak-header">
          <div className="leak-badge" style={{ background: config.color }}>
            <SeverityIcon size={16} />
            <span>{config.label}</span>
          </div>
          <div className="leak-id">{leak.id}</div>
        </div>

        <div className="leak-type">{leak.type}</div>
        <div className="leak-customer">
          <DollarSign size={16} />
          <span>{leak.customer}</span>
        </div>

        <div className="leak-metrics">
          <div className="leak-metric-item">
            <span className="leak-metric-label">Estimated Loss:</span>
            <span className="leak-metric-value" style={{ color: TELKOM_COLORS.danger }}>
              {leak.estimatedLoss}
            </span>
          </div>
          <div className="leak-metric-item">
            <span className="leak-metric-label">Monthly Impact:</span>
            <span className="leak-metric-value">{leak.monthlyImpact}</span>
          </div>
          <div className="leak-metric-item">
            <span className="leak-metric-label">Duration:</span>
            <span className="leak-metric-value">{leak.duration}</span>
          </div>
        </div>

        <div className="leak-confidence">
          <span>AI Confidence:</span>
          <div className="confidence-bar">
            <div 
              className="confidence-fill" 
              style={{ 
                width: `${leak.confidence}%`,
                background: leak.confidence >= 95 ? TELKOM_COLORS.success : 
                           leak.confidence >= 85 ? TELKOM_COLORS.warning : 
                           TELKOM_COLORS.danger
              }}
            >
              <span className="confidence-text">{leak.confidence}%</span>
            </div>
          </div>
        </div>

        <div className="leak-footer">
          <div className="leak-status" style={{ color: statusInfo.color }}>
            <span>{statusInfo.icon}</span>
            <span>{statusInfo.label}</span>
          </div>
          <span className="leak-date">Detected: {leak.detectedDate}</span>
        </div>
      </div>
    );
  };

  const LeakDetailModal = ({ leak, onClose }) => {
    if (!leak) return null;

    const severityConfig = {
      critical: { color: TELKOM_COLORS.danger, label: 'CRITICAL REVENUE LEAK' },
      high: { color: TELKOM_COLORS.warning, label: 'HIGH PRIORITY' },
      medium: { color: TELKOM_COLORS.primary, label: 'MEDIUM PRIORITY' }
    };
    const config = severityConfig[leak.severity];

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content leak-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header" style={{ borderBottomColor: config.color }}>
            <div>
              <h2>{leak.type}</h2>
              <p className="modal-subtitle">{leak.id} • {leak.customer}</p>
            </div>
            <button className="modal-close" onClick={onClose}>×</button>
          </div>

          <div className="modal-body">
            <div className="leak-section">
              <h3 className="section-title-small">Description</h3>
              <p className="leak-detail-text">{leak.description}</p>
            </div>

            <div className="leak-financial-impact">
              <div className="financial-item-large">
                <span>Total Estimated Loss:</span>
                <strong style={{ color: TELKOM_COLORS.danger }}>{leak.estimatedLoss}</strong>
              </div>
              <div className="financial-item-large">
                <span>Monthly Impact:</span>
                <strong style={{ color: TELKOM_COLORS.warning }}>{leak.monthlyImpact}</strong>
              </div>
              <div className="financial-item-large">
                <span>Undetected Duration:</span>
                <strong>{leak.duration}</strong>
              </div>
            </div>

            <div className="leak-section">
              <h3 className="section-title-small">Root Cause Analysis</h3>
              <p className="leak-detail-text" style={{ color: TELKOM_COLORS.warning }}>
                🔍 {leak.rootCause}
              </p>
            </div>

            <div className="leak-section">
              <h3 className="section-title-small">Evidence</h3>
              <div className="evidence-list">
                {leak.evidence.map((item, idx) => (
                  <div key={idx} className="evidence-item">
                    <CheckCircle size={16} style={{ color: TELKOM_COLORS.success }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="leak-section">
              <h3 className="section-title-small">Recommended Action</h3>
              <p className="leak-detail-text" style={{ color: TELKOM_COLORS.primary }}>
                💡 {leak.recommendedAction}
              </p>
            </div>

            {leak.status === 'resolved' && (
              <div className="leak-section resolved-section">
                <h3 className="section-title-small" style={{ color: TELKOM_COLORS.success }}>
                  ✓ Resolution
                </h3>
                <p className="leak-detail-text">{leak.resolution}</p>
                <div className="resolution-meta">
                  <span>Resolved by: {leak.resolvedBy}</span>
                </div>
              </div>
            )}

            {leak.status !== 'resolved' && (
              <div className="leak-section">
                <h3 className="section-title-small">Assignment</h3>
                <div className="assignment-info">
                  <div>
                    <strong>Assigned To:</strong> {leak.assignedTo}
                  </div>
                  <div>
                    <strong>Status:</strong> {leak.status}
                  </div>
                </div>
              </div>
            )}

            {leak.status !== 'resolved' && (
              <div className="leak-actions">
                <button className="action-btn primary">
                  <Shield size={16} />
                  Initiate Recovery
                </button>
                <button className="action-btn secondary">
                  <Wrench size={16} />
                  Escalate to Fraud Team
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="revenue-dashboard">
      {/* Header */}
      <div className="revenue-header">
        <div className="revenue-title">
          <DollarSign size={32} style={{ color: TELKOM_COLORS.primary }} />
          <div>
            <h2>Revenue Assurance & Fraud Detection</h2>
            <p>AI-powered leakage detection • Real-time billing validation • Fraud prevention</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="revenue-metrics-grid">
        <div className="revenue-metric-card" style={{ borderTopColor: TELKOM_COLORS.danger }}>
          <AlertTriangle size={28} style={{ color: TELKOM_COLORS.danger }} />
          <div className="revenue-metric-value">{revenueMetrics.leakageDetected}</div>
          <div className="revenue-metric-label">Total Leakage Detected</div>
          <div className="revenue-metric-subtitle">This month</div>
        </div>
        <div className="revenue-metric-card" style={{ borderTopColor: TELKOM_COLORS.success }}>
          <CheckCircle size={28} style={{ color: TELKOM_COLORS.success }} />
          <div className="revenue-metric-value">{revenueMetrics.leakageRecovered}</div>
          <div className="revenue-metric-label">Revenue Recovered</div>
          <div className="revenue-metric-subtitle">{((8.9/12.4)*100).toFixed(1)}% recovery rate</div>
        </div>
        <div className="revenue-metric-card" style={{ borderTopColor: TELKOM_COLORS.warning }}>
          <Ban size={28} style={{ color: TELKOM_COLORS.warning }} />
          <div className="revenue-metric-value">{revenueMetrics.fraudCasesPrevented}</div>
          <div className="revenue-metric-label">Fraud Cases Prevented</div>
          <div className="revenue-metric-subtitle">AI detection</div>
        </div>
        <div className="revenue-metric-card" style={{ borderTopColor: TELKOM_COLORS.primary }}>
          <Activity size={28} style={{ color: TELKOM_COLORS.primary }} />
          <div className="revenue-metric-value">{revenueMetrics.unbilledServicesFound}</div>
          <div className="revenue-metric-label">Unbilled Services Found</div>
          <div className="revenue-metric-subtitle">Awaiting correction</div>
        </div>
      </div>

      {/* Active Leaks */}
      <div className="leaks-section">
        <h3>
          <Shield size={24} style={{ color: TELKOM_COLORS.danger }} />
          Active Revenue Leaks
        </h3>
        <div className="leaks-grid">
          {revenueLeaks.map(leak => (
            <LeakCard key={leak.id} leak={leak} />
          ))}
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="revenue-analytics-grid">
        {/* Monthly Trend */}
        <div className="chart-card-revenue">
          <h4>Revenue Leakage vs Recovery Trend</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(15, 20, 25, 0.95)', 
                  border: `1px solid ${TELKOM_COLORS.primary}`,
                  borderRadius: '8px'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="detected" 
                stroke={TELKOM_COLORS.danger} 
                strokeWidth={3}
                name="Detected (R millions)"
              />
              <Line 
                type="monotone" 
                dataKey="recovered" 
                stroke={TELKOM_COLORS.success} 
                strokeWidth={3}
                name="Recovered (R millions)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Leakage Categories */}
        <div className="chart-card-revenue">
          <h4>Leakage Categories Breakdown</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={leakageCategories}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(15, 20, 25, 0.95)', 
                  border: `1px solid ${TELKOM_COLORS.primary}`,
                  borderRadius: '8px'
                }} 
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {leakageCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="chart-footer-note">
            Total value: R12.4M across all categories
          </div>
        </div>

        {/* Detection Accuracy */}
        <div className="chart-card-revenue accuracy-card">
          <h4>AI Detection Accuracy</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={detectionAccuracy}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label
              >
                {detectionAccuracy.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="accuracy-stats">
            <div className="accuracy-stat">
              <span className="accuracy-label">Accuracy Rate:</span>
              <span className="accuracy-value" style={{ color: TELKOM_COLORS.success }}>
                {revenueMetrics.accuracyRate}%
              </span>
            </div>
          </div>
        </div>

        {/* Impact Summary */}
        <div className="chart-card-revenue impact-summary">
          <h4>💰 Financial Impact Summary</h4>
          <div className="impact-grid">
            <div className="impact-stat-item">
              <div className="impact-stat-label">Leakage Prevented (YTD):</div>
              <div className="impact-stat-value" style={{ color: TELKOM_COLORS.success }}>R67.8M</div>
            </div>
            <div className="impact-stat-item">
              <div className="impact-stat-label">Recovery Rate:</div>
              <div className="impact-stat-value" style={{ color: TELKOM_COLORS.primary }}>71.8%</div>
            </div>
            <div className="impact-stat-item">
              <div className="impact-stat-label">Fraud Losses Prevented:</div>
              <div className="impact-stat-value" style={{ color: TELKOM_COLORS.success }}>R23.4M</div>
            </div>
            <div className="impact-stat-item">
              <div className="impact-stat-label">ROI on RA Platform:</div>
              <div className="impact-stat-value" style={{ color: TELKOM_COLORS.primary }}>890%</div>
            </div>
          </div>
        </div>
      </div>

      {selectedLeak && (
        <LeakDetailModal leak={selectedLeak} onClose={() => setSelectedLeak(null)} />
      )}
    </div>
  );
};

export default RevenueDashboard;