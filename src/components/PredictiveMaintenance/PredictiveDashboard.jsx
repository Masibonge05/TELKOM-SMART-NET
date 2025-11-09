import React, { useState, useEffect } from 'react';
import { Zap, AlertTriangle, Clock, TrendingDown, CheckCircle, Wrench, Calendar } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './PredictiveDashboard.css';

const TELKOM_COLORS = {
  primary: '#00C1DE',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  secondary: '#0077C8'
};

const PredictiveDashboard = () => {
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => Math.max(0, prev - 0.1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const predictions = [
    {
      id: 'PRED-001',
      site: 'KZN-001',
      siteName: 'Durban North',
      component: 'Generator Fuel Pump',
      failureProbability: 94,
      timeToFailure: '4 hours',
      impact: 'CRITICAL',
      affectedUsers: 2340,
      recommendedAction: 'Immediate replacement',
      costOfFailure: 'R2.3M',
      preventionCost: 'R45K',
      roi: '5,011%',
      status: 'urgent'
    },
    {
      id: 'PRED-002',
      site: 'WC-001',
      siteName: 'Cape Town CBD',
      component: 'Cooling System Fan',
      failureProbability: 78,
      timeToFailure: '18 hours',
      impact: 'HIGH',
      affectedUsers: 312,
      recommendedAction: 'Schedule maintenance within 12 hours',
      costOfFailure: 'R890K',
      preventionCost: 'R28K',
      roi: '3,079%',
      status: 'warning'
    },
    {
      id: 'PRED-003',
      site: 'GT-002',
      siteName: 'Pretoria East',
      component: 'Battery Bank',
      failureProbability: 65,
      timeToFailure: '5 days',
      impact: 'MEDIUM',
      affectedUsers: 198,
      recommendedAction: 'Schedule replacement next week',
      costOfFailure: 'R450K',
      preventionCost: 'R85K',
      roi: '429%',
      status: 'scheduled'
    },
    {
      id: 'PRED-004',
      site: 'MP-001',
      siteName: 'Nelspruit',
      component: 'Power Rectifier',
      failureProbability: 58,
      timeToFailure: '12 days',
      impact: 'MEDIUM',
      affectedUsers: 143,
      recommendedAction: 'Monitor and schedule',
      costOfFailure: 'R320K',
      preventionCost: 'R52K',
      roi: '515%',
      status: 'monitoring'
    }
  ];

  const savingsData = [
    { month: 'Jan', prevented: 12, manual: 8 },
    { month: 'Feb', prevented: 15, manual: 6 },
    { month: 'Mar', prevented: 18, manual: 5 },
    { month: 'Apr', prevented: 22, manual: 4 },
    { month: 'May', prevented: 25, manual: 3 },
    { month: 'Jun', prevented: 28, manual: 2 }
  ];

  const accuracyData = [
    { week: 'Week 1', accuracy: 87 },
    { week: 'Week 2', accuracy: 89 },
    { week: 'Week 3', accuracy: 91 },
    { week: 'Week 4', accuracy: 93 }
  ];

  return (
    <div className="predictive-dashboard">
      {/* Header */}
      <div className="predictive-header">
        <div className="predictive-title">
          <Zap size={32} style={{ color: TELKOM_COLORS.warning }} />
          <div>
            <h2>Predictive Maintenance Engine</h2>
            <p>AI-powered failure prediction • Prevent outages before they happen</p>
          </div>
        </div>
      </div>

      {/* Impact Metrics */}
      <div className="impact-metrics-grid">
        <div className="impact-card" style={{ borderTopColor: TELKOM_COLORS.success }}>
          <CheckCircle size={28} style={{ color: TELKOM_COLORS.success }} />
          <div className="impact-value">45</div>
          <div className="impact-label">Failures Prevented This Month</div>
          <div className="impact-subtitle">Saving R12.4M in downtime</div>
        </div>
        <div className="impact-card" style={{ borderTopColor: TELKOM_COLORS.primary }}>
          <TrendingDown size={28} style={{ color: TELKOM_COLORS.primary }} />
          <div className="impact-value">76%</div>
          <div className="impact-label">Faster Resolution Time</div>
          <div className="impact-subtitle">vs Traditional Maintenance</div>
        </div>
        <div className="impact-card" style={{ borderTopColor: TELKOM_COLORS.warning }}>
          <Clock size={28} style={{ color: TELKOM_COLORS.warning }} />
          <div className="impact-value">24-48hrs</div>
          <div className="impact-label">Prediction Window</div>
          <div className="impact-subtitle">Average advance warning</div>
        </div>
        <div className="impact-card" style={{ borderTopColor: TELKOM_COLORS.danger }}>
          <AlertTriangle size={28} style={{ color: TELKOM_COLORS.danger }} />
          <div className="impact-value">4</div>
          <div className="impact-label">Active Critical Alerts</div>
          <div className="impact-subtitle">Require immediate action</div>
        </div>
      </div>

      {/* Urgent Alert Banner */}
      <div className="urgent-alert-banner">
        <div className="urgent-alert-icon pulsing-red">
          <AlertTriangle size={24} />
        </div>
        <div className="urgent-alert-content">
          <div className="urgent-alert-title">⚠️ CRITICAL: Generator Failure Imminent - Durban North</div>
          <div className="urgent-alert-message">
            AI predicts 94% probability of fuel pump failure in <strong style={{ color: TELKOM_COLORS.danger }}>{countdown.toFixed(1)} hours</strong>. 
            Immediate dispatch recommended. Potential revenue loss: R2.3M
          </div>
        </div>
        <button className="urgent-alert-btn">
          <Wrench size={16} />
          Dispatch Team Now
        </button>
      </div>

      {/* Predictions Grid */}
      <div className="predictions-section">
        <h3>
          <AlertTriangle size={24} style={{ color: TELKOM_COLORS.warning }} />
          Active Failure Predictions
        </h3>
        <div className="predictions-grid">
          {predictions.map(pred => (
            <div 
              key={pred.id} 
              className={`prediction-card ${pred.status}`}
              style={{ 
                borderLeftColor: pred.status === 'urgent' ? TELKOM_COLORS.danger :
                                 pred.status === 'warning' ? TELKOM_COLORS.warning :
                                 TELKOM_COLORS.primary
              }}
            >
              <div className="prediction-header">
                <div className="prediction-id">{pred.id}</div>
                <div className="prediction-probability" style={{ 
                  background: pred.failureProbability >= 90 ? TELKOM_COLORS.danger :
                             pred.failureProbability >= 70 ? TELKOM_COLORS.warning :
                             TELKOM_COLORS.primary,
                  color: '#fff',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {pred.failureProbability}% Probability
                </div>
              </div>

              <div className="prediction-site">
                <strong>{pred.site}</strong> - {pred.siteName}
              </div>

              <div className="prediction-component">
                <Wrench size={16} />
                <span>{pred.component}</span>
              </div>

              <div className="prediction-countdown">
                <Clock size={18} style={{ color: TELKOM_COLORS.danger }} />
                <span className="countdown-text">
                  Time to Failure: <strong>{pred.timeToFailure}</strong>
                </span>
              </div>

              <div className="prediction-impact-grid">
                <div className="impact-item">
                  <span className="impact-label">Impact Level:</span>
                  <span className={`impact-badge ${pred.impact.toLowerCase()}`}>{pred.impact}</span>
                </div>
                <div className="impact-item">
                  <span className="impact-label">Affected Users:</span>
                  <span className="impact-value">{pred.affectedUsers.toLocaleString()}</span>
                </div>
              </div>

              <div className="prediction-financials">
                <div className="financial-item">
                  <span>Cost of Failure:</span>
                  <strong style={{ color: TELKOM_COLORS.danger }}>{pred.costOfFailure}</strong>
                </div>
                <div className="financial-item">
                  <span>Prevention Cost:</span>
                  <strong style={{ color: TELKOM_COLORS.success }}>{pred.preventionCost}</strong>
                </div>
                <div className="financial-item roi-highlight">
                  <span>ROI:</span>
                  <strong style={{ color: TELKOM_COLORS.primary }}>{pred.roi}</strong>
                </div>
              </div>

              <div className="prediction-action">
                <strong>Recommended Action:</strong>
                <p>{pred.recommendedAction}</p>
              </div>

              <div className="prediction-buttons">
                <button className="pred-btn primary">Schedule Maintenance</button>
                <button className="pred-btn secondary">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="analytics-charts-grid">
        <div className="chart-card-predictive">
          <h4>Failures Prevented vs Manual Interventions</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={savingsData}>
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
              <Bar dataKey="prevented" fill={TELKOM_COLORS.success} name="AI Prevented" radius={[8, 8, 0, 0]} />
              <Bar dataKey="manual" fill={TELKOM_COLORS.danger} name="Manual Response" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card-predictive">
          <h4>Prediction Accuracy Trend</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={accuracyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="week" stroke="#fff" />
              <YAxis stroke="#fff" domain={[80, 100]} />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(15, 20, 25, 0.95)', 
                  border: `1px solid ${TELKOM_COLORS.primary}`,
                  borderRadius: '8px'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="accuracy" 
                stroke={TELKOM_COLORS.primary} 
                strokeWidth={3}
                dot={{ fill: TELKOM_COLORS.primary, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="chart-footer-note">
            Current accuracy: <strong style={{ color: TELKOM_COLORS.success }}>93.2%</strong> • Target: 90%
          </div>
        </div>
      </div>

      {/* Maintenance Calendar */}
      <div className="maintenance-calendar-section">
        <h3>
          <Calendar size={24} style={{ color: TELKOM_COLORS.primary }} />
          AI-Optimized Maintenance Schedule
        </h3>
        <div className="calendar-grid">
          {['Today', 'Tomorrow', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'].map((day, idx) => (
            <div key={idx} className="calendar-day-card">
              <div className="calendar-day-header">{day}</div>
              <div className="calendar-day-tasks">
                {idx === 0 && <div className="task-item urgent">KZN-001: Generator</div>}
                {idx === 1 && <div className="task-item warning">WC-001: Cooling</div>}
                {idx === 3 && <div className="task-item normal">GT-002: Battery</div>}
                {idx === 5 && <div className="task-item normal">MP-001: Rectifier</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PredictiveDashboard;