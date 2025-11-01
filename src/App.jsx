import React, { useState, useEffect } from 'react';
import logo from './assets/smart_net.png';

import { 
  Activity, Radio, Zap, Shield, Users, TrendingUp, TrendingDown,
  AlertCircle, CheckCircle, Wifi, Battery, Sun, Clock, Server,
  BarChart3, PieChart, LineChart as LineChartIcon, Network,
  Layers, Heart, GraduationCap, Car, Film, ArrowRight, AlertTriangle,
  MapPin, FileText, Search, Filter, ChevronRight, ExternalLink,
  Settings, Wrench, RefreshCw, XCircle
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
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'industry', 'sites', 'faults', 'tickets'
  const [realtimeData, setRealtimeData] = useState({
    traffic: 12.4,
    users: 156000,
    threats: 3,
    latency: 0.8
  });
  const [selectedSite, setSelectedSite] = useState(null);
  const [selectedFault, setSelectedFault] = useState(null);
  const [siteSearchQuery, setSearchQuery] = useState('');
  const [ticketFilter, setTicketFilter] = useState('all'); // 'all', 'aging', 'critical'

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

  // Site Database with Live Status
  const sitesDatabase = [
    { id: 'GT-001', name: 'Johannesburg Central', province: 'Gauteng', status: 'optimal', health: 98, latency: 0.7, uptime: 99.99, lastMaintenance: '2 days ago', devices: 234, coordinates: '-26.2041, 28.0473' },
    { id: 'GT-002', name: 'Pretoria East', province: 'Gauteng', status: 'optimal', health: 96, latency: 0.8, uptime: 99.98, lastMaintenance: '5 days ago', devices: 198, coordinates: '-25.7479, 28.2293' },
    { id: 'WC-001', name: 'Cape Town CBD', province: 'Western Cape', status: 'warning', health: 82, latency: 1.2, uptime: 99.85, lastMaintenance: '14 days ago', devices: 312, coordinates: '-33.9249, 18.4241' },
    { id: 'WC-002', name: 'Stellenbosch', province: 'Western Cape', status: 'optimal', health: 94, latency: 0.9, uptime: 99.96, lastMaintenance: '3 days ago', devices: 156, coordinates: '-33.9321, 18.8602' },
    { id: 'KZN-001', name: 'Durban North', province: 'KwaZulu-Natal', status: 'critical', health: 68, latency: 2.4, uptime: 98.2, lastMaintenance: '28 days ago', devices: 287, coordinates: '-29.7833, 31.0456' },
    { id: 'EC-001', name: 'Port Elizabeth', province: 'Eastern Cape', status: 'maintenance', health: 0, latency: 0, uptime: 0, lastMaintenance: 'In progress', devices: 0, coordinates: '-33.9608, 25.6022' },
    { id: 'MP-001', name: 'Nelspruit', province: 'Mpumalanga', status: 'optimal', health: 91, latency: 1.0, uptime: 99.92, lastMaintenance: '7 days ago', devices: 143, coordinates: '-25.4753, 30.9700' },
    { id: 'NW-001', name: 'Mahikeng', province: 'North West', status: 'warning', health: 79, latency: 1.8, uptime: 99.1, lastMaintenance: '19 days ago', devices: 98, coordinates: '-25.8694, 25.6444' }
  ];

  // Active Faults Database
  const faultsDatabase = [
    {
      id: 'FLT-2025-0089',
      severity: 'critical',
      site: 'KZN-001',
      siteName: 'Durban North',
      type: 'Power System Failure',
      description: 'Backup generator failed to switch on during grid outage. Running on battery (estimated 4 hours remaining).',
      detected: '28 minutes ago',
      alarmCount: 12,
      correlatedAlarms: ['POWER_LOSS_PRIMARY', 'GENERATOR_START_FAIL', 'BATTERY_DISCHARGE_ACTIVE', 'UPS_OVERLOAD_WARNING'],
      rootCause: 'Generator fuel pump malfunction + primary grid voltage fluctuation',
      impact: '287 connected devices, affects 2,340 users (Healthcare: 45, Education: 890)',
      recommendedAction: 'Immediate dispatch: Fuel pump replacement + grid voltage stabilizer check',
      autoResolution: false,
      assignedTo: 'Field Team Alpha',
      eta: '45 minutes'
    },
    {
      id: 'FLT-2025-0087',
      severity: 'warning',
      site: 'WC-001',
      siteName: 'Cape Town CBD',
      type: 'Antenna Degradation',
      description: 'Sector 2 antenna showing 18% signal strength reduction. Weather damage suspected.',
      detected: '2 hours ago',
      alarmCount: 5,
      correlatedAlarms: ['SIGNAL_STRENGTH_LOW', 'SECTOR_CAPACITY_REDUCED', 'HANDOFF_FAILURE_INCREASE'],
      rootCause: 'Physical antenna damage from recent storm (2 days ago)',
      impact: 'Reduced capacity in western sector, 312 devices affected, minimal service disruption',
      recommendedAction: 'Schedule antenna inspection and alignment',
      autoResolution: false,
      assignedTo: 'Technical Team',
      eta: '4 hours'
    },
    {
      id: 'FLT-2025-0086',
      severity: 'resolved',
      site: 'GT-001',
      siteName: 'Johannesburg Central',
      type: 'Cooling System Anomaly',
      description: 'Temperature spike detected in equipment room. AI auto-resolved by activating secondary cooling.',
      detected: '45 minutes ago',
      resolvedAt: '3 minutes ago',
      alarmCount: 3,
      correlatedAlarms: ['TEMP_THRESHOLD_EXCEEDED', 'COOLING_FAN_SPEED_LOW', 'THERMAL_SHUTDOWN_WARNING'],
      rootCause: 'Primary cooling fan bearing wear',
      impact: 'None - prevented thermal shutdown through AI intervention',
      recommendedAction: 'Preventive maintenance: Replace cooling fan during next scheduled maintenance',
      autoResolution: true,
      resolution: 'AI activated secondary cooling system, ordered replacement fan (arrives tomorrow)',
      resolvedBy: 'SMART-NET AI'
    }
  ];

  // Tickets/Maintenance Queue with Aging
  const ticketsDatabase = [
    {
      id: 'TKT-5623',
      priority: 'critical',
      site: 'KZN-001',
      siteName: 'Durban North',
      issue: 'Generator fuel system repair',
      age: 28,
      ageUnit: 'minutes',
      status: 'in-progress',
      assignedTo: 'Field Team Alpha',
      sla: '4 hours',
      slaStatus: 'on-track',
      lastUpdate: '5 minutes ago',
      interventionType: 'manual',
      estimatedResolution: '45 minutes'
    },
    {
      id: 'TKT-5621',
      priority: 'high',
      site: 'WC-001',
      siteName: 'Cape Town CBD',
      issue: 'Antenna alignment and inspection',
      age: 14,
      ageUnit: 'days',
      status: 'scheduled',
      assignedTo: 'Technical Team',
      sla: '7 days',
      slaStatus: 'at-risk',
      lastUpdate: '2 hours ago',
      interventionType: 'manual',
      estimatedResolution: '4 hours'
    },
    {
      id: 'TKT-5620',
      priority: 'medium',
      site: 'NW-001',
      siteName: 'Mahikeng',
      issue: 'Routine preventive maintenance',
      age: 19,
      ageUnit: 'days',
      status: 'pending',
      assignedTo: 'Unassigned',
      sla: '30 days',
      slaStatus: 'on-track',
      lastUpdate: '19 days ago',
      interventionType: 'manual',
      estimatedResolution: 'Not scheduled'
    },
    {
      id: 'TKT-5619',
      priority: 'low',
      site: 'GT-001',
      siteName: 'Johannesburg Central',
      issue: 'Cooling fan replacement',
      age: 42,
      ageUnit: 'minutes',
      status: 'resolved',
      assignedTo: 'SMART-NET AI',
      sla: '24 hours',
      slaStatus: 'met',
      lastUpdate: '3 minutes ago',
      interventionType: 'automated',
      estimatedResolution: 'Completed (AI)',
      resolution: 'Secondary cooling activated, replacement fan ordered'
    },
    {
      id: 'TKT-5615',
      priority: 'high',
      site: 'WC-002',
      siteName: 'Stellenbosch',
      issue: 'Fiber optic cable damage investigation',
      age: 47,
      ageUnit: 'days',
      status: 'aging',
      assignedTo: 'Investigation Team',
      sla: '14 days',
      slaStatus: 'overdue',
      lastUpdate: '12 days ago',
      interventionType: 'manual',
      estimatedResolution: 'Investigation ongoing'
    }
  ];

  // Automation Metrics
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

  // NEW COMPONENTS FOR SITES TAB
  const SiteCard = ({ site, onClick }) => {
    const statusConfig = {
      optimal: { color: TELKOM_COLORS.success, icon: CheckCircle, label: 'Optimal' },
      warning: { color: TELKOM_COLORS.warning, icon: AlertCircle, label: 'Warning' },
      critical: { color: TELKOM_COLORS.danger, icon: XCircle, label: 'Critical' },
      maintenance: { color: TELKOM_COLORS.secondary, icon: Settings, label: 'Maintenance' }
    };
    const config = statusConfig[site.status];
    const StatusIcon = config.icon;

    return (
      <div className="site-card" onClick={() => onClick(site)} style={{ borderLeftColor: config.color }}>
        <div className="site-card-header">
          <div className="site-id-section">
            <Server size={24} color={config.color} />
            <div>
              <div className="site-id">{site.id}</div>
              <div className="site-name">{site.name}</div>
            </div>
          </div>
          <div className="site-status-badge" style={{ background: `${config.color}20`, color: config.color }}>
            <StatusIcon size={16} />
            <span>{config.label}</span>
          </div>
        </div>
        <div className="site-metrics-quick">
          <div className="quick-metric">
            <span className="metric-label-small">Health</span>
            <span className="metric-value-small" style={{ color: config.color }}>{site.health}%</span>
          </div>
          <div className="quick-metric">
            <span className="metric-label-small">Latency</span>
            <span className="metric-value-small">{site.latency}ms</span>
          </div>
          <div className="quick-metric">
            <span className="metric-label-small">Uptime</span>
            <span className="metric-value-small">{site.uptime}%</span>
          </div>
          <div className="quick-metric">
            <span className="metric-label-small">Devices</span>
            <span className="metric-value-small">{site.devices}</span>
          </div>
        </div>
        <div className="site-card-footer">
          <MapPin size={14} />
          <span>{site.province}</span>
          <span className="site-maintenance-info">Last maintenance: {site.lastMaintenance}</span>
        </div>
      </div>
    );
  };

  const SiteDetailModal = ({ site, onClose }) => {
    if (!site) return null;
    
    const statusConfig = {
      optimal: { color: TELKOM_COLORS.success, label: 'Optimal Operation' },
      warning: { color: TELKOM_COLORS.warning, label: 'Requires Attention' },
      critical: { color: TELKOM_COLORS.danger, label: 'Critical Status' },
      maintenance: { color: TELKOM_COLORS.secondary, label: 'Under Maintenance' }
    };
    const config = statusConfig[site.status];

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header" style={{ borderBottomColor: config.color }}>
            <div>
              <h2>{site.name}</h2>
              <p className="modal-subtitle">{site.id} • {site.province}</p>
            </div>
            <button className="modal-close" onClick={onClose}>×</button>
          </div>
          <div className="modal-body">
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Status</span>
                <span className="detail-value" style={{ color: config.color }}>{config.label}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Health Score</span>
                <span className="detail-value">{site.health}%</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Network Latency</span>
                <span className="detail-value">{site.latency}ms</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Uptime (30 days)</span>
                <span className="detail-value">{site.uptime}%</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Connected Devices</span>
                <span className="detail-value">{site.devices}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Last Maintenance</span>
                <span className="detail-value">{site.lastMaintenance}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Coordinates</span>
                <span className="detail-value">{site.coordinates}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // NEW COMPONENTS FOR FAULT INTERROGATION TAB
  const FaultCard = ({ fault, onClick }) => {
    const severityConfig = {
      critical: { color: TELKOM_COLORS.danger, icon: XCircle, label: 'CRITICAL' },
      warning: { color: TELKOM_COLORS.warning, icon: AlertTriangle, label: 'WARNING' },
      resolved: { color: TELKOM_COLORS.success, icon: CheckCircle, label: 'RESOLVED' }
    };
    const config = severityConfig[fault.severity];
    const SeverityIcon = config.icon;

    return (
      <div className="fault-card" onClick={() => onClick(fault)} style={{ borderLeftColor: config.color }}>
        <div className="fault-header">
          <div className="fault-badge" style={{ background: config.color }}>
            <SeverityIcon size={16} />
            <span>{config.label}</span>
          </div>
          <div className="fault-id">{fault.id}</div>
        </div>
        <div className="fault-title">{fault.type}</div>
        <div className="fault-site-info">
          <Server size={16} />
          <span>{fault.site} - {fault.siteName}</span>
        </div>
        <div className="fault-description-preview">{fault.description}</div>
        <div className="fault-footer">
          <span className="fault-time">🕐 {fault.detected}</span>
          <span className="fault-alarms">⚠️ {fault.alarmCount} correlated alarms</span>
        </div>
        {fault.autoResolution && (
          <div className="auto-badge">
            <Zap size={14} />
            <span>AI Auto-Resolved</span>
          </div>
        )}
      </div>
    );
  };

  const FaultDetailModal = ({ fault, onClose }) => {
    if (!fault) return null;
    
    const severityConfig = {
      critical: { color: TELKOM_COLORS.danger, label: 'CRITICAL FAULT' },
      warning: { color: TELKOM_COLORS.warning, label: 'WARNING' },
      resolved: { color: TELKOM_COLORS.success, label: 'RESOLVED' }
    };
    const config = severityConfig[fault.severity];

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content fault-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header" style={{ borderBottomColor: config.color }}>
            <div>
              <h2>{fault.type}</h2>
              <p className="modal-subtitle">{fault.id} • {fault.siteName}</p>
            </div>
            <button className="modal-close" onClick={onClose}>×</button>
          </div>
          <div className="modal-body">
            <div className="fault-section">
              <h3 className="section-title-small">Fault Description</h3>
              <p className="fault-detail-text">{fault.description}</p>
            </div>
            
            <div className="fault-section">
              <h3 className="section-title-small">Correlated Alarms ({fault.alarmCount})</h3>
              <div className="alarm-chips">
                {fault.correlatedAlarms.map((alarm, idx) => (
                  <div key={idx} className="alarm-chip">{alarm}</div>
                ))}
              </div>
            </div>

            <div className="fault-section">
              <h3 className="section-title-small">Root Cause Analysis</h3>
              <p className="fault-detail-text" style={{ color: TELKOM_COLORS.warning }}>
                🔍 {fault.rootCause}
              </p>
            </div>

            <div className="fault-section">
              <h3 className="section-title-small">Impact Assessment</h3>
              <p className="fault-detail-text">{fault.impact}</p>
            </div>

            <div className="fault-section">
              <h3 className="section-title-small">Recommended Action</h3>
              <p className="fault-detail-text" style={{ color: TELKOM_COLORS.primary }}>
                💡 {fault.recommendedAction}
              </p>
            </div>

            {fault.severity !== 'resolved' && (
              <div className="fault-section">
                <h3 className="section-title-small">Assignment</h3>
                <div className="assignment-info">
                  <div>
                    <strong>Assigned To:</strong> {fault.assignedTo}
                  </div>
                  <div>
                    <strong>ETA:</strong> {fault.eta}
                  </div>
                </div>
              </div>
            )}

            {fault.severity === 'resolved' && (
              <div className="fault-section resolved-section">
                <h3 className="section-title-small" style={{ color: TELKOM_COLORS.success }}>
                  ✓ Resolution Details
                </h3>
                <p className="fault-detail-text">{fault.resolution}</p>
                <div className="resolution-meta">
                  <span>Resolved by: {fault.resolvedBy}</span>
                  <span>Time: {fault.resolvedAt}</span>
                </div>
              </div>
            )}

            {!fault.autoResolution && fault.severity !== 'resolved' && (
              <div className="fault-actions">
                <button className="action-btn primary">
                  <Wrench size={16} />
                  Dispatch Field Team
                </button>
                <button className="action-btn secondary">
                  <RefreshCw size={16} />
                  Manual Override
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // NEW COMPONENTS FOR TICKETS TAB
  const TicketCard = ({ ticket }) => {
    const priorityConfig = {
      critical: { color: TELKOM_COLORS.danger, label: 'CRITICAL' },
      high: { color: TELKOM_COLORS.warning, label: 'HIGH' },
      medium: { color: TELKOM_COLORS.primary, label: 'MEDIUM' },
      low: { color: TELKOM_COLORS.secondary, label: 'LOW' }
    };
    const pConfig = priorityConfig[ticket.priority];

    const statusConfig = {
      'in-progress': { color: TELKOM_COLORS.primary, icon: '🔄', label: 'In Progress' },
      'scheduled': { color: TELKOM_COLORS.warning, icon: '📅', label: 'Scheduled' },
      'pending': { color: TELKOM_COLORS.secondary, icon: '⏸️', label: 'Pending' },
      'resolved': { color: TELKOM_COLORS.success, icon: '✅', label: 'Resolved' },
      'aging': { color: TELKOM_COLORS.danger, icon: '⏰', label: 'Aging' }
    };
    const sConfig = statusConfig[ticket.status];

    const slaConfig = {
      'on-track': TELKOM_COLORS.success,
      'at-risk': TELKOM_COLORS.warning,
      'overdue': TELKOM_COLORS.danger,
      'met': TELKOM_COLORS.success
    };
    const slaColor = slaConfig[ticket.slaStatus];

    return (
      <div className="ticket-card" style={{ borderLeftColor: pConfig.color }}>
        <div className="ticket-header">
          <div className="ticket-id-section">
            <FileText size={20} />
            <span className="ticket-id">{ticket.id}</span>
            <div className="ticket-priority-badge" style={{ background: pConfig.color }}>
              {pConfig.label}
            </div>
          </div>
          <div className="ticket-status" style={{ color: sConfig.color }}>
            <span>{sConfig.icon}</span>
            <span>{sConfig.label}</span>
          </div>
        </div>

        <div className="ticket-body">
          <div className="ticket-site">
            <Server size={16} />
            <span>{ticket.site} - {ticket.siteName}</span>
          </div>
          <div className="ticket-issue">{ticket.issue}</div>
          
          <div className="ticket-metrics">
            <div className="ticket-metric">
              <span className="ticket-label">Age:</span>
              <span className={`ticket-value ${ticket.age > 30 && ticket.ageUnit === 'days' ? 'aging' : ''}`}>
                {ticket.age} {ticket.ageUnit}
              </span>
            </div>
            <div className="ticket-metric">
              <span className="ticket-label">SLA:</span>
              <span className="ticket-value" style={{ color: slaColor }}>
                {ticket.sla} ({ticket.slaStatus})
              </span>
            </div>
          </div>

          <div className="ticket-assignment">
            <div>
              <strong>Assigned:</strong> {ticket.assignedTo}
            </div>
            <div className={`intervention-badge ${ticket.interventionType}`}>
              {ticket.interventionType === 'automated' ? '🤖' : '👤'} {ticket.interventionType}
            </div>
          </div>

          <div className="ticket-footer">
            <span>Updated: {ticket.lastUpdate}</span>
            <span>ETA: {ticket.estimatedResolution}</span>
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

  // Filter functions
  const filteredSites = sitesDatabase.filter(site => 
    site.name.toLowerCase().includes(siteSearchQuery.toLowerCase()) ||
    site.id.toLowerCase().includes(siteSearchQuery.toLowerCase()) ||
    site.province.toLowerCase().includes(siteSearchQuery.toLowerCase())
  );

  const filteredTickets = ticketsDatabase.filter(ticket => {
    if (ticketFilter === 'all') return true;
    if (ticketFilter === 'aging') return ticket.age > 30 && ticket.ageUnit === 'days';
    if (ticketFilter === 'critical') return ticket.priority === 'critical';
    return true;
  });

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
        <button 
          className={`nav-tab ${activeTab === 'sites' ? 'active' : ''}`}
          onClick={() => setActiveTab('sites')}
          style={{ borderBottomColor: activeTab === 'sites' ? TELKOM_COLORS.primary : 'transparent' }}
        >
          <MapPin size={20} />
          <span>Site Management</span>
        </button>
        <button 
          className={`nav-tab ${activeTab === 'faults' ? 'active' : ''}`}
          onClick={() => setActiveTab('faults')}
          style={{ borderBottomColor: activeTab === 'faults' ? TELKOM_COLORS.primary : 'transparent' }}
        >
          <AlertTriangle size={20} />
          <span>Fault Interrogation</span>
        </button>
        <button 
          className={`nav-tab ${activeTab === 'tickets' ? 'active' : ''}`}
          onClick={() => setActiveTab('tickets')}
          style={{ borderBottomColor: activeTab === 'tickets' ? TELKOM_COLORS.primary : 'transparent' }}
        >
          <FileText size={20} />
          <span>Tickets & Maintenance</span>
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

        {/* SITES TAB CONTENT - NEW */}
        {activeTab === 'sites' && (
          <>
            <section className="sites-header">
              <div className="sites-header-content">
                <div className="sites-header-left">
                  <MapPin size={48} color={TELKOM_COLORS.primary} />
                  <div>
                    <h2 className="section-main-title">Live Site Database</h2>
                    <p className="section-main-subtitle">Real-time monitoring of all 380 active 5G network sites across South Africa</p>
                  </div>
                </div>
                <div className="sites-search">
                  <Search size={20} />
                  <input 
                    type="text" 
                    placeholder="Search by site ID, name, or province..."
                    value={siteSearchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </section>

            <section className="sites-summary">
              <div className="summary-card" style={{ borderTopColor: TELKOM_COLORS.success }}>
                <div className="summary-value">{sitesDatabase.filter(s => s.status === 'optimal').length}</div>
                <div className="summary-label">Optimal Sites</div>
              </div>
              <div className="summary-card" style={{ borderTopColor: TELKOM_COLORS.warning }}>
                <div className="summary-value">{sitesDatabase.filter(s => s.status === 'warning').length}</div>
                <div className="summary-label">Warning Status</div>
              </div>
              <div className="summary-card" style={{ borderTopColor: TELKOM_COLORS.danger }}>
                <div className="summary-value">{sitesDatabase.filter(s => s.status === 'critical').length}</div>
                <div className="summary-label">Critical Status</div>
              </div>
              <div className="summary-card" style={{ borderTopColor: TELKOM_COLORS.secondary }}>
                <div className="summary-value">{sitesDatabase.filter(s => s.status === 'maintenance').length}</div>
                <div className="summary-label">Under Maintenance</div>
              </div>
            </section>

            <section className="sites-grid">
              {filteredSites.map(site => (
                <SiteCard key={site.id} site={site} onClick={setSelectedSite} />
              ))}
            </section>

            {selectedSite && (
              <SiteDetailModal site={selectedSite} onClose={() => setSelectedSite(null)} />
            )}
          </>
        )}

        {/* FAULTS TAB CONTENT - NEW */}
        {activeTab === 'faults' && (
          <>
            <section className="faults-header">
              <div className="faults-header-content">
                <AlertTriangle size={48} color={TELKOM_COLORS.warning} />
                <div>
                  <h2 className="section-main-title">Fault Interrogation Interface</h2>
                  <p className="section-main-subtitle">
                    Comprehensive fault analysis with alarm correlation, root cause identification, and automated resolution tracking
                  </p>
                </div>
              </div>
            </section>

            <section className="faults-summary">
              <div className="summary-card" style={{ borderTopColor: TELKOM_COLORS.danger }}>
                <div className="summary-value">{faultsDatabase.filter(f => f.severity === 'critical').length}</div>
                <div className="summary-label">Critical Faults</div>
              </div>
              <div className="summary-card" style={{ borderTopColor: TELKOM_COLORS.warning }}>
                <div className="summary-value">{faultsDatabase.filter(f => f.severity === 'warning').length}</div>
                <div className="summary-label">Warnings</div>
              </div>
              <div className="summary-card" style={{ borderTopColor: TELKOM_COLORS.success }}>
                <div className="summary-value">{faultsDatabase.filter(f => f.severity === 'resolved').length}</div>
                <div className="summary-label">Auto-Resolved</div>
              </div>
              <div className="summary-card" style={{ borderTopColor: TELKOM_COLORS.primary }}>
                <div className="summary-value">{faultsDatabase.reduce((sum, f) => sum + f.alarmCount, 0)}</div>
                <div className="summary-label">Total Alarms</div>
              </div>
            </section>

            <section className="faults-grid">
              {faultsDatabase.map(fault => (
                <FaultCard key={fault.id} fault={fault} onClick={setSelectedFault} />
              ))}
            </section>

            {selectedFault && (
              <FaultDetailModal fault={selectedFault} onClose={() => setSelectedFault(null)} />
            )}
          </>
        )}

        {/* TICKETS TAB CONTENT - NEW */}
        {activeTab === 'tickets' && (
          <>
            <section className="tickets-header">
              <div className="tickets-header-content">
                <div className="tickets-header-left">
                  <FileText size={48} color={TELKOM_COLORS.primary} />
                  <div>
                    <h2 className="section-main-title">Tickets & Maintenance Queue</h2>
                    <p className="section-main-subtitle">
                      Track aging tickets, prioritize maintenance tasks, and minimize manual interventions through AI automation
                    </p>
                  </div>
                </div>
                <div className="tickets-filter">
                  <Filter size={20} />
                  <select value={ticketFilter} onChange={(e) => setTicketFilter(e.target.value)}>
                    <option value="all">All Tickets</option>
                    <option value="aging">Aging (30+ days)</option>
                    <option value="critical">Critical Priority</option>
                  </select>
                </div>
              </div>
            </section>

            <section className="tickets-summary">
              <div className="summary-card" style={{ borderTopColor: TELKOM_COLORS.danger }}>
                <div className="summary-value">{ticketsDatabase.filter(t => t.priority === 'critical').length}</div>
                <div className="summary-label">Critical Tickets</div>
              </div>
              <div className="summary-card" style={{ borderTopColor: TELKOM_COLORS.warning }}>
                <div className="summary-value">{ticketsDatabase.filter(t => t.age > 30 && t.ageUnit === 'days').length}</div>
                <div className="summary-label">Aging Tickets (30+ days)</div>
              </div>
              <div className="summary-card" style={{ borderTopColor: TELKOM_COLORS.primary }}>
                <div className="summary-value">{ticketsDatabase.filter(t => t.status === 'in-progress').length}</div>
                <div className="summary-label">In Progress</div>
              </div>
              <div className="summary-card" style={{ borderTopColor: TELKOM_COLORS.success }}>
                <div className="summary-value">{ticketsDatabase.filter(t => t.interventionType === 'automated').length}</div>
                <div className="summary-label">AI Automated</div>
              </div>
            </section>

            <section className="tickets-grid">
              {filteredTickets.map(ticket => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;