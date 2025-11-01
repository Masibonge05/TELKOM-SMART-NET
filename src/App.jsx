import React, { useState, useEffect } from 'react';
import logo from './assets/smart_net.png';

import { 
  Activity, Radio, Zap, Shield, Users, TrendingUp, TrendingDown,
  AlertCircle, CheckCircle, Wifi, Battery, Sun, Clock, Server,
  BarChart3, PieChart, LineChart as LineChartIcon, Network,
  Layers, Heart, GraduationCap, Car, Film, ArrowRight, AlertTriangle
} from 'lucide-react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPie, Pie,
  Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import './App.css';

// Telkom Brand Colors
const TELKOM_COLORS = {
  primary: '#00C1DE',
  secondary: '#0077C8',
  dark: '#003E7E',
  navy: '#001E50',
  light: '#5CE1E6',
  teal: '#00838F',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444'
};

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' or 'industry'
  const [realtimeData, setRealtimeData] = useState({
    traffic: 12.4,
    users: 156000,
    threats: 3,
    latency: 0.8
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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

  // Industry Slicing Data
  const industrySlices = [
    {
      id: 'healthcare',
      name: 'Healthcare Network',
      icon: Heart,
      description: 'Mission-Critical Medical Services',
      priority: 'CRITICAL',
      priorityColor: TELKOM_COLORS.danger,
      metrics: {
        latency: { value: '0.8', unit: 'ms', target: '<5ms', status: 'excellent' },
        uptime: { value: '99.999', unit: '%', target: 'Five nines', status: 'excellent' },
        devices: { value: '8,234', label: 'Medical IoT', status: 'good' },
        emergency: { value: '12', label: 'Ambulances', status: 'active' }
      },
      capacity: { used: 85, total: 100, allocated: '1.5 Tbps' },
      activeServices: '45 telemedicine sessions • 3 remote surgeries • 1,240 patient monitors • 8 emergency transports'
    },
    {
      id: 'education',
      name: 'Education Network',
      icon: GraduationCap,
      description: 'Digital Learning & Remote Education',
      priority: 'HIGH',
      priorityColor: TELKOM_COLORS.warning,
      metrics: {
        latency: { value: '15', unit: 'ms', target: '<20ms', status: 'good' },
        institutions: { value: '1,240', label: 'Schools/Universities', status: 'good' },
        students: { value: '45,623', label: 'Online now', status: 'good' },
        classes: { value: '234', label: 'In session', status: 'active' }
      },
      capacity: { used: 62, total: 100, allocated: '1.5 Tbps' },
      activeServices: 'Peak Hours: 7AM-3PM & 6PM-9PM • Free data: Educational platforms • Rural reach: 890 remote schools'
    },
    {
      id: 'transport',
      name: 'Transport & Smart Mobility',
      icon: Car,
      description: 'Connected Vehicles & Emergency Services',
      priority: 'SAFETY CRITICAL',
      priorityColor: TELKOM_COLORS.danger,
      metrics: {
        latency: { value: '0.9', unit: 'ms', target: '<1ms', status: 'warning' },
        vehicles: { value: '8,456', label: 'Active', status: 'good' },
        autonomous: { value: '145', label: 'Self-driving', status: 'good' },
        emergency: { value: '3', label: 'Priority active', status: 'active' }
      },
      capacity: { used: 89, total: 100, allocated: '1.25 Tbps' },
      activeServices: 'V2V Communications: 12,450/sec • Smart intersections: 234 • Emergency response: <1 sec • Zero safety incidents'
    },
    {
      id: 'entertainment',
      name: 'Entertainment & Media',
      icon: Film,
      description: 'Streaming, Gaming & Social Media',
      priority: 'STANDARD',
      priorityColor: TELKOM_COLORS.primary,
      metrics: {
        latency: { value: '35', unit: 'ms', target: '<50ms', status: 'good' },
        streams: { value: '156,234', label: 'Video/Music', status: 'good' },
        gaming: { value: '23,456', label: 'Online players', status: 'good' },
        quality: { value: '1080p', label: 'HD streaming', status: 'excellent' }
      },
      capacity: { used: 94, total: 100, allocated: '3.1 Tbps' },
      activeServices: 'Peak: 6PM-11PM • Content cached: 2.3 TB locally • Can throttle to 720p if critical services need bandwidth'
    }
  ];

  const industrySLAData = [
    { industry: 'Healthcare', latency: '0.8 ms', target: '<5 ms', uptime: '99.999%', status: 'excellent' },
    { industry: 'Education', latency: '15 ms', target: '<20 ms', uptime: '99.95%', status: 'good' },
    { industry: 'Transport', latency: '0.9 ms', target: '<1 ms', uptime: '99.99%', status: 'warning' },
    { industry: 'Entertainment', latency: '35 ms', target: '<50 ms', uptime: '99.8%', status: 'good' }
  ];

  const industryAlerts = [
    { 
      type: 'critical', 
      icon: '🚑',
      message: 'Emergency Priority Activated: Healthcare slice expanded to 25% capacity - 3 ambulances dispatched to N1 accident scene with guaranteed 10 Mbps each', 
      time: '2 minutes ago',
      note: 'Entertainment throttled to 720p temporarily'
    },
    { 
      type: 'success', 
      icon: '✅',
      message: 'Exam Mode Enabled: Education slice boosted to 18% - 45 schools conducting online examinations with zero-rated data', 
      time: '8 minutes ago',
      note: '100% success rate maintained'
    },
    { 
      type: 'warning', 
      icon: '⚠️',
      message: 'Transport Capacity Alert: N1 Highway traffic surge detected - AI rerouting vehicles, expanded transport slice to 15%', 
      time: '12 minutes ago',
      note: '145 vehicles rerouted successfully'
    },
    { 
      type: 'success', 
      icon: '🎮',
      message: 'Entertainment Optimization: Stadium event (Orlando Pirates match) - AI pre-cached content, scaled capacity for 25,000 concurrent users', 
      time: '15 minutes ago',
      note: 'Zero buffering reported'
    },
    { 
      type: 'success', 
      icon: '💚',
      message: 'Green Energy Optimization: Education slice powered by 78% solar during school hours - R12,400 energy cost saved today', 
      time: '22 minutes ago',
      note: 'Carbon emissions reduced by 340kg'
    }
  ];

  const StatCard = ({ icon: Icon, title, value, unit, subtitle, trend, color }) => (
    <div className="stat-card" style={{ borderTopColor: color }}>
      <div className="stat-icon" style={{ background: `${color}15`, color }}>
        <Icon size={24} />
      </div>
      <div className="stat-info">
        <div className="stat-title">{title}</div>
        <div className="stat-value" style={{ color }}>
          {value}
          {unit && <span className="stat-unit">{unit}</span>}
        </div>
        {subtitle && <div className="stat-subtitle">{subtitle}</div>}
        {trend && (
          <div className={`stat-trend ${trend > 0 ? 'positive' : 'negative'}`}>
            {trend > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
    </div>
  );

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

  const IndustrySliceCard = ({ slice }) => {
    const Icon = slice.icon;
    const capacityColor = slice.capacity.used >= 90 ? TELKOM_COLORS.danger : 
                          slice.capacity.used >= 75 ? TELKOM_COLORS.warning : 
                          TELKOM_COLORS.success;

    return (
      <div className="industry-slice-card" style={{ borderLeftColor: slice.priorityColor }}>
        <div className="slice-header">
          <div className="slice-title-section">
            <div className="slice-icon-wrapper" style={{ background: `${slice.priorityColor}15`, color: slice.priorityColor }}>
              <Icon size={32} />
            </div>
            <div>
              <h3 className="slice-name">{slice.name}</h3>
              <p className="slice-description">{slice.description}</p>
            </div>
          </div>
          <div className="priority-badge" style={{ background: slice.priorityColor }}>
            {slice.priority}
          </div>
        </div>

        <div className="slice-metrics-grid">
          {Object.entries(slice.metrics).map(([key, metric]) => (
            <div key={key} className="slice-metric-card">
              <div className="metric-label">{key.charAt(0).toUpperCase() + key.slice(1)}</div>
              <div className="metric-value-large" style={{ color: TELKOM_COLORS.primary }}>
                {metric.value}
                {metric.unit && <span className="metric-unit">{metric.unit}</span>}
              </div>
              <div className="metric-subtitle">{metric.target || metric.label}</div>
            </div>
          ))}
        </div>

        <div className="capacity-section">
          <div className="capacity-header">
            <span>Capacity Usage</span>
            <span style={{ color: capacityColor, fontWeight: 'bold' }}>
              {slice.capacity.used}% of {slice.capacity.allocated}
              {slice.capacity.used >= 90 && ' ⚠ Near Limit'}
            </span>
          </div>
          <div className="capacity-bar">
            <div 
              className="capacity-fill" 
              style={{ 
                width: `${slice.capacity.used}%`,
                background: `linear-gradient(90deg, ${capacityColor}, ${capacityColor}dd)`
              }}
            />
          </div>
        </div>

        <div className="slice-services">
          <div className="services-label">Active Services</div>
          <div className="services-text">{slice.activeServices}</div>
        </div>
      </div>
    );
  };

  const IndustryAlertCard = ({ alert }) => {
    const typeColors = {
      critical: TELKOM_COLORS.danger,
      warning: TELKOM_COLORS.warning,
      success: TELKOM_COLORS.success
    };

    return (
      <div className="industry-alert-card" style={{ borderLeftColor: typeColors[alert.type] }}>
        <div className="alert-emoji">{alert.icon}</div>
        <div className="alert-content-full">
          <div className="alert-message-main">{alert.message}</div>
          <div className="alert-meta">
            <span className="alert-time-stamp">{alert.time}</span>
            {alert.note && <span className="alert-note">• {alert.note}</span>}
          </div>
        </div>
      </div>
    );
  };

  const recentAlerts = [
    { type: 'success', message: 'Auto-healing: Gauteng Site 234 restored in 45s', time: '2 min ago' },
    { type: 'success', message: 'AI blocked DDoS attack - 2.3M requests/sec', time: '5 min ago' },
    { type: 'warning', message: 'High traffic: Western Cape cluster at 85% capacity', time: '8 min ago' },
    { type: 'success', message: 'Solar optimization: Site 112 - 48% energy savings', time: '12 min ago' },
    { type: 'success', message: 'Network optimization: Latency reduced by 15%', time: '15 min ago' },
    { type: 'success', message: 'Predictive maintenance prevented failure - Site 089', time: '18 min ago' }
  ];

  return (
    <div className="app">
      <header className="header">
        <div className="header-left">
          <div className="logo-container">
            <img 
              src={logo} 
              alt="Smart Net Logo" 
              className="app-logo"
            />
          </div>
        </div>
        <div className="header-center">
          <h1 className="header-title">AI-Powered 5G Network Intelligence Platform</h1>
          <div className="header-subtitle">
            <span className="status-indicator"></span>
            <span>All Systems Operational</span>
          </div>
        </div>
        <div className="header-right">
          <div className="header-time">
            <Clock size={18} />
            <span>{currentTime.toLocaleTimeString('en-ZA')}</span>
          </div>
          <div className="header-date">{currentTime.toLocaleDateString('en-ZA', { 
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
          })}</div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="nav-tabs">
        <button 
          className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
          style={{ borderBottomColor: activeTab === 'overview' ? TELKOM_COLORS.primary : 'transparent' }}
        >
          <BarChart3 size={20} />
          <span>Network Overview</span>
        </button>
        <button 
          className={`nav-tab ${activeTab === 'industry' ? 'active' : ''}`}
          onClick={() => setActiveTab('industry')}
          style={{ borderBottomColor: activeTab === 'industry' ? TELKOM_COLORS.primary : 'transparent' }}
        >
          <Layers size={20} />
          <span>Industry Network Slices</span>
        </button>
      </nav>

      <main className="main-content">
        {/* OVERVIEW TAB CONTENT */}
        {activeTab === 'overview' && (
          <>
            <section className="metrics-grid">
              <StatCard icon={Server} title="Active Sites" value="380" subtitle="of 400 total" trend={2.5} color={TELKOM_COLORS.primary} />
              <StatCard icon={Activity} title="Network Traffic" value={realtimeData.traffic} unit="TB/s" trend={5.2} color={TELKOM_COLORS.secondary} />
              <StatCard icon={Zap} title="Avg Latency" value={realtimeData.latency} unit="ms" subtitle="Target: <1ms" trend={-12} color={TELKOM_COLORS.success} />
              <StatCard icon={Shield} title="Threats Blocked" value={realtimeData.threats} unit="/hr" subtitle="98.6% accuracy" color={TELKOM_COLORS.teal} />
              <StatCard icon={Wifi} title="Network Uptime" value="99.8" unit="%" subtitle="Last 30 days" color={TELKOM_COLORS.success} />
              <StatCard icon={Sun} title="Energy Efficiency" value="42" unit="%" subtitle="vs 40% target" trend={8} color={TELKOM_COLORS.warning} />
              <StatCard icon={BarChart3} title="AI Resolution Rate" value="90" unit="%" subtitle="Automated fixes" color={TELKOM_COLORS.primary} />
              <StatCard icon={Users} title="Active Users" value={(realtimeData.users / 1000).toFixed(0)} unit="K" trend={3.1} color={TELKOM_COLORS.secondary} />
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
        )}

        {/* INDUSTRY TAB CONTENT */}
        {activeTab === 'industry' && (
          <>
            <section className="industry-header">
              <div className="industry-header-content">
                <div className="industry-header-icon">
                  <Layers size={48} color={TELKOM_COLORS.primary} />
                </div>
                <div>
                  <h2 className="industry-title">Industry Network Slices</h2>
                  <p className="industry-subtitle">
                    AI-powered network slicing provides dedicated virtual networks for critical industries, 
                    ensuring guaranteed performance, priority routing, and optimized resource allocation.
                  </p>
                </div>
              </div>
            </section>

            <section className="industry-slices-container">
              {industrySlices.map(slice => (
                <IndustrySliceCard key={slice.id} slice={slice} />
              ))}
            </section>

            <section className="sla-compliance-section">
              <div className="section-header">
                <h3 className="section-title">
                  <CheckCircle size={24} color={TELKOM_COLORS.success} />
                  Industry SLA Compliance
                </h3>
              </div>
              <div className="sla-table">
                <div className="sla-table-header">
                  <div className="sla-cell">Industry</div>
                  <div className="sla-cell">Current Latency</div>
                  <div className="sla-cell">SLA Target</div>
                  <div className="sla-cell">Uptime</div>
                  <div className="sla-cell">Status</div>
                </div>
                {industrySLAData.map((row, index) => {
                  const icons = ['🏥', '🎓', '🚗', '🎬'];
                  const statusColors = {
                    excellent: TELKOM_COLORS.success,
                    good: TELKOM_COLORS.success,
                    warning: TELKOM_COLORS.warning
                  };
                  const statusIcons = {
                    excellent: '✓',
                    good: '✓',
                    warning: '⚠'
                  };
                  const statusText = {
                    excellent: 'Excellent',
                    good: 'Meeting SLA',
                    warning: 'Near Limit'
                  };

                  return (
                    <div key={index} className="sla-table-row">
                      <div className="sla-cell">
                        <span className="sla-industry">{icons[index]} {row.industry}</span>
                      </div>
                      <div className="sla-cell">{row.latency}</div>
                      <div className="sla-cell">{row.target}</div>
                      <div className="sla-cell">{row.uptime}</div>
                      <div className="sla-cell">
                        <span className="sla-status" style={{ color: statusColors[row.status] }}>
                          {statusIcons[row.status]} {statusText[row.status]}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="industry-activity-section">
              <div className="section-header">
                <h3 className="section-title">
                  <Activity size={24} color={TELKOM_COLORS.primary} />
                  Recent AI-Powered Industry Activity
                </h3>
              </div>
              <div className="industry-activity-feed">
                {industryAlerts.map((alert, index) => (
                  <IndustryAlertCard key={index} alert={alert} />
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;