import React, { useState } from 'react';
import { 
  Layers, Heart, GraduationCap, Car, Film, Activity, CheckCircle, 
  AlertTriangle, Server, MapPin, AlertCircle as AlertCircleIcon, 
  XCircle, Settings, FileText, Wrench, RefreshCw, Filter, Search 
} from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const TELKOM_COLORS = {
  primary: '#00C1DE',
  secondary: '#0077C8',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  teal: '#00838F'
};

// =====================================================
// INDUSTRY SLICES COMPONENT
// =====================================================
export const IndustrySlices = () => {
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
    }
  ];

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

  return (
    <div className="industry-slices-container" style={{ padding: '24px' }}>
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

      <section className="industry-activity-section">
        <div className="section-header">
          <h3 className="section-title">
            <Activity size={24} color={TELKOM_COLORS.primary} />
            Recent AI-Powered Industry Activity
          </h3>
        </div>
        <div className="industry-activity-feed">
          {industryAlerts.map((alert, index) => (
            <div key={index} className="industry-alert-card" style={{ 
              borderLeftColor: alert.type === 'critical' ? TELKOM_COLORS.danger : 
                               alert.type === 'warning' ? TELKOM_COLORS.warning : 
                               TELKOM_COLORS.success 
            }}>
              <div className="alert-emoji">{alert.icon}</div>
              <div className="alert-content-full">
                <div className="alert-message-main">{alert.message}</div>
                <div className="alert-meta">
                  <span className="alert-time-stamp">{alert.time}</span>
                  {alert.note && <span className="alert-note">• {alert.note}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// =====================================================
// FAULT INTERROGATION COMPONENT
// =====================================================
export const FaultInterrogation = () => {
  const [selectedFault, setSelectedFault] = useState(null);

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

  const FaultCard = ({ fault }) => {
    const severityConfig = {
      critical: { color: TELKOM_COLORS.danger, icon: XCircle, label: 'CRITICAL' },
      warning: { color: TELKOM_COLORS.warning, icon: AlertTriangle, label: 'WARNING' },
      resolved: { color: TELKOM_COLORS.success, icon: CheckCircle, label: 'RESOLVED' }
    };
    const config = severityConfig[fault.severity];
    const SeverityIcon = config.icon;

    return (
      <div className="fault-card" onClick={() => setSelectedFault(fault)} style={{ borderLeftColor: config.color }}>
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
            <Activity size={14} />
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
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="faults-container" style={{ padding: '24px' }}>
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

      <section className="faults-grid">
        {faultsDatabase.map(fault => (
          <FaultCard key={fault.id} fault={fault} />
        ))}
      </section>

      {selectedFault && (
        <FaultDetailModal fault={selectedFault} onClose={() => setSelectedFault(null)} />
      )}
    </div>
  );
};

// =====================================================
// TICKETS MANAGEMENT COMPONENT
// =====================================================
export const TicketsManagement = () => {
  const [ticketFilter, setTicketFilter] = useState('all');

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
    }
  ];

  const filteredTickets = ticketsDatabase.filter(ticket => {
    if (ticketFilter === 'all') return true;
    if (ticketFilter === 'aging') return ticket.age > 30 && ticket.ageUnit === 'days';
    if (ticketFilter === 'critical') return ticket.priority === 'critical';
    return true;
  });

  const TicketCard = ({ ticket }) => {
    const priorityConfig = {
      critical: { color: TELKOM_COLORS.danger, label: 'CRITICAL' },
      high: { color: TELKOM_COLORS.warning, label: 'HIGH' },
      medium: { color: TELKOM_COLORS.primary, label: 'MEDIUM' },
      low: { color: TELKOM_COLORS.secondary, label: 'LOW' }
    };
    const pConfig = priorityConfig[ticket.priority];

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
        </div>

        <div className="ticket-body">
          <div className="ticket-site">
            <Server size={16} />
            <span>{ticket.site} - {ticket.siteName}</span>
          </div>
          <div className="ticket-issue">{ticket.issue}</div>
          
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

  return (
    <div className="tickets-container" style={{ padding: '24px' }}>
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

      <section className="tickets-grid">
        {filteredTickets.map(ticket => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </section>
    </div>
  );
};