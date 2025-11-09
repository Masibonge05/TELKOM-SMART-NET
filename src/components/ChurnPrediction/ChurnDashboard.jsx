import React, { useState } from 'react';
import { Users, TrendingDown, AlertCircle, DollarSign, Phone, Mail, Gift, Target, CheckCircle } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import './ChurnDashboard.css';

const TELKOM_COLORS = {
  primary: '#00C1DE',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  secondary: '#0077C8'
};

const ChurnDashboard = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const churnMetrics = {
    atRiskCustomers: 2847,
    monthlyChurnRate: 3.2,
    potentialRevenueLoss: 'R8.9M',
    preventedChurn: 187,
    retentionCampaignsActive: 12,
    avgChurnPredictionAccuracy: 91.66
  };

  const atRiskCustomers = [
    {
      id: 'CUST-78234',
      name: 'Customer 78234',
      segment: 'Enterprise',
      churnRisk: 94,
      monthlyValue: 'R45,000',
      contractEnd: '14 days',
      mainIssues: ['Service Quality', 'Pricing', 'Competitor Offer'],
      socialInfluence: 'High',
      usageDecline: 35,
      supportTickets: 8,
      recommendedAction: 'Immediate retention call + Discount offer',
      campaignSent: false,
      daysToChurn: 14
    },
    {
      id: 'CUST-56891',
      name: 'Customer 56891',
      segment: 'SMB',
      churnRisk: 89,
      monthlyValue: 'R12,500',
      contractEnd: '21 days',
      mainIssues: ['Network Outages', 'Support Response'],
      socialInfluence: 'Medium',
      usageDecline: 42,
      supportTickets: 12,
      recommendedAction: 'Service upgrade + Priority support',
      campaignSent: true,
      daysToChurn: 21
    },
    {
      id: 'CUST-34567',
      name: 'Customer 34567',
      segment: 'Consumer',
      churnRisk: 82,
      monthlyValue: 'R899',
      contractEnd: '32 days',
      mainIssues: ['Price Sensitivity', 'Data Caps'],
      socialInfluence: 'High',
      usageDecline: 28,
      supportTickets: 3,
      recommendedAction: 'Loyalty bonus + Data bundle offer',
      campaignSent: false,
      daysToChurn: 32
    },
    {
      id: 'CUST-92341',
      name: 'Customer 92341',
      segment: 'Enterprise',
      churnRisk: 78,
      monthlyValue: 'R78,000',
      contractEnd: '45 days',
      mainIssues: ['Feature Request', 'Contract Terms'],
      socialInfluence: 'Low',
      usageDecline: 18,
      supportTickets: 5,
      recommendedAction: 'Account manager visit + Custom package',
      campaignSent: true,
      daysToChurn: 45
    },
    {
      id: 'CUST-12098',
      name: 'Customer 12098',
      segment: 'SMB',
      churnRisk: 75,
      monthlyValue: 'R8,900',
      contractEnd: '52 days',
      mainIssues: ['Billing Issues', 'Support Quality'],
      socialInfluence: 'Medium',
      usageDecline: 22,
      supportTickets: 7,
      recommendedAction: 'Billing review + Dedicated support',
      campaignSent: false,
      daysToChurn: 52
    }
  ];

  const churnReasonData = [
    { name: 'Service Quality', value: 35, color: TELKOM_COLORS.danger },
    { name: 'Pricing', value: 28, color: TELKOM_COLORS.warning },
    { name: 'Competitor Offers', value: 22, color: TELKOM_COLORS.secondary },
    { name: 'Support Issues', value: 10, color: TELKOM_COLORS.primary },
    { name: 'Other', value: 5, color: '#666' }
  ];

  const retentionSuccessData = [
    { month: 'Jan', prevented: 145, churned: 89 },
    { month: 'Feb', prevented: 167, churned: 76 },
    { month: 'Mar', prevented: 189, churned: 68 },
    { month: 'Apr', prevented: 201, churned: 54 },
    { month: 'May', prevented: 223, churned: 47 },
    { month: 'Jun', prevented: 234, churned: 41 }
  ];

  const churnTrendData = [
    { week: 'W1', rate: 4.2 },
    { week: 'W2', rate: 3.8 },
    { week: 'W3', rate: 3.5 },
    { week: 'W4', rate: 3.2 }
  ];

  const segmentRiskData = [
    { segment: 'Enterprise', atRisk: 234, total: 1200, revenue: 'R12.4M' },
    { segment: 'SMB', atRisk: 892, total: 4500, revenue: 'R8.9M' },
    { segment: 'Consumer', atRisk: 1721, total: 48000, revenue: 'R2.1M' }
  ];

  return (
    <div className="churn-dashboard">
      {/* Header */}
      <div className="churn-header">
        <div className="churn-title">
          <Users size={32} style={{ color: TELKOM_COLORS.primary }} />
          <div>
            <h2>Customer Churn Prediction & Retention</h2>
            <p>AI-powered churn prediction • 91.66% accuracy • Proactive retention campaigns</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="churn-metrics-grid">
        <div className="churn-metric-card" style={{ borderTopColor: TELKOM_COLORS.danger }}>
          <AlertCircle size={28} style={{ color: TELKOM_COLORS.danger }} />
          <div className="churn-metric-value">{churnMetrics.atRiskCustomers.toLocaleString()}</div>
          <div className="churn-metric-label">At-Risk Customers</div>
          <div className="churn-metric-subtitle">Next 90 days</div>
        </div>
        <div className="churn-metric-card" style={{ borderTopColor: TELKOM_COLORS.warning }}>
          <TrendingDown size={28} style={{ color: TELKOM_COLORS.warning }} />
          <div className="churn-metric-value">{churnMetrics.monthlyChurnRate}%</div>
          <div className="churn-metric-label">Current Churn Rate</div>
          <div className="churn-metric-subtitle trend-down">↓ 0.8% vs last month</div>
        </div>
        <div className="churn-metric-card" style={{ borderTopColor: TELKOM_COLORS.danger }}>
          <DollarSign size={28} style={{ color: TELKOM_COLORS.danger }} />
          <div className="churn-metric-value">{churnMetrics.potentialRevenueLoss}</div>
          <div className="churn-metric-label">Potential Revenue Loss</div>
          <div className="churn-metric-subtitle">If no action taken</div>
        </div>
        <div className="churn-metric-card" style={{ borderTopColor: TELKOM_COLORS.success }}>
          <Target size={28} style={{ color: TELKOM_COLORS.success }} />
          <div className="churn-metric-value">{churnMetrics.preventedChurn}</div>
          <div className="churn-metric-label">Churn Prevented</div>
          <div className="churn-metric-subtitle">This month • R2.4M saved</div>
        </div>
      </div>

      {/* At-Risk Customers List */}
      <div className="at-risk-section">
        <h3>
          <AlertCircle size={24} style={{ color: TELKOM_COLORS.danger }} />
          High-Risk Customers (Top Priority)
        </h3>
        <div className="at-risk-grid">
          {atRiskCustomers.map(customer => (
            <div 
              key={customer.id} 
              className="at-risk-card"
              style={{ 
                borderLeftColor: customer.churnRisk >= 90 ? TELKOM_COLORS.danger :
                                 customer.churnRisk >= 80 ? TELKOM_COLORS.warning :
                                 TELKOM_COLORS.primary
              }}
              onClick={() => setSelectedCustomer(customer)}
            >
              <div className="risk-card-header">
                <div className="customer-id-section">
                  <Users size={20} />
                  <div>
                    <div className="customer-id">{customer.id}</div>
                    <div className="customer-segment">{customer.segment}</div>
                  </div>
                </div>
                <div className="risk-score-badge" style={{
                  background: customer.churnRisk >= 90 ? TELKOM_COLORS.danger :
                             customer.churnRisk >= 80 ? TELKOM_COLORS.warning :
                             TELKOM_COLORS.primary
                }}>
                  {customer.churnRisk}% Risk
                </div>
              </div>

              <div className="risk-card-body">
                <div className="risk-value-row">
                  <span className="risk-label">Monthly Value:</span>
                  <span className="risk-value" style={{ color: TELKOM_COLORS.primary }}>
                    {customer.monthlyValue}
                  </span>
                </div>
                <div className="risk-value-row">
                  <span className="risk-label">Contract Ends:</span>
                  <span className="risk-value urgent">{customer.contractEnd}</span>
                </div>

                <div className="risk-issues">
                  <div className="risk-issues-label">Main Issues:</div>
                  <div className="risk-issues-tags">
                    {customer.mainIssues.map((issue, idx) => (
                      <span key={idx} className="issue-tag">{issue}</span>
                    ))}
                  </div>
                </div>

                <div className="risk-indicators-grid">
                  <div className="risk-indicator">
                    <span className="indicator-label">Usage Decline:</span>
                    <span className="indicator-value" style={{ color: TELKOM_COLORS.danger }}>
                      {customer.usageDecline}%
                    </span>
                  </div>
                  <div className="risk-indicator">
                    <span className="indicator-label">Support Tickets:</span>
                    <span className="indicator-value">{customer.supportTickets}</span>
                  </div>
                  <div className="risk-indicator">
                    <span className="indicator-label">Social Influence:</span>
                    <span className={`indicator-badge ${customer.socialInfluence.toLowerCase()}`}>
                      {customer.socialInfluence}
                    </span>
                  </div>
                </div>

                <div className="recommended-action-box">
                  <strong>💡 AI Recommendation:</strong>
                  <p>{customer.recommendedAction}</p>
                </div>

                <div className="risk-card-actions">
                  {customer.campaignSent ? (
                    <div className="campaign-sent-indicator">
                      <Mail size={16} style={{ color: TELKOM_COLORS.success }} />
                      <span>Retention campaign sent</span>
                    </div>
                  ) : (
                    <button className="action-btn-churn primary">
                      <Gift size={16} />
                      Launch Retention Campaign
                    </button>
                  )}
                  <button className="action-btn-churn secondary">
                    <Phone size={16} />
                    Contact Customer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Section */}
      <div className="churn-analytics-grid">
        {/* Churn Reasons */}
        <div className="chart-card-churn">
          <h4>Top Churn Reasons</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={churnReasonData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {churnReasonData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Retention Success */}
        <div className="chart-card-churn">
          <h4>Churn Prevention Success Rate</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={retentionSuccessData}>
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
              <Legend />
              <Bar dataKey="prevented" fill={TELKOM_COLORS.success} name="Churn Prevented" radius={[8, 8, 0, 0]} />
              <Bar dataKey="churned" fill={TELKOM_COLORS.danger} name="Churned" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Churn Rate Trend */}
        <div className="chart-card-churn">
          <h4>Monthly Churn Rate Trend</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={churnTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="week" stroke="#fff" />
              <YAxis stroke="#fff" domain={[0, 5]} />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(15, 20, 25, 0.95)', 
                  border: `1px solid ${TELKOM_COLORS.primary}`,
                  borderRadius: '8px'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="rate" 
                stroke={TELKOM_COLORS.warning} 
                strokeWidth={3}
                dot={{ fill: TELKOM_COLORS.warning, r: 6 }}
                name="Churn Rate %"
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="chart-footer-note">
            Target: <strong style={{ color: TELKOM_COLORS.success }}>2.5%</strong> • 
            Current: <strong style={{ color: TELKOM_COLORS.warning }}>3.2%</strong>
          </div>
        </div>

        {/* Segment Analysis */}
        <div className="segment-analysis-card">
          <h4>Churn Risk by Customer Segment</h4>
          <div className="segment-analysis-list">
            {segmentRiskData.map((segment, idx) => (
              <div key={idx} className="segment-item">
                <div className="segment-header">
                  <span className="segment-name">{segment.segment}</span>
                  <span className="segment-revenue" style={{ color: TELKOM_COLORS.primary }}>
                    {segment.revenue} at risk
                  </span>
                </div>
                <div className="segment-stats">
                  <span>{segment.atRisk.toLocaleString()} at risk of {segment.total.toLocaleString()} total</span>
                </div>
                <div className="segment-bar">
                  <div 
                    className="segment-bar-fill"
                    style={{ 
                      width: `${(segment.atRisk / segment.total) * 100}%`,
                      background: TELKOM_COLORS.danger
                    }}
                  >
                    <span className="segment-percentage">
                      {((segment.atRisk / segment.total) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights Panel */}
      <div className="churn-insights-panel">
        <h3>🤖 AI-Powered Insights & Recommendations</h3>
        <div className="insights-grid">
          <div className="insight-card success">
            <CheckCircle size={20} style={{ color: TELKOM_COLORS.success }} />
            <p>Retention campaigns with personalized offers show <strong>67% success rate</strong> for high-value enterprise customers.</p>
          </div>
          <div className="insight-card warning">
            <AlertCircle size={20} style={{ color: TELKOM_COLORS.warning }} />
            <p>Customers with <strong>3+ support tickets</strong> in 30 days are 4.2x more likely to churn. Prioritize immediate follow-up.</p>
          </div>
          <div className="insight-card info">
            <Target size={20} style={{ color: TELKOM_COLORS.primary }} />
            <p>Social network analysis shows <strong>892 customers</strong> influenced by churned connections. Launch targeted campaigns now.</p>
          </div>
        </div>
      </div>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="modal-overlay" onClick={() => setSelectedCustomer(null)}>
          <div className="modal-content-churn" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-churn" style={{ borderBottomColor: TELKOM_COLORS.danger }}>
              <div>
                <h2>Customer Risk Profile</h2>
                <p>{selectedCustomer.id} • {selectedCustomer.segment}</p>
              </div>
              <button className="modal-close" onClick={() => setSelectedCustomer(null)}>×</button>
            </div>
            <div className="modal-body-churn">
              <div className="detail-grid-churn">
                <div className="detail-item-churn">
                  <span className="detail-label">Churn Risk Score:</span>
                  <span className="detail-value" style={{ color: TELKOM_COLORS.danger }}>
                    {selectedCustomer.churnRisk}%
                  </span>
                </div>
                <div className="detail-item-churn">
                  <span className="detail-label">Monthly Value:</span>
                  <span className="detail-value">{selectedCustomer.monthlyValue}</span>
                </div>
                <div className="detail-item-churn">
                  <span className="detail-label">Days to Contract End:</span>
                  <span className="detail-value">{selectedCustomer.daysToChurn}</span>
                </div>
                <div className="detail-item-churn">
                  <span className="detail-label">Usage Decline:</span>
                  <span className="detail-value" style={{ color: TELKOM_COLORS.danger }}>
                    {selectedCustomer.usageDecline}%
                  </span>
                </div>
              </div>
              <div className="modal-actions-churn">
                <button className="modal-btn-churn primary">Launch Retention Campaign</button>
                <button className="modal-btn-churn secondary">Schedule Call</button>
                <button className="modal-btn-churn secondary">Send Offer</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChurnDashboard;