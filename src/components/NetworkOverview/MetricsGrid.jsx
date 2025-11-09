import React, { useState, useEffect } from 'react';
import { Server, Activity, Zap, Shield, Wifi, Sun, BarChart3, Users, TrendingUp, TrendingDown } from 'lucide-react';
import './MetricsGrid.css';

const TELKOM_COLORS = {
  primary: '#00C1DE',
  secondary: '#0077C8',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  teal: '#00838F'
};

const MetricsGrid = ({ onMetricClick }) => {
  const [realtimeData, setRealtimeData] = useState({
    traffic: 12.4,
    users: 156000,
    threats: 3,
    latency: 0.8
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeData(prev => ({
        traffic: (parseFloat(prev.traffic) + (Math.random() - 0.5) * 0.5).toFixed(1),
        users: prev.users + Math.floor(Math.random() * 100 - 50),
        threats: prev.threats + (Math.random() > 0.9 ? 1 : 0),
        latency: (parseFloat(prev.latency) + (Math.random() - 0.5) * 0.1).toFixed(2)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const metrics = [
    {
      id: 'sites',
      icon: Server,
      title: 'Active Sites',
      value: '380',
      unit: '',
      subtitle: 'of 400 total',
      trend: 2.5,
      color: TELKOM_COLORS.primary,
      drillDownData: {
        optimal: 340,
        warning: 35,
        critical: 5,
        maintenance: 20
      }
    },
    {
      id: 'traffic',
      icon: Activity,
      title: 'Network Traffic',
      value: realtimeData.traffic,
      unit: 'TB/s',
      subtitle: 'Real-time',
      trend: 5.2,
      color: TELKOM_COLORS.secondary,
      drillDownData: {
        peak: '15.2 TB/s',
        average: '12.1 TB/s',
        lowest: '8.3 TB/s'
      }
    },
    {
      id: 'latency',
      icon: Zap,
      title: 'Avg Latency',
      value: realtimeData.latency,
      unit: 'ms',
      subtitle: 'Target: <1ms',
      trend: -12,
      color: TELKOM_COLORS.success,
      drillDownData: {
        healthcare: '0.8 ms',
        education: '15 ms',
        transport: '0.9 ms',
        entertainment: '35 ms'
      }
    },
    {
      id: 'threats',
      icon: Shield,
      title: 'Threats Blocked',
      value: realtimeData.threats,
      unit: '/hr',
      subtitle: '98.6% accuracy',
      trend: null,
      color: TELKOM_COLORS.teal,
      drillDownData: {
        ddos: 45,
        malware: 12,
        intrusion: 8,
        phishing: 23
      }
    },
    {
      id: 'uptime',
      icon: Wifi,
      title: 'Network Uptime',
      value: '99.8',
      unit: '%',
      subtitle: 'Last 30 days',
      trend: null,
      color: TELKOM_COLORS.success,
      drillDownData: {
        planned: '0.1%',
        unplanned: '0.1%',
        target: '99.9%'
      }
    },
    {
      id: 'energy',
      icon: Sun,
      title: 'Energy Efficiency',
      value: '42',
      unit: '%',
      subtitle: 'vs 40% target',
      trend: 8,
      color: TELKOM_COLORS.warning,
      drillDownData: {
        solar: '48%',
        grid: '32%',
        battery: '20%'
      }
    },
    {
      id: 'ai',
      icon: BarChart3,
      title: 'AI Resolution Rate',
      value: '90',
      unit: '%',
      subtitle: 'Automated fixes',
      trend: null,
      color: TELKOM_COLORS.primary,
      drillDownData: {
        automated: 187,
        manual: 23,
        prevented: 45
      }
    },
    {
      id: 'users',
      icon: Users,
      title: 'Active Users',
      value: (realtimeData.users / 1000).toFixed(0),
      unit: 'K',
      subtitle: 'Real-time',
      trend: 3.1,
      color: TELKOM_COLORS.secondary,
      drillDownData: {
        mobile: '120K',
        fixed: '36K',
        enterprise: '8K'
      }
    }
  ];

  const StatCard = ({ metric }) => {
    const Icon = metric.icon;
    
    return (
      <div 
        className="stat-card clickable" 
        style={{ borderTopColor: metric.color }}
        onClick={() => onMetricClick(metric)}
      >
        <div className="stat-icon" style={{ background: `${metric.color}15`, color: metric.color }}>
          <Icon size={24} />
        </div>
        <div className="stat-info">
          <div className="stat-title">{metric.title}</div>
          <div className="stat-value" style={{ color: metric.color }}>
            {metric.value}
            {metric.unit && <span className="stat-unit">{metric.unit}</span>}
          </div>
          {metric.subtitle && <div className="stat-subtitle">{metric.subtitle}</div>}
          {metric.trend && (
            <div className={`stat-trend ${metric.trend > 0 ? 'positive' : 'negative'}`}>
              {metric.trend > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span>{Math.abs(metric.trend)}%</span>
            </div>
          )}
        </div>
        <div className="stat-click-hint">Click for details</div>
      </div>
    );
  };

  return (
    <section className="metrics-grid">
      {metrics.map(metric => (
        <StatCard key={metric.id} metric={metric} />
      ))}
    </section>
  );
};

export default MetricsGrid;