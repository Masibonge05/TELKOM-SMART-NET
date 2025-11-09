import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { MapPin, Server, AlertTriangle, CheckCircle, Activity } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Maps.css';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const TELKOM_COLORS = {
  primary: '#00C1DE',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  secondary: '#0077C8'
};

const SitesMap = ({ fullScreen = false }) => {
  const [selectedSite, setSelectedSite] = useState(null);

  // South African provinces with site data (real coordinates)
  const sitesData = [
    // Gauteng
    { id: 'GT-001', name: 'Johannesburg Central', lat: -26.2041, lng: 28.0473, province: 'Gauteng', status: 'optimal', health: 98, users: 45000, devices: 234 },
    { id: 'GT-002', name: 'Pretoria East', lat: -25.7479, lng: 28.2293, province: 'Gauteng', status: 'optimal', health: 96, users: 38000, devices: 198 },
    { id: 'GT-003', name: 'Sandton', lat: -26.1076, lng: 28.0567, province: 'Gauteng', status: 'optimal', health: 99, users: 52000, devices: 287 },
    { id: 'GT-004', name: 'Soweto', lat: -26.2678, lng: 27.8585, province: 'Gauteng', status: 'warning', health: 84, users: 41000, devices: 176 },
    
    // Western Cape
    { id: 'WC-001', name: 'Cape Town CBD', lat: -33.9249, lng: 18.4241, province: 'Western Cape', status: 'warning', health: 82, users: 48000, devices: 312 },
    { id: 'WC-002', name: 'Stellenbosch', lat: -33.9321, lng: 18.8602, province: 'Western Cape', status: 'optimal', health: 94, users: 25000, devices: 156 },
    { id: 'WC-003', name: 'Paarl', lat: -33.7341, lng: 18.9645, province: 'Western Cape', status: 'optimal', health: 91, users: 18000, devices: 134 },
    
    // KwaZulu-Natal
    { id: 'KZN-001', name: 'Durban North', lat: -29.8587, lng: 31.0218, province: 'KwaZulu-Natal', status: 'critical', health: 68, users: 39000, devices: 287 },
    { id: 'KZN-002', name: 'Pietermaritzburg', lat: -29.6167, lng: 30.3833, province: 'KwaZulu-Natal', status: 'optimal', health: 93, users: 28000, devices: 201 },
    
    // Eastern Cape
    { id: 'EC-001', name: 'Port Elizabeth', lat: -33.9608, lng: 25.6022, province: 'Eastern Cape', status: 'maintenance', health: 0, users: 0, devices: 0 },
    { id: 'EC-002', name: 'East London', lat: -32.9833, lng: 27.8667, province: 'Eastern Cape', status: 'optimal', health: 89, users: 22000, devices: 167 },
    
    // Free State
    { id: 'FS-001', name: 'Bloemfontein', lat: -29.1211, lng: 26.2140, province: 'Free State', status: 'optimal', health: 92, users: 31000, devices: 189 },
    
    // Mpumalanga
    { id: 'MP-001', name: 'Nelspruit', lat: -25.4753, lng: 30.9700, province: 'Mpumalanga', status: 'optimal', health: 91, users: 24000, devices: 143 },
    
    // Limpopo
    { id: 'LP-001', name: 'Polokwane', lat: -23.9045, lng: 29.4689, province: 'Limpopo', status: 'optimal', health: 88, users: 26000, devices: 154 },
    
    // North West
    { id: 'NW-001', name: 'Mahikeng', lat: -25.8694, lng: 25.6444, province: 'North West', status: 'warning', health: 79, users: 19000, devices: 98 },
    
    // Northern Cape
    { id: 'NC-001', name: 'Kimberley', lat: -28.7282, lng: 24.7499, province: 'Northern Cape', status: 'optimal', health: 90, users: 17000, devices: 121 }
  ];

  const statusConfig = {
    optimal: { color: TELKOM_COLORS.success, icon: CheckCircle, label: 'Optimal' },
    warning: { color: TELKOM_COLORS.warning, icon: AlertTriangle, label: 'Warning' },
    critical: { color: TELKOM_COLORS.danger, icon: AlertTriangle, label: 'Critical' },
    maintenance: { color: TELKOM_COLORS.secondary, icon: Activity, label: 'Maintenance' }
  };

  // Create custom marker icons
  const createCustomIcon = (color) => {
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="
        background-color: ${color};
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        animation: pulse 2s ease-in-out infinite;
      "></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
  };

  return (
    <div className={`sites-map-container ${fullScreen ? 'fullscreen' : ''}`}>
      <div className="map-header">
        <div className="map-title">
          <MapPin size={24} style={{ color: TELKOM_COLORS.primary }} />
          <h3>Live Network Sites Map - South Africa</h3>
        </div>
        <div className="map-legend">
          <div className="legend-item">
            <div className="legend-dot" style={{ background: TELKOM_COLORS.success }}></div>
            <span>Optimal ({sitesData.filter(s => s.status === 'optimal').length})</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{ background: TELKOM_COLORS.warning }}></div>
            <span>Warning ({sitesData.filter(s => s.status === 'warning').length})</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{ background: TELKOM_COLORS.danger }}></div>
            <span>Critical ({sitesData.filter(s => s.status === 'critical').length})</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{ background: TELKOM_COLORS.secondary }}></div>
            <span>Maintenance ({sitesData.filter(s => s.status === 'maintenance').length})</span>
          </div>
        </div>
      </div>

      <div className="map-canvas-real">
        <MapContainer 
          center={[-28.5, 24.5]} 
          zoom={6} 
          style={{ height: '600px', width: '100%', borderRadius: '12px' }}
          className="leaflet-map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {sitesData.map((site) => {
            const config = statusConfig[site.status];
            const StatusIcon = config.icon;
            
            return (
              <React.Fragment key={site.id}>
                {/* Circle overlay for coverage area */}
                {site.status !== 'maintenance' && (
                  <Circle
                    center={[site.lat, site.lng]}
                    radius={15000} // 15km coverage radius
                    pathOptions={{
                      color: config.color,
                      fillColor: config.color,
                      fillOpacity: 0.1,
                      weight: 1
                    }}
                  />
                )}
                
                {/* Site marker */}
                <Marker 
                  position={[site.lat, site.lng]}
                  icon={createCustomIcon(config.color)}
                  eventHandlers={{
                    click: () => setSelectedSite(site)
                  }}
                >
                  <Popup>
                    <div className="marker-popup">
                      <div className="popup-header-mini" style={{ borderBottomColor: config.color }}>
                        <StatusIcon size={16} style={{ color: config.color }} />
                        <strong>{site.name}</strong>
                      </div>
                      <div className="popup-content-mini">
                        <div><strong>ID:</strong> {site.id}</div>
                        <div><strong>Province:</strong> {site.province}</div>
                        <div><strong>Health:</strong> <span style={{ color: config.color }}>{site.health}%</span></div>
                        <div><strong>Users:</strong> {site.users.toLocaleString()}</div>
                        <div><strong>Devices:</strong> {site.devices}</div>
                        <div><strong>Status:</strong> <span style={{ color: config.color }}>{config.label}</span></div>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              </React.Fragment>
            );
          })}
        </MapContainer>
      </div>

      {/* Summary stats */}
      <div className="map-footer">
        <div className="map-stat">
          <Server size={20} style={{ color: TELKOM_COLORS.primary }} />
          <div>
            <div className="stat-value">{sitesData.length}</div>
            <div className="stat-label">Total Sites</div>
          </div>
        </div>
        <div className="map-stat">
          <CheckCircle size={20} style={{ color: TELKOM_COLORS.success }} />
          <div>
            <div className="stat-value">{sitesData.filter(s => s.status === 'optimal').length}</div>
            <div className="stat-label">Operational</div>
          </div>
        </div>
        <div className="map-stat">
          <Activity size={20} style={{ color: TELKOM_COLORS.primary }} />
          <div>
            <div className="stat-value">{sitesData.reduce((sum, s) => sum + s.users, 0).toLocaleString()}</div>
            <div className="stat-label">Total Users</div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedSite && (
        <div className="site-detail-overlay" onClick={() => setSelectedSite(null)}>
          <div className="site-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-large" style={{ borderBottomColor: statusConfig[selectedSite.status].color }}>
              <div>
                <h3>{selectedSite.name}</h3>
                <p>{selectedSite.id} • {selectedSite.province}</p>
              </div>
              <button onClick={() => setSelectedSite(null)}>×</button>
            </div>
            <div className="modal-body-large">
              <div className="detail-grid-large">
                <div className="detail-card">
                  <div className="detail-label">Status</div>
                  <div className="detail-value" style={{ color: statusConfig[selectedSite.status].color }}>
                    {statusConfig[selectedSite.status].label}
                  </div>
                </div>
                <div className="detail-card">
                  <div className="detail-label">Health Score</div>
                  <div className="detail-value">{selectedSite.health}%</div>
                </div>
                <div className="detail-card">
                  <div className="detail-label">Active Users</div>
                  <div className="detail-value">{selectedSite.users.toLocaleString()}</div>
                </div>
                <div className="detail-card">
                  <div className="detail-label">Connected Devices</div>
                  <div className="detail-value">{selectedSite.devices}</div>
                </div>
                <div className="detail-card">
                  <div className="detail-label">Latitude</div>
                  <div className="detail-value">{selectedSite.lat.toFixed(4)}°</div>
                </div>
                <div className="detail-card">
                  <div className="detail-label">Longitude</div>
                  <div className="detail-value">{selectedSite.lng.toFixed(4)}°</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SitesMap;