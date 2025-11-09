import React, { useState, useEffect } from 'react';
import { 
  Activity, Zap, Shield, Users, TrendingUp, TrendingDown,
  AlertCircle, CheckCircle, Wifi, Sun, Clock, Server,
  BarChart3, PieChart, LineChart as LineChartIcon, Network, FileText
} from 'lucide-react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPie, Pie,
  Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const TELKOM_COLORS = {
  primary: '#00C1DE',
  secondary: '#0077C8',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  teal: '#00838F',
  light: '#5CE1E6'
};

const OriginalOverview = () => {
  const automationMetrics = {
    manualInterventionsEliminated: 87,
    spreadsheetTasksAutomated: 94,
    timeSavedHours: 2840,
    manualInterventionsThisMonth: 23,
    automatedResolutionsThisMonth: 187,
    avgResolutionTimeReduction: 76
  };

  const networkTrafficData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    traffic: 8 + Math.random() * 8,
    users: 100000 + Math.random() * 80000
  }));

  const latencyData = Array.from({ length: 12 }, (_, i) => ({
    time: `${i * 2}:00`,
    latency: 0.5 + Math.random() * 0.8,
    target: 1.0
  }));

  const energyData = [
    { source: 'Solar', morning: 45, afternoon: 65, evening: 20 },
    { source: 'Grid', morning: 35, afternoon: 20, evening: 55 },
    { source: 'Battery', morning: 20, afternoon: 15, evening: 25 }
  ];

  const incidentData = [
    { name: 'Automated', value: 90, color: TELKOM_COLORS.success },
    { name: 'Manual', value: 10, color: TELKOM_COLORS.warning }
  ];

  const siteStatusData = [
    { name: 'Optimal', value: 340, color: TELKOM_COLORS.success },
    { name: 'Warning', value: 35, color: TELKOM_COLORS.warning },
    { name: 'Critical', value: 5, color: TELKOM_COLORS.danger },
    { name: 'Maintenance', value: 20, color: TELKOM_COLORS.secondary }
  ];

  const recentAlerts = [
    { type: 'success', message: 'Auto-healing: Gauteng Site 234 restored in 45s', time: '2 min ago' },
    { type: 'success', message: 'AI blocked DDoS attack - 2.3M requests/sec', time: '5 min ago' },
    { type: 'warning', message: 'High traffic: Western Cape cluster at 85% capacity', time: '8 min ago' },
    { type: 'success', message: 'Solar optimization: Site 112 - 48% energy savings', time: '12 min ago' },
    { type: 'success', message: 'Network optimization: Latency reduced by 15%', time: '15 min ago' },
    { type: 'success', message: 'Predictive maintenance prevented failure - Site 089', time: '18 min ago' }
  ];

  const AlertCard = ({ type, message, time }) => {
    const config = {
      success: { icon: CheckCircle, color: TELKOM_COLORS.success },
      warning: { icon: AlertCircle, color: TELKOM_COLORS.warning },
      error: { icon: AlertCircle, color: TELKOM_COLORS.danger }
    };
    const { icon: Icon, color } = config[type];

    return (
      <div className={`alert-card alert-${type}`} style={{ borderLeftColor: color }}>
        <div className="alert-icon" style={{ color }}>
          <Icon size={20} />
        </div>
        <div className="alert-content">
          <div className="alert-message">{message}</div>
          <div className="alert-time">{time}</div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Automation Metrics Section */}
      <section className="automation-metrics-section">
        <div className="section-header">
          <h3 className="section-title">
            <Zap size={24} color={TELKOM_COLORS.primary} />
            Zero Touch Network - Automation Impact
          </h3>
        </div>
        <div className="automation-grid">
          <div className="automation-card">
            <div className="automation-icon" style={{ background: `${TELKOM_COLORS.success}20`, color: TELKOM_COLORS.success }}>
              <CheckCircle size={32} />
            </div>
            <div className="automation-value">{automationMetrics.manualInterventionsEliminated}%</div>
            <div className="automation-label">Manual Interventions Eliminated</div>
            <div className="automation-subtitle">vs. Traditional Operations</div>
          </div>
          <div className="automation-card">
            <div className="automation-icon" style={{ background: `${TELKOM_COLORS.primary}20`, color: TELKOM_COLORS.primary }}>
              <FileText size={32} />
            </div>
            <div className="automation-value">{automationMetrics.spreadsheetTasksAutomated}%</div>
            <div className="automation-label">Spreadsheet Operations Automated</div>
            <div className="automation-subtitle">Real-time data processing</div>
          </div>
          <div className="automation-card">
            <div className="automation-icon" style={{ background: `${TELKOM_COLORS.warning}20`, color: TELKOM_COLORS.warning }}>
              <Clock size={32} />
            </div>
            <div className="automation-value">{automationMetrics.timeSavedHours.toLocaleString()}</div>
            <div className="automation-label">Hours Saved This Year</div>
            <div className="automation-subtitle">Through AI automation</div>
          </div>
          <div className="automation-card">
            <div className="automation-icon" style={{ background: `${TELKOM_COLORS.secondary}20`, color: TELKOM_COLORS.secondary }}>
              <TrendingDown size={32} />
            </div>
            <div className="automation-value">{automationMetrics.avgResolutionTimeReduction}%</div>
            <div className="automation-label">Faster Resolution Time</div>
            <div className="automation-subtitle">AI vs Manual average</div>
          </div>
        </div>
        <div className="automation-comparison">
          <div className="comparison-item">
            <span className="comparison-label">Manual Interventions (This Month)</span>
            <span className="comparison-value" style={{ color: TELKOM_COLORS.danger }}>{automationMetrics.manualInterventionsThisMonth}</span>
          </div>
          <div className="comparison-item">
            <span className="comparison-label">Automated Resolutions (This Month)</span>
            <span className="comparison-value" style={{ color: TELKOM_COLORS.success }}>{automationMetrics.automatedResolutionsThisMonth}</span>
          </div>
          <div className="comparison-item">
            <span className="comparison-label">Automation Ratio</span>
            <span className="comparison-value" style={{ color: TELKOM_COLORS.primary }}>
              {(automationMetrics.automatedResolutionsThisMonth / (automationMetrics.automatedResolutionsThisMonth + automationMetrics.manualInterventionsThisMonth) * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </section>

      <section className="charts-grid">
        <div className="chart-card large">
          <div className="chart-header">
            <div className="chart-title">
              <LineChartIcon size={20} color={TELKOM_COLORS.primary} />
              <h3>Network Traffic - Last 24 Hours</h3>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={networkTrafficData}>
              <defs>
                <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={TELKOM_COLORS.primary} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={TELKOM_COLORS.primary} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 193, 222, 0.1)" />
              <XAxis dataKey="time" stroke={TELKOM_COLORS.light} />
              <YAxis stroke={TELKOM_COLORS.light} />
              <Tooltip contentStyle={{ background: 'rgba(15, 20, 25, 0.95)', border: `1px solid ${TELKOM_COLORS.primary}`, borderRadius: '8px' }} />
              <Area type="monotone" dataKey="traffic" stroke={TELKOM_COLORS.primary} strokeWidth={2} fill="url(#trafficGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <div className="chart-title">
              <Activity size={20} color={TELKOM_COLORS.success} />
              <h3>Edge Latency Performance</h3>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={latencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 193, 222, 0.1)" />
              <XAxis dataKey="time" stroke={TELKOM_COLORS.light} />
              <YAxis stroke={TELKOM_COLORS.light} />
              <Tooltip contentStyle={{ background: 'rgba(15, 20, 25, 0.95)', border: `1px solid ${TELKOM_COLORS.success}`, borderRadius: '8px' }} />
              <Line type="monotone" dataKey="latency" stroke={TELKOM_COLORS.success} strokeWidth={3} dot={{ fill: TELKOM_COLORS.success, r: 4 }} />
              <Line type="monotone" dataKey="target" stroke={TELKOM_COLORS.warning} strokeWidth={2} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <div className="chart-title">
              <Sun size={20} color={TELKOM_COLORS.warning} />
              <h3>Energy Sources Distribution</h3>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={energyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 193, 222, 0.1)" />
              <XAxis dataKey="source" stroke={TELKOM_COLORS.light} />
              <YAxis stroke={TELKOM_COLORS.light} />
              <Tooltip contentStyle={{ background: 'rgba(15, 20, 25, 0.95)', border: `1px solid ${TELKOM_COLORS.warning}`, borderRadius: '8px' }} />
              <Bar dataKey="morning" fill={TELKOM_COLORS.primary} radius={[8, 8, 0, 0]} />
              <Bar dataKey="afternoon" fill={TELKOM_COLORS.warning} radius={[8, 8, 0, 0]} />
              <Bar dataKey="evening" fill={TELKOM_COLORS.secondary} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card small">
          <div className="chart-header">
            <div className="chart-title">
              <PieChart size={20} color={TELKOM_COLORS.primary} />
              <h3>Incident Resolution</h3>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <RechartsPie>
              <Pie data={incidentData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
                {incidentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPie>
          </ResponsiveContainer>
          <div className="chart-footer">
            <div className="metric-highlight">
              <span className="metric-value" style={{ color: TELKOM_COLORS.success }}>90%</span>
              <span className="metric-label">Automated</span>
            </div>
          </div>
        </div>

        <div className="chart-card small">
          <div className="chart-header">
            <div className="chart-title">
              <Network size={20} color={TELKOM_COLORS.secondary} />
              <h3>Site Status</h3>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <RechartsPie>
              <Pie data={siteStatusData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value" label>
                {siteStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPie>
          </ResponsiveContainer>
        </div>

        <div className="chart-card activity-feed">
          <div className="chart-header">
            <div className="chart-title">
              <Activity size={20} color={TELKOM_COLORS.primary} />
              <h3>Recent AI-Powered Activity</h3>
            </div>
          </div>
          <div className="activity-list">
            {recentAlerts.map((alert, index) => (
              <AlertCard key={index} {...alert} />
            ))}
          </div>
        </div>
      </section>

      <section className="footer-stats">
        <div className="stat-item">
          <span className="stat-label">Total Data Processed</span>
          <span className="stat-value" style={{ color: TELKOM_COLORS.primary }}>2.4 PB</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Downtime Reduction</span>
          <span className="stat-value" style={{ color: TELKOM_COLORS.success }}>80%</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Energy Savings</span>
          <span className="stat-value" style={{ color: TELKOM_COLORS.warning }}>42%</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Threat Detection Accuracy</span>
          <span className="stat-value" style={{ color: TELKOM_COLORS.teal }}>98.6%</span>
        </div>
      </section>
    </>
  );
};

export default OriginalOverview;