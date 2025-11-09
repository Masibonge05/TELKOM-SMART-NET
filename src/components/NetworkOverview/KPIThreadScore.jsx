import React, { useState, useEffect } from 'react';
import { TrendingUp, AlertTriangle, CheckCircle, Activity } from 'lucide-react';
import './KPIThreadScore.css';

const TELKOM_COLORS = {
  primary: '#00C1DE',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444'
};

const KPIThreadScore = () => {
  const [threadScore, setThreadScore] = useState(92);

  useEffect(() => {
    const interval = setInterval(() => {
      setThreadScore(prev => {
        const change = (Math.random() - 0.5) * 2;
        return Math.max(85, Math.min(100, prev + change));
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getScoreColor = (score) => {
    if (score >= 90) return TELKOM_COLORS.success;
    if (score >= 75) return TELKOM_COLORS.warning;
    return TELKOM_COLORS.danger;
  };

  const getScoreStatus = (score) => {
    if (score >= 90) return { icon: CheckCircle, text: 'Excellent', color: TELKOM_COLORS.success };
    if (score >= 75) return { icon: AlertTriangle, text: 'Good', color: TELKOM_COLORS.warning };
    return { icon: AlertTriangle, text: 'Needs Attention', color: TELKOM_COLORS.danger };
  };

  const status = getScoreStatus(threadScore);
  const StatusIcon = status.icon;

  const kpis = [
    { label: 'Network Health', value: 96, target: 95, status: 'excellent' },
    { label: 'Revenue Protection', value: 98, target: 95, status: 'excellent' },
    { label: 'Customer Satisfaction', value: 87, target: 90, status: 'warning' },
    { label: 'Security Posture', value: 94, target: 90, status: 'excellent' },
    { label: 'Energy Efficiency', value: 89, target: 85, status: 'excellent' },
    { label: 'AI Automation', value: 90, target: 85, status: 'excellent' }
  ];

  return (
    <div className="kpi-thread-score-panel">
      <div className="thread-score-main">
        <div className="score-circle-container">
          <svg className="score-circle" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="#1a1f2e"
              strokeWidth="20"
            />
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke={getScoreColor(threadScore)}
              strokeWidth="20"
              strokeDasharray={`${(threadScore / 100) * 565.48} 565.48`}
              strokeLinecap="round"
              transform="rotate(-90 100 100)"
              className="score-progress"
            />
          </svg>
          <div className="score-value">
            <span className="score-number" style={{ color: getScoreColor(threadScore) }}>
              {threadScore.toFixed(1)}
            </span>
            <span className="score-label">Network Health Score</span>
          </div>
        </div>

        <div className="score-status">
          <StatusIcon size={24} style={{ color: status.color }} />
          <span style={{ color: status.color }}>{status.text}</span>
        </div>
      </div>

      <div className="kpi-grid">
        {kpis.map((kpi, index) => (
          <div key={index} className="kpi-item">
            <div className="kpi-header">
              <span className="kpi-label">{kpi.label}</span>
              <span 
                className="kpi-value" 
                style={{ color: kpi.value >= kpi.target ? TELKOM_COLORS.success : TELKOM_COLORS.warning }}
              >
                {kpi.value}%
              </span>
            </div>
            <div className="kpi-bar">
              <div 
                className="kpi-progress"
                style={{ 
                  width: `${kpi.value}%`,
                  background: kpi.value >= kpi.target ? TELKOM_COLORS.success : TELKOM_COLORS.warning
                }}
              />
            </div>
            <div className="kpi-target">Target: {kpi.target}%</div>
          </div>
        ))}
      </div>

      <div className="thread-insights">
        <Activity size={18} style={{ color: TELKOM_COLORS.primary }} />
        <span>Real-time analysis • Updated every 5 seconds • AI-powered scoring</span>
      </div>
    </div>
  );
};

export default KPIThreadScore;