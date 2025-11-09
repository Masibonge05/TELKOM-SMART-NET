import React, { useState, useEffect } from 'react';
import { Brain, Zap, TrendingUp, AlertTriangle, DollarSign, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import './RecommendationsPanel.css';

const TELKOM_COLORS = {
  primary: '#00C1DE',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  secondary: '#0077C8'
};

const RecommendationsPanel = ({ onClose, fullScreen = false }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const topRecommendations = [
    {
      id: 'REC-001',
      priority: 'CRITICAL',
      category: 'Predictive Maintenance',
      icon: Zap,
      title: 'Generator Failure Imminent - Durban North',
      description: 'AI predicts 94% probability of fuel pump failure in 4 hours at KZN-001. Immediate dispatch required.',
      impact: {
        revenue: 'R2.3M at risk',
        users: '2,340 users affected',
        downtime: '6-8 hours potential'
      },
      action: 'Dispatch Field Team Alpha NOW',
      actionUrl: '/predictive',
      roi: '5,011%',
      confidence: 94,
      timeWindow: '4 hours',
      color: TELKOM_COLORS.danger
    },
    {
      id: 'REC-002',
      priority: 'HIGH',
      category: 'Customer Retention',
      icon: TrendingUp,
      title: 'Launch Retention Campaign - 234 High-Value At-Risk Customers',
      description: 'Enterprise customers with churn risk >85%. Total monthly value: R12.4M. Launch personalized offers immediately.',
      impact: {
        revenue: 'R12.4M monthly revenue',
        customers: '234 enterprise customers',
        success: '67% campaign success rate'
      },
      action: 'Launch Automated Campaign',
      actionUrl: '/churn',
      roi: '890%',
      confidence: 89,
      timeWindow: '48 hours',
      color: TELKOM_COLORS.warning
    },
    {
      id: 'REC-003',
      priority: 'HIGH',
      category: 'Revenue Assurance',
      icon: DollarSign,
      title: 'Billing Leakage Detected - R2.4M Uncaptured Revenue',
      description: 'Roaming charges not captured for 1,240 accounts. AI auto-fix available - recover R2.1M immediately.',
      impact: {
        revenue: 'R2.4M leakage',
        recovery: 'R2.1M recoverable',
        accounts: '1,240 accounts'
      },
      action: 'Activate AI Auto-Fix',
      actionUrl: '/revenue',
      roi: '4,567%',
      confidence: 96,
      timeWindow: '24 hours',
      color: TELKOM_COLORS.primary
    }
  ];

  const quickWins = [
    {
      id: 'QW-001',
      title: 'Switch 12 Sites to Solar (10AM-2PM)',
      savings: 'R8,400',
      timeframe: 'Today',
      effort: 'Automated',
      icon: CheckCircle,
      color: TELKOM_COLORS.success
    },
    {
      id: 'QW-002',
      title: 'Auto-Scale Education Slice for Exams',
      impact: '100% exam success rate',
      timeframe: 'Next 2 hours',
      effort: 'One-click',
      icon: Zap,
      color: TELKOM_COLORS.primary
    },
    {
      id: 'QW-003',
      title: 'Deploy Security Patrol to GT-045',
      prevention: 'R450K loss prevented',
      timeframe: 'Within 1 hour',
      effort: 'Single dispatch',
      icon: AlertTriangle,
      color: TELKOM_COLORS.warning
    }
  ];

  const aiInsights = [
    {
      category: 'Network Optimization',
      insight: 'Traffic patterns show 15% capacity available on GT-002. Recommend rerouting 890 users from overloaded WC-001.',
      action: 'Auto-balance load',
      impact: '↑ 22% performance improvement'
    },
    {
      category: 'Cost Optimization',
      insight: 'Peak energy usage at 18 sites occurs during grid peak pricing. Switch to battery 6PM-8PM saves R45K daily.',
      action: 'Schedule battery usage',
      impact: '↓ R1.35M monthly savings'
    },
    {
      category: 'Customer Experience',
      insight: '892 customers influenced by churned connections (social network analysis). High risk of cascade churn.',
      action: 'Launch influence campaign',
      impact: '↑ R2.1M revenue protected'
    }
  ];

  const performanceScore = {
    current: 92.4,
    potential: 97.8,
    gap: 5.4,
    improvementValue: 'R23.4M annually'
  };

  return (
    <div className={`recommendations-panel ${fullScreen ? 'fullscreen' : 'collapsible'}`}>
      {!fullScreen && (
        <button className="panel-close-btn" onClick={onClose}>×</button>
      )}
      
      {/* Header */}
      <div className="recommendations-header">
        <div className="recommendations-title">
          <Brain size={32} style={{ color: TELKOM_COLORS.primary }} />
          <div>
            <h2>AI Intelligence Hub</h2>
            <p>Real-time recommendations • Predictive insights • Automated actions</p>
          </div>
        </div>
        <div className="last-updated">
          <Clock size={16} />
          <span>Updated: {currentTime.toLocaleTimeString('en-ZA')}</span>
        </div>
      </div>

      {/* Performance Potential */}
      <div className="performance-potential-card">
        <h3>🎯 Network Performance Potential</h3>
        <div className="potential-grid">
          <div className="potential-item">
            <div className="potential-label">Current Score</div>
            <div className="potential-value" style={{ color: TELKOM_COLORS.warning }}>
              {performanceScore.current}%
            </div>
          </div>
          <ArrowRight size={32} style={{ color: TELKOM_COLORS.primary }} />
          <div className="potential-item">
            <div className="potential-label">AI-Optimized Potential</div>
            <div className="potential-value" style={{ color: TELKOM_COLORS.success }}>
              {performanceScore.potential}%
            </div>
          </div>
        </div>
        <div className="potential-gap">
          <span>Performance Gap: </span>
          <strong style={{ color: TELKOM_COLORS.danger }}>{performanceScore.gap}%</strong>
          <span> • Unlock </span>
          <strong style={{ color: TELKOM_COLORS.success }}>{performanceScore.improvementValue}</strong>
          <span> annual value</span>
        </div>
        <button className="unlock-potential-btn">
          <Zap size={16} />
          Activate All AI Recommendations
        </button>
      </div>

      {/* Top Recommendations */}
      <div className="top-recommendations-section">
        <h3>
          <AlertTriangle size={24} style={{ color: TELKOM_COLORS.danger }} />
          Today's Top 3 AI Recommendations
        </h3>
        <div className="recommendations-grid">
          {topRecommendations.map((rec, index) => {
            const Icon = rec.icon;
            return (
              <div 
                key={rec.id} 
                className="recommendation-card-main"
                style={{ borderLeftColor: rec.color }}
              >
                <div className="rec-priority-badge" style={{ background: rec.color }}>
                  {index + 1}. {rec.priority}
                </div>
                
                <div className="rec-header-main">
                  <Icon size={28} style={{ color: rec.color }} />
                  <div>
                    <div className="rec-category">{rec.category}</div>
                    <h4 className="rec-title">{rec.title}</h4>
                  </div>
                </div>

                <p className="rec-description">{rec.description}</p>

                <div className="rec-impact-grid">
                  {Object.entries(rec.impact).map(([key, value]) => (
                    <div key={key} className="rec-impact-item">
                      <span className="impact-key">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                      <span className="impact-value">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="rec-metrics-row">
                  <div className="rec-metric">
                    <span className="metric-label">ROI:</span>
                    <span className="metric-value" style={{ color: TELKOM_COLORS.success }}>
                      {rec.roi}
                    </span>
                  </div>
                  <div className="rec-metric">
                    <span className="metric-label">Confidence:</span>
                    <span className="metric-value">{rec.confidence}%</span>
                  </div>
                  <div className="rec-metric">
                    <span className="metric-label">Act Within:</span>
                    <span className="metric-value urgent">{rec.timeWindow}</span>
                  </div>
                </div>

                <button 
                  className="rec-action-btn"
                  style={{ background: rec.color }}
                  onClick={() => window.location.href = rec.actionUrl}
                >
                  {rec.action}
                  <ArrowRight size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Wins */}
      <div className="quick-wins-section">
        <h3>
          <Zap size={24} style={{ color: TELKOM_COLORS.primary }} />
          Quick Wins - Immediate Actions
        </h3>
        <div className="quick-wins-grid">
          {quickWins.map(win => {
            const Icon = win.icon;
            return (
              <div key={win.id} className="quick-win-card">
                <div className="quick-win-icon" style={{ background: `${win.color}20`, color: win.color }}>
                  <Icon size={24} />
                </div>
                <div className="quick-win-content">
                  <h4>{win.title}</h4>
                  <div className="quick-win-details">
                    {win.savings && (
                      <div className="win-detail">
                        <strong>Savings:</strong> <span style={{ color: TELKOM_COLORS.success }}>{win.savings}</span>
                      </div>
                    )}
                    {win.impact && (
                      <div className="win-detail">
                        <strong>Impact:</strong> <span>{win.impact}</span>
                      </div>
                    )}
                    {win.prevention && (
                      <div className="win-detail">
                        <strong>Prevention:</strong> <span style={{ color: TELKOM_COLORS.success }}>{win.prevention}</span>
                      </div>
                    )}
                    <div className="win-detail">
                      <strong>Timeframe:</strong> <span>{win.timeframe}</span>
                    </div>
                    <div className="win-detail">
                      <strong>Effort:</strong> <span>{win.effort}</span>
                    </div>
                  </div>
                </div>
                <button className="quick-win-btn" style={{ borderColor: win.color, color: win.color }}>
                  Execute
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Insights */}
      <div className="ai-insights-section">
        <h3>
          <Brain size={24} style={{ color: TELKOM_COLORS.primary }} />
          AI-Powered Insights
        </h3>
        <div className="insights-list">
          {aiInsights.map((insight, idx) => (
            <div key={idx} className="insight-card-ai">
              <div className="insight-category-badge">{insight.category}</div>
              <p className="insight-text">{insight.insight}</p>
              <div className="insight-footer">
                <button className="insight-action-btn">
                  <CheckCircle size={14} />
                  {insight.action}
                </button>
                <div className="insight-impact" style={{ color: TELKOM_COLORS.success }}>
                  {insight.impact}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Learning Status */}
      <div className="ai-learning-status">
        <div className="learning-indicator">
          <div className="learning-pulse"></div>
          <span>AI Model Learning Active</span>
        </div>
        <div className="learning-stats">
          <span>2.4M data points processed today • </span>
          <span>187 patterns identified • </span>
          <span>Model accuracy: 93.2%</span>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsPanel;