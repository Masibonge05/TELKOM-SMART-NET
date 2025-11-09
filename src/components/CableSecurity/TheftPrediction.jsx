import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { Shield, AlertTriangle, MapPin, Activity, Camera, Lock } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './TheftPrediction.css';

const TELKOM_COLORS = {
  primary: '#00C1DE',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444'
};

const TheftPrediction = () => {
  const [selectedSite, setSelectedSite] = useState(null);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [viewMode, setViewMode] = useState('heatmap'); // 'heatmap' or 'incidents'

  // High-risk sites with theft probability
  const highRiskSites = [
    {
      id: 'RISK-001',
      name: 'Soweto Junction',
      lat: -26.2678,
      lng: 27.8585,
      risk: 94,
      riskLevel: 'critical',
      cableLength: '2.3 km',
      estimatedValue: 'R450K',
      lastIncident: '12 days ago',
      scrapDealersNearby: 8,
      crimeStat: 'High',
      securityLevel: 'Enhanced',
      aiRecommendation: 'Install motion sensors, increase patrol frequency'
    },
    {
      id: 'RISK-002',
      name: 'Alexandra Township',
      lat: -26.1028,
      lng: 28.0989,
      risk: 89,
      riskLevel: 'critical',
      cableLength: '1.8 km',
      estimatedValue: 'R380K',
      lastIncident: '8 days ago',
      scrapDealersNearby: 6,
      crimeStat: 'High',
      securityLevel: 'Standard',
      aiRecommendation: 'Deploy fiber sensors, add CCTV coverage'
    },
    {
      id: 'RISK-003',
      name: 'Cape Flats Region',
      lat: -33.9794,
      lng: 18.6136,
      risk: 87,
      riskLevel: 'critical',
      cableLength: '3.1 km',
      estimatedValue: 'R620K',
      lastIncident: '15 days ago',
      scrapDealersNearby: 12,
      crimeStat: 'Very High',
      securityLevel: 'Enhanced',
      aiRecommendation: 'Underground cable replacement recommended'
    },
    {
      id: 'RISK-004',
      name: 'Durban South',
      lat: -29.9167,
      lng: 30.9833,
      risk: 82,
      riskLevel: 'high',
      cableLength: '2.7 km',
      estimatedValue: 'R540K',
      lastIncident: '22 days ago',
      scrapDealersNearby: 5,
      crimeStat: 'High',
      securityLevel: 'Standard',
      aiRecommendation: 'Install additional lighting, increase patrols'
    },
    {
      id: 'RISK-005',
      name: 'Tembisa Area',
      lat: -25.9953,
      lng: 28.2289,
      risk: 78,
      riskLevel: 'high',
      cableLength: '1.5 km',
      estimatedValue: 'R310K',
      lastIncident: '28 days ago',
      scrapDealersNearby: 4,
      crimeStat: 'Medium',
      securityLevel: 'Standard',
      aiRecommendation: 'Fiber optic sensors recommended'
    },
    {
      id: 'RISK-006',
      name: 'Port Elizabeth Central',
      lat: -33.9608,
      lng: 25.6022,
      risk: 75,
      riskLevel: 'high',
      cableLength: '2.1 km',
      estimatedValue: 'R420K',
      lastIncident: '35 days ago',
      scrapDealersNearby: 7,
      crimeStat: 'Medium',
      securityLevel: 'Enhanced',
      aiRecommendation: 'Continue current monitoring protocol'
    },
    {
      id: 'RISK-007',
      name: 'Bloemfontein North',
      lat: -29.0852,
      lng: 26.1596,
      risk: 68,
      riskLevel: 'medium',
      cableLength: '1.2 km',
      estimatedValue: 'R240K',
      lastIncident: '45 days ago',
      scrapDealersNearby: 3,
      crimeStat: 'Low',
      securityLevel: 'Standard',
      aiRecommendation: 'Regular patrols sufficient'
    },
    {
      id: 'RISK-008',
      name: 'Polokwane Industrial',
      lat: -23.9045,
      lng: 29.4689,
      risk: 62,
      riskLevel: 'medium',
      cableLength: '0.9 km',
      estimatedValue: 'R180K',
      lastIncident: '60+ days ago',
      scrapDealersNearby: 2,
      crimeStat: 'Low',
      securityLevel: 'Standard',
      aiRecommendation: 'Maintain current security measures'
    }
  ];

  // Recent theft incidents
  const recentIncidents = [
    {
      id: 'INC-2025-045',
      lat: -26.2500,
      lng: 27.8700,
      date: '2 hours ago',
      status: 'prevented',
      type: 'Attempted theft detected',
      response: 'Security dispatched in 4 minutes',
      cableValue: 'R45K'
    },
    {
      id: 'INC-2025-044',
      lat: -26.1200,
      lng: 28.0800,
      date: '8 hours ago',
      status: 'prevented',
      type: 'Motion sensor triggered',
      response: 'False alarm - animal movement',
      cableValue: 'N/A'
    },
    {
      id: 'INC-2025-043',
      lat: -33.9900,
      lng: 18.6200,
      date: '1 day ago',
      status: 'loss',
      type: 'Cable theft - 200m',
      response: 'Recovered 50% of cable',
      cableValue: 'R38K loss'
    },
    {
      id: 'INC-2025-042',
      lat: -29.9300,
      lng: 31.0000,
      date: '3 days ago',
      status: 'prevented',
      type: 'Suspicious activity',
      response: 'Security intervention successful',
      cableValue: 'R52K prevented'
    }
  ];

  const createRiskIcon = (risk) => {
    let color = TELKOM_COLORS.success;
    let label = '●';
    
    if (risk >= 85) {
      color = TELKOM_COLORS.danger;
      label = '🚨';
    } else if (risk >= 75) {
      color = TELKOM_COLORS.warning;
      label = '⚠️';
    } else {
      color = TELKOM_COLORS.primary;
      label = '●';
    }

    const size = 10 + (risk / 100) * 6; // Smaller size: 10-16px

    return L.divIcon({
      className: 'custom-risk-marker',
      html: `
        <div style="
          background-color: ${color};
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: ${size - 4}px;
          animation: risk-pulse 2s ease-in-out infinite;
        ">
          <span style="position: absolute; top: -${size + 6}px; font-size: ${size - 2}px;">${label}</span>
        </div>
      `,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  };

  const createIncidentIcon = (status) => {
    const color = status === 'prevented' ? TELKOM_COLORS.success : TELKOM_COLORS.danger;
    const emoji = status === 'prevented' ? '✅' : '❌';
    const size = 10;

    return L.divIcon({
      className: 'custom-incident-marker',
      html: `
        <div style="
          background-color: ${color};
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <span style="position: absolute; top: -${size + 8}px; font-size: ${size}px;">${emoji}</span>
        </div>
      `,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  };

  const getRiskColor = (risk) => {
    if (risk >= 85) return TELKOM_COLORS.danger;
    if (risk >= 75) return TELKOM_COLORS.warning;
    return TELKOM_COLORS.primary;
  };

  const getRiskRadius = (risk) => {
    return 2000 + (risk / 100) * 4000; // Smaller radius: 2-6km
  };

  const preventionMetrics = {
    incidentsPrevented: 28,
    totalValue: 'R1.4M',
    responseTime: '6 min',
    aiAccuracy: 94
  };

  return (
    <div className="theft-prediction-dashboard">
      {/* Header */}
      <div className="theft-header">
        <div className="theft-title">
          <Shield size={32} style={{ color: TELKOM_COLORS.danger }} />
          <div>
            <h2>Cable Security & Theft Prevention</h2>
            <p>AI-powered theft prediction • Real-time monitoring • R1.4M in losses prevented this month</p>
          </div>
        </div>
      </div>

      {/* Prevention Metrics */}
      <div className="prevention-metrics-grid">
        <div className="prevention-card" style={{ borderTopColor: TELKOM_COLORS.success }}>
          <Shield size={24} style={{ color: TELKOM_COLORS.success }} />
          <div className="prevention-value">{preventionMetrics.incidentsPrevented}</div>
          <div className="prevention-label">Incidents Prevented</div>
          <div className="prevention-subtitle">This month</div>
        </div>
        <div className="prevention-card" style={{ borderTopColor: TELKOM_COLORS.success }}>
          <Activity size={24} style={{ color: TELKOM_COLORS.success }} />
          <div className="prevention-value">{preventionMetrics.totalValue}</div>
          <div className="prevention-label">Cable Value Protected</div>
          <div className="prevention-subtitle">Estimated savings</div>
        </div>
        <div className="prevention-card" style={{ borderTopColor: TELKOM_COLORS.primary }}>
          <AlertTriangle size={24} style={{ color: TELKOM_COLORS.primary }} />
          <div className="prevention-value">{preventionMetrics.responseTime}</div>
          <div className="prevention-label">Avg Response Time</div>
          <div className="prevention-subtitle">Security dispatch</div>
        </div>
        <div className="prevention-card" style={{ borderTopColor: TELKOM_COLORS.primary }}>
          <Camera size={24} style={{ color: TELKOM_COLORS.primary }} />
          <div className="prevention-value">{preventionMetrics.aiAccuracy}%</div>
          <div className="prevention-label">AI Detection Accuracy</div>
          <div className="prevention-subtitle">Prediction model</div>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="view-mode-toggle">
        <button 
          className={`toggle-btn ${viewMode === 'heatmap' ? 'active' : ''}`}
          onClick={() => setViewMode('heatmap')}
        >
          <MapPin size={16} />
          Risk Heatmap
        </button>
        <button 
          className={`toggle-btn ${viewMode === 'incidents' ? 'active' : ''}`}
          onClick={() => setViewMode('incidents')}
        >
          <AlertTriangle size={16} />
          Recent Incidents
        </button>
      </div>

      {/* Map */}
      <div className="theft-map-container">
        <div className="map-canvas-real">
          <MapContainer 
            center={[-28.5, 24.5]} 
            zoom={6} 
            style={{ height: '100%', width: '100%', borderRadius: '12px' }}
            className="leaflet-map"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {viewMode === 'heatmap' && highRiskSites.map((site) => {
              const color = getRiskColor(site.risk);
              const radius = getRiskRadius(site.risk);
              
              return (
                <React.Fragment key={site.id}>
                  {/* Risk coverage circle */}
                  <Circle
                    center={[site.lat, site.lng]}
                    radius={radius}
                    pathOptions={{
                      color: color,
                      fillColor: color,
                      fillOpacity: 0.08 + (site.risk / 100) * 0.12,
                      weight: 1
                    }}
                  />
                  
                  {/* Site marker */}
                  <Marker 
                    position={[site.lat, site.lng]}
                    icon={createRiskIcon(site.risk)}
                    eventHandlers={{
                      click: () => setSelectedSite(site)
                    }}
                  >
                    <Popup>
                      <div className="marker-popup">
                        <div className="popup-header-mini" style={{ borderBottomColor: color }}>
                          <Shield size={16} style={{ color }} />
                          <strong>{site.name}</strong>
                        </div>
                        <div className="popup-content-mini">
                          <div><strong>Risk Level:</strong> <span style={{ color }}>{site.risk}%</span></div>
                          <div><strong>Cable Length:</strong> {site.cableLength}</div>
                          <div><strong>Value:</strong> {site.estimatedValue}</div>
                          <div><strong>Last Incident:</strong> {site.lastIncident}</div>
                          <div><strong>Security:</strong> {site.securityLevel}</div>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                </React.Fragment>
              );
            })}

            {viewMode === 'incidents' && recentIncidents.map((incident) => {
              const color = incident.status === 'prevented' ? TELKOM_COLORS.success : TELKOM_COLORS.danger;
              
              return (
                <Marker 
                  key={incident.id}
                  position={[incident.lat, incident.lng]}
                  icon={createIncidentIcon(incident.status)}
                  eventHandlers={{
                    click: () => setSelectedIncident(incident)
                  }}
                >
                  <Popup>
                    <div className="marker-popup">
                      <div className="popup-header-mini" style={{ borderBottomColor: color }}>
                        <AlertTriangle size={16} style={{ color }} />
                        <strong>{incident.type}</strong>
                      </div>
                      <div className="popup-content-mini">
                        <div><strong>ID:</strong> {incident.id}</div>
                        <div><strong>Time:</strong> {incident.date}</div>
                        <div><strong>Status:</strong> <span style={{ color }}>{incident.status.toUpperCase()}</span></div>
                        <div><strong>Response:</strong> {incident.response}</div>
                        <div><strong>Value:</strong> {incident.cableValue}</div>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>

        {/* Legend */}
        <div className="map-legend-box">
          <div className="legend-title">Risk Levels</div>
          <div className="legend-items">
            <div className="legend-item-box">
              <div className="legend-circle" style={{ background: TELKOM_COLORS.danger }}></div>
              <span>Critical (85%+) - {highRiskSites.filter(s => s.risk >= 85).length} sites</span>
            </div>
            <div className="legend-item-box">
              <div className="legend-circle" style={{ background: TELKOM_COLORS.warning }}></div>
              <span>High (75-84%) - {highRiskSites.filter(s => s.risk >= 75 && s.risk < 85).length} sites</span>
            </div>
            <div className="legend-item-box">
              <div className="legend-circle" style={{ background: TELKOM_COLORS.primary }}></div>
              <span>Medium (60-74%) - {highRiskSites.filter(s => s.risk >= 60 && s.risk < 75).length} sites</span>
            </div>
          </div>
        </div>
      </div>

      {/* High Risk Sites List */}
      <div className="high-risk-sites-section">
        <h3>
          <AlertTriangle size={24} style={{ color: TELKOM_COLORS.danger }} />
          High-Risk Sites Requiring Immediate Attention
        </h3>
        <div className="risk-sites-grid">
          {highRiskSites.filter(s => s.risk >= 75).map((site) => (
            <div 
              key={site.id} 
              className="risk-site-card"
              style={{ borderLeftColor: getRiskColor(site.risk) }}
              onClick={() => setSelectedSite(site)}
            >
              <div className="risk-card-header">
                <div className="risk-site-name">
                  <MapPin size={18} />
                  <span>{site.name}</span>
                </div>
                <div className="risk-score" style={{ background: getRiskColor(site.risk) }}>
                  {site.risk}%
                </div>
              </div>
              <div className="risk-card-body">
                <div className="risk-detail-row">
                  <span>Cable Value:</span>
                  <strong>{site.estimatedValue}</strong>
                </div>
                <div className="risk-detail-row">
                  <span>Last Incident:</span>
                  <strong>{site.lastIncident}</strong>
                </div>
                <div className="risk-detail-row">
                  <span>Scrap Dealers Nearby:</span>
                  <strong>{site.scrapDealersNearby}</strong>
                </div>
                <div className="ai-recommendation-box">
                  <Lock size={14} />
                  <span>{site.aiRecommendation}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedSite && (
        <div className="site-detail-overlay" onClick={() => setSelectedSite(null)}>
          <div className="site-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-large" style={{ borderBottomColor: getRiskColor(selectedSite.risk) }}>
              <div>
                <h3>{selectedSite.name}</h3>
                <p>{selectedSite.id} • Risk Level: {selectedSite.risk}%</p>
              </div>
              <button onClick={() => setSelectedSite(null)}>×</button>
            </div>
            <div className="modal-body-large">
              <div className="detail-grid-large">
                <div className="detail-card">
                  <div className="detail-label">Risk Score</div>
                  <div className="detail-value" style={{ color: getRiskColor(selectedSite.risk) }}>
                    {selectedSite.risk}%
                  </div>
                </div>
                <div className="detail-card">
                  <div className="detail-label">Cable Value</div>
                  <div className="detail-value" style={{ fontSize: '20px' }}>{selectedSite.estimatedValue}</div>
                </div>
                <div className="detail-card">
                  <div className="detail-label">Cable Length</div>
                  <div className="detail-value" style={{ fontSize: '20px' }}>{selectedSite.cableLength}</div>
                </div>
                <div className="detail-card">
                  <div className="detail-label">Last Incident</div>
                  <div className="detail-value" style={{ fontSize: '16px' }}>{selectedSite.lastIncident}</div>
                </div>
                <div className="detail-card">
                  <div className="detail-label">Scrap Dealers</div>
                  <div className="detail-value">{selectedSite.scrapDealersNearby}</div>
                </div>
                <div className="detail-card">
                  <div className="detail-label">Crime Statistics</div>
                  <div className="detail-value" style={{ fontSize: '18px' }}>{selectedSite.crimeStat}</div>
                </div>
                <div className="detail-card">
                  <div className="detail-label">Security Level</div>
                  <div className="detail-value" style={{ fontSize: '18px' }}>{selectedSite.securityLevel}</div>
                </div>
                <div className="detail-card" style={{ 
                  gridColumn: 'span 2',
                  background: 'rgba(0, 193, 222, 0.1)',
                  borderColor: 'rgba(0, 193, 222, 0.3)'
                }}>
                  <div className="detail-label" style={{ color: TELKOM_COLORS.primary }}>AI Recommendation</div>
                  <div className="detail-value" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                    💡 {selectedSite.aiRecommendation}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TheftPrediction;