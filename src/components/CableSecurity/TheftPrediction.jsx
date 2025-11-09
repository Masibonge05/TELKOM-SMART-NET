import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, MapPin, Camera, Lock, Activity, TrendingDown, CheckCircle, Wrench } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './TheftPrediction.css';

const TELKOM_COLORS = {
  primary: '#00C1DE',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  secondary: '#0077C8'
};

const TheftPrediction = () => {
  const [selectedSite, setSelectedSite] = useState(null);
  const [liveIncidents, setLiveIncidents] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveIncidents(prev => Math.max(0, prev + (Math.random() > 0.95 ? 1 : 0) - (Math.random() > 0.9 ? 1 : 0)));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const securityMetrics = {
    highRiskSites: 45,
    incidentsThisMonth: 12,
    incidentsPrevented: 28,
    savingsFromPrevention: 'R8.4M',
    activeSurveillance: 380,
    responseTime: '8 min'
  };

  const highRiskSites = [
    {
      id: 'GT-045',
      name: 'Soweto Junction',
      province: 'Gauteng',
      riskScore: 94,
      lat: -26.2472,
      lng: 27.8546,
      lastIncident: '3 days ago',
      incidentCount: 8,
      nearbyScrapDealers: 3,
      crimeRate: 'Very High',
      securityLevel: 'Enhanced',
      cameraStatus: 'Active',
      recommendedAction: 'Deploy mobile patrol unit + Install motion sensors',
      estimatedLoss: 'R450K',
      vulnerabilities: ['Limited lighting', 'Proximity to informal settlement', 'Previous incidents']
    },
    {
      id: 'KZN-023',
      name: 'Umlazi Township',
      province: 'KwaZulu-Natal',
      riskScore: 89,
      lat: -29.9687,
      lng: 30.8796,
      lastIncident: '1 week ago',
      incidentCount: 6,
      nearbyScrapDealers: 2,
      crimeRate: 'High',
      securityLevel: 'Standard',
      cameraStatus: 'Active',
      recommendedAction: 'Upgrade to AI-powered cameras + Community engagement',
      estimatedLoss: 'R380K',
      vulnerabilities: ['High foot traffic', 'Limited fence security', 'Gang activity nearby']
    },
    {
      id: 'WC-034',
      name: 'Khayelitsha Site B',
      province: 'Western Cape',
      riskScore: 86,
      lat: -34.0283,
      lng: 18.6648,
      lastIncident: '5 days ago',
      incidentCount: 7,
      nearbyScrapDealers: 4,
      crimeRate: 'Very High',
      securityLevel: 'Enhanced',
      cameraStatus: 'Maintenance',
      recommendedAction: 'URGENT: Repair cameras + 24/7 security guard',
      estimatedLoss: 'R520K',
      vulnerabilities: ['Camera malfunction', 'Multiple scrap dealers nearby', 'Previous copper theft']
    },
    {
      id: 'EC-012',
      name: 'Mdantsane Highway',
      province: 'Eastern Cape',
      riskScore: 81,
      lat: -32.9833,
      lng: 27.7167,
      lastIncident: '2 weeks ago',
      incidentCount: 4,
      nearbyScrapDealers: 1,
      crimeRate: 'Medium',
      securityLevel: 'Standard',
      cameraStatus: 'Active',
      recommendedAction: 'Increase patrol frequency + Install fiber sensors',
      estimatedLoss: 'R290K',
      vulnerabilities: ['Remote location', 'Infrequent patrols', 'Easy road access']
    }
  ];

  const recentIncidents = [
    {
      id: 'INC-2025-089',
      site: 'GT-045',
      siteName: 'Soweto Junction',
      type: 'Attempted Copper Theft',
      timestamp: '2 hours ago',
      status: 'Prevented',
      detectionMethod: 'AI Camera + Fiber Sensor',
      responseTime: '6 minutes',
      suspects: 2,
      recoveredItems: 'None - prevented',
      outcome: 'Success'
    },
    {
      id: 'INC-2025-087',
      site: 'KZN-023',
      siteName: 'Umlazi Township',
      type: 'Fiber Cable Cut',
      timestamp: '1 day ago',
      status: 'Resolved',
      detectionMethod: 'Network Monitoring',
      responseTime: '12 minutes',
      suspects: 'Unknown',
      recoveredItems: '15m fiber cable',
      outcome: 'R45K loss'
    },
    {
      id: 'INC-2025-086',
      site: 'WC-034',
      siteName: 'Khayelitsha Site B',
      type: 'Battery Theft Attempt',
      timestamp: '3 days ago',
      status: 'Prevented',
      detectionMethod: 'Motion Sensor',
      responseTime: '8 minutes',
      suspects: 3,
      recoveredItems: 'None - prevented',
      outcome: 'Success'
    }
  ];

  const preventionTrendData = [
    { month: 'Jan', prevented: 18, occurred: 8 },
    { month: 'Feb', prevented: 22, occurred: 6 },
    { month: 'Mar', prevented: 25, occurred: 5 },
    { month: 'Apr', prevented: 28, occurred: 4 },
    { month: 'May', prevented: 31, occurred: 3 },
    { month: 'Jun', prevented: 28, occurred: 12 }
  ];

  const riskFactorsData = [
    { factor: 'Previous Incidents', weight: 35 },
    { factor: 'Scrap Dealers Nearby', weight: 25 },
    { factor: 'Crime Statistics', weight: 20 },
    { factor: 'Security Level', weight: 15 },
    { factor: 'Location Remoteness', weight: 5 }
  ];

  return (
    <div className="theft-dashboard">
      {/* Header */}
      <div className="theft-header">
        <div className="theft-title">
          <Shield size={32} style={{ color: TELKOM_COLORS.danger }} />
          <div>
            <h2>Cable Theft & Vandalism Protection</h2>
            <p>AI-powered threat prediction • Real-time intrusion detection • 24/7 surveillance</p>
          </div>
        </div>
      </div>

      {/* Live Alert Banner */}
      <div className="live-alert-banner">
        <div className="live-indicator pulsing-red">
          <Activity size={20} />
        </div>
        <div className="live-alert-content">
          <strong>🚨 LIVE MONITORING ACTIVE</strong>
          <span>380 sites under surveillance • {liveIncidents} active incidents being investigated</span>
        </div>
        <div className="live-stats">
          <div className="live-stat-item">
            <Camera size={18} />
            <span>380 Cameras</span>
          </div>
          <div className="live-stat-item">
            <Lock size={18} />
            <span>28 Prevented Today</span>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="theft-metrics-grid">
        <div className="theft-metric-card" style={{ borderTopColor: TELKOM_COLORS.danger }}>
          <AlertTriangle size={28} style={{ color: TELKOM_COLORS.danger }} />
          <div className="theft-metric-value">{securityMetrics.highRiskSites}</div>
          <div className="theft-metric-label">High-Risk Sites</div>
          <div className="theft-metric-subtitle">Require enhanced security</div>
        </div>
        <div className="theft-metric-card" style={{ borderTopColor: TELKOM_COLORS.warning }}>
          <Activity size={28} style={{ color: TELKOM_COLORS.warning }} />
          <div className="theft-metric-value">{securityMetrics.incidentsThisMonth}</div>
          <div className="theft-metric-label">Incidents This Month</div>
          <div className="theft-metric-subtitle trend-down">↓ 60% vs last month</div>
        </div>
        <div className="theft-metric-card" style={{ borderTopColor: TELKOM_COLORS.success }}>
          <CheckCircle size={28} style={{ color: TELKOM_COLORS.success }} />
          <div className="theft-metric-value">{securityMetrics.incidentsPrevented}</div>
          <div className="theft-metric-label">Incidents Prevented</div>
          <div className="theft-metric-subtitle">AI early detection</div>
        </div>
        <div className="theft-metric-card" style={{ borderTopColor: TELKOM_COLORS.primary }}>
          <TrendingDown size={28} style={{ color: TELKOM_COLORS.primary }} />
          <div className="theft-metric-value">{securityMetrics.savingsFromPrevention}</div>
          <div className="theft-metric-label">Theft Losses Prevented</div>
          <div className="theft-metric-subtitle">This month</div>
        </div>
      </div>

      {/* High-Risk Sites Map */}
      <div className="theft-map-section">
        <h3>
          <MapPin size={24} style={{ color: TELKOM_COLORS.danger }} />
          High-Risk Site Heatmap
        </h3>
        <div className="theft-map-container">
          <svg viewBox="0 0 800 600" className="theft-svg-map">
            {/* South Africa outline */}
            <path
              d="M 150 100 L 650 100 L 700 200 L 650 400 L 600 500 L 400 550 L 200 500 L 150 400 Z"
              fill="#0a1628"
              stroke={TELKOM_COLORS.danger}
              strokeWidth="2"
              opacity="0.2"
            />

            {/* Risk zones (circles for high-risk areas) */}
            {highRiskSites.map(site => {
              const x = ((site.lng + 35) / 15) * 800 - 100;
              const y = 600 - ((site.lat + 35) / 15) * 600;
              
              return (
                <g 
                  key={site.id} 
                  className="risk-site-marker"
                  onClick={() => setSelectedSite(site)}
                >
                  {/* Risk heatmap circle */}
                  <circle
                    cx={x}
                    cy={y}
                    r={site.riskScore / 2}
                    fill={TELKOM_COLORS.danger}
                    opacity="0.2"
                    className="risk-zone"
                  />
                  
                  {/* Pulsing alert for very high risk */}
                  {site.riskScore >= 90 && (
                    <circle
                      cx={x}
                      cy={y}
                      r="30"
                      fill={TELKOM_COLORS.danger}
                      opacity="0.3"
                      className="pulse-animation-fast"
                    />
                  )}
                  
                  {/* Site marker */}
                  <circle
                    cx={x}
                    cy={y}
                    r="10"
                    fill={site.riskScore >= 90 ? TELKOM_COLORS.danger : 
                          site.riskScore >= 85 ? TELKOM_COLORS.warning : 
                          TELKOM_COLORS.primary}
                    stroke="#fff"
                    strokeWidth="2"
                    className="risk-dot"
                  />
                  
                  {/* Camera icon */}
                  <text
                    x={x}
                    y={y - 18}
                    fill="#fff"
                    fontSize="14"
                    textAnchor="middle"
                  >
                    📹
                  </text>

                  {/* Risk score */}
                  <text
                    x={x}
                    y={y + 25}
                    fill={TELKOM_COLORS.danger}
                    fontSize="11"
                    textAnchor="middle"
                    fontWeight="bold"
                  >
                    {site.riskScore}%
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Selected Site Popup */}
          {selectedSite && (
            <div className="theft-site-popup" style={{ borderTopColor: TELKOM_COLORS.danger }}>
              <button className="popup-close" onClick={() => setSelectedSite(null)}>×</button>
              <h4>{selectedSite.name}</h4>
              <div className="popup-id">{selectedSite.id}</div>
              <div className="popup-risk-score" style={{ color: TELKOM_COLORS.danger }}>
                Risk Score: {selectedSite.riskScore}%
              </div>
              <div className="popup-metrics-theft">
                <div className="popup-metric">
                  <span>Incidents:</span>
                  <span>{selectedSite.incidentCount}</span>
                </div>
                <div className="popup-metric">
                  <span>Last Incident:</span>
                  <span>{selectedSite.lastIncident}</span>
                </div>
                <div className="popup-metric">
                  <span>Camera Status:</span>
                  <span style={{ color: selectedSite.cameraStatus === 'Active' ? TELKOM_COLORS.success : TELKOM_COLORS.danger }}>
                    {selectedSite.cameraStatus}
                  </span>
                </div>
              </div>
              <button className="popup-details-btn-theft">Deploy Security Response</button>
            </div>
          )}
        </div>

        {/* Risk Legend */}
        <div className="theft-legend">
          <div className="legend-item-theft">
            <div className="legend-dot-theft" style={{ background: TELKOM_COLORS.danger }}></div>
            <span>Critical Risk (90%+) - {highRiskSites.filter(s => s.riskScore >= 90).length} sites</span>
          </div>
          <div className="legend-item-theft">
            <div className="legend-dot-theft" style={{ background: TELKOM_COLORS.warning }}></div>
            <span>High Risk (85-89%) - {highRiskSites.filter(s => s.riskScore >= 85 && s.riskScore < 90).length} sites</span>
          </div>
          <div className="legend-item-theft">
            <div className="legend-dot-theft" style={{ background: TELKOM_COLORS.primary }}></div>
            <span>Medium Risk (80-84%) - {highRiskSites.filter(s => s.riskScore >= 80 && s.riskScore < 85).length} sites</span>
          </div>
        </div>
      </div>

      {/* High-Risk Sites Detail Cards */}
      <div className="high-risk-sites-section">
        <h3>High-Risk Sites Requiring Action</h3>
        <div className="high-risk-grid">
          {highRiskSites.map(site => (
            <div 
              key={site.id} 
              className="high-risk-card"
              style={{ 
                borderLeftColor: site.riskScore >= 90 ? TELKOM_COLORS.danger : TELKOM_COLORS.warning
              }}
            >
              <div className="risk-card-header">
                <div className="risk-site-info">
                  <MapPin size={20} />
                  <div>
                    <div className="risk-site-id">{site.id}</div>
                    <div className="risk-site-name">{site.name}</div>
                  </div>
                </div>
                <div className="risk-score-badge-large" style={{
                  background: site.riskScore >= 90 ? TELKOM_COLORS.danger : TELKOM_COLORS.warning
                }}>
                  {site.riskScore}% Risk
                </div>
              </div>

              <div className="risk-stats-grid">
                <div className="risk-stat">
                  <span className="risk-stat-label">Incidents:</span>
                  <span className="risk-stat-value">{site.incidentCount}</span>
                </div>
                <div className="risk-stat">
                  <span className="risk-stat-label">Last Incident:</span>
                  <span className="risk-stat-value">{site.lastIncident}</span>
                </div>
                <div className="risk-stat">
                  <span className="risk-stat-label">Scrap Dealers:</span>
                  <span className="risk-stat-value">{site.nearbyScrapDealers}</span>
                </div>
                <div className="risk-stat">
                  <span className="risk-stat-label">Crime Rate:</span>
                  <span className="risk-stat-value" style={{ color: TELKOM_COLORS.danger }}>
                    {site.crimeRate}
                  </span>
                </div>
              </div>

              <div className="vulnerabilities-section">
                <strong>Vulnerabilities:</strong>
                <div className="vulnerability-tags">
                  {site.vulnerabilities.map((vuln, idx) => (
                    <span key={idx} className="vulnerability-tag">{vuln}</span>
                  ))}
                </div>
              </div>

              <div className="security-status-row">
                <div className="security-item">
                  <Camera size={16} />
                  <span className={site.cameraStatus === 'Active' ? 'status-active' : 'status-warning'}>
                    Camera: {site.cameraStatus}
                  </span>
                </div>
                <div className="security-item">
                  <Lock size={16} />
                  <span>{site.securityLevel}</span>
                </div>
              </div>

              <div className="recommended-action-box-theft">
                <strong>🛡️ Recommended Action:</strong>
                <p>{site.recommendedAction}</p>
              </div>

              <div className="potential-loss">
                <span>Potential Loss if Incident Occurs:</span>
                <strong style={{ color: TELKOM_COLORS.danger }}>{site.estimatedLoss}</strong>
              </div>

              <div className="risk-card-actions-theft">
                <button className="action-btn-theft primary">Deploy Response Team</button>
                <button className="action-btn-theft secondary">Update Security</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Incidents */}
      <div className="recent-incidents-section">
        <h3>
          <Activity size={24} style={{ color: TELKOM_COLORS.warning }} />
          Recent Security Incidents
        </h3>
        <div className="incidents-table">
          <div className="incidents-table-header">
            <div className="incidents-cell">Incident ID</div>
            <div className="incidents-cell">Site</div>
            <div className="incidents-cell">Type</div>
            <div className="incidents-cell">Time</div>
            <div className="incidents-cell">Status</div>
            <div className="incidents-cell">Response Time</div>
            <div className="incidents-cell">Outcome</div>
          </div>
          {recentIncidents.map(incident => (
            <div key={incident.id} className="incidents-table-row">
              <div className="incidents-cell">{incident.id}</div>
              <div className="incidents-cell">
                <strong>{incident.site}</strong>
                <br />
                <span className="site-name-small">{incident.siteName}</span>
              </div>
              <div className="incidents-cell">{incident.type}</div>
              <div className="incidents-cell">{incident.timestamp}</div>
              <div className="incidents-cell">
                <span className={`status-badge-incident ${incident.status.toLowerCase()}`}>
                  {incident.status}
                </span>
              </div>
              <div className="incidents-cell">{incident.responseTime}</div>
              <div className="incidents-cell">
                <span style={{ color: incident.outcome === 'Success' ? TELKOM_COLORS.success : TELKOM_COLORS.warning }}>
                  {incident.outcome}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="theft-analytics-grid">
        {/* Prevention Trend */}
        <div className="chart-card-theft">
          <h4>Theft Prevention Effectiveness</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={preventionTrendData}>
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
              <Bar dataKey="prevented" fill={TELKOM_COLORS.success} name="Prevented" radius={[8, 8, 0, 0]} />
              <Bar dataKey="occurred" fill={TELKOM_COLORS.danger} name="Occurred" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="chart-footer-note">
            Prevention Rate: <strong style={{ color: TELKOM_COLORS.success }}>70%</strong> • 
            Target: 60%
          </div>
        </div>

        {/* Risk Factors */}
        <div className="chart-card-theft">
          <h4>AI Risk Assessment Factors</h4>
          <div className="risk-factors-list">
            {riskFactorsData.map((factor, idx) => (
              <div key={idx} className="risk-factor-item">
                <div className="risk-factor-label">{factor.factor}</div>
                <div className="risk-factor-bar-container">
                  <div 
                    className="risk-factor-bar"
                    style={{ 
                      width: `${factor.weight}%`,
                      background: TELKOM_COLORS.danger
                    }}
                  >
                    <span className="risk-factor-value">{factor.weight}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="chart-footer-note">
            AI analyzes 50+ data points for each site risk assessment
          </div>
        </div>
      </div>

      {/* Cost Savings Summary */}
      <div className="cost-savings-theft">
        <h3>💰 Financial Impact - This Month</h3>
        <div className="savings-grid-theft">
          <div className="savings-card-theft">
            <div className="savings-label-theft">Incidents Prevented:</div>
            <div className="savings-value-theft" style={{ color: TELKOM_COLORS.success }}>28</div>
          </div>
          <div className="savings-card-theft">
            <div className="savings-label-theft">Replacement Costs Saved:</div>
            <div className="savings-value-theft" style={{ color: TELKOM_COLORS.success }}>R6.8M</div>
          </div>
          <div className="savings-card-theft">
            <div className="savings-label-theft">Downtime Avoided:</div>
            <div className="savings-value-theft" style={{ color: TELKOM_COLORS.success }}>R1.6M</div>
          </div>
          <div className="savings-card-theft highlight">
            <div className="savings-label-theft">Total Savings:</div>
            <div className="savings-value-theft" style={{ color: TELKOM_COLORS.success, fontSize: '32px' }}>
              R8.4M
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheftPrediction;