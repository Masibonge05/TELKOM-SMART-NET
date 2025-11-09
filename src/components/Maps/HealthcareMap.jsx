import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline } from 'react-leaflet';
import { Heart, Activity, Ambulance, Building2 } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Maps.css';

const TELKOM_COLORS = {
  primary: '#00C1DE',
  danger: '#ef4444',
  success: '#10b981',
  warning: '#f59e0b'
};

const HealthcareMap = () => {
  const [selectedFacility, setSelectedFacility] = useState(null);

  const healthcareFacilities = [
    { 
      id: 'HC-001', 
      name: 'Chris Hani Baragwanath Hospital', 
      lat: -26.2678, 
      lng: 27.8585, 
      type: 'hospital', 
      status: 'active', 
      patients: 3200, 
      bandwidth: '1 Gbps', 
      services: 'ICU monitoring, Telemedicine, Emergency',
      beds: 3200,
      staff: 6760
    },
    { 
      id: 'HC-002', 
      name: 'Groote Schuur Hospital', 
      lat: -33.9351, 
      lng: 18.4646, 
      type: 'hospital', 
      status: 'active', 
      patients: 2800, 
      bandwidth: '800 Mbps', 
      services: 'Surgery streaming, Patient records',
      beds: 900,
      staff: 4000
    },
    { 
      id: 'HC-003', 
      name: 'Charlotte Maxeke Hospital', 
      lat: -26.1858, 
      lng: 28.0369, 
      type: 'hospital', 
      status: 'active', 
      patients: 2500, 
      bandwidth: '1 Gbps', 
      services: 'Remote diagnostics, Telemedicine',
      beds: 1088,
      staff: 3500
    },
    { 
      id: 'HC-004', 
      name: 'Inkosi Albert Luthuli Hospital', 
      lat: -29.8469, 
      lng: 31.0144, 
      type: 'hospital', 
      status: 'active', 
      patients: 2100, 
      bandwidth: '750 Mbps', 
      services: 'Critical care monitoring',
      beds: 846,
      staff: 2800
    },
    { 
      id: 'AMB-001', 
      name: 'Emergency Unit - N1 North', 
      lat: -25.9, 
      lng: 28.1, 
      type: 'ambulance', 
      status: 'emergency', 
      patients: 2, 
      bandwidth: '10 Mbps', 
      services: 'Live vitals transmission',
      destination: 'HC-003'
    },
    { 
      id: 'AMB-002', 
      name: 'Emergency Unit - M1 South', 
      lat: -26.3, 
      lng: 28.0, 
      type: 'ambulance', 
      status: 'emergency', 
      patients: 1, 
      bandwidth: '10 Mbps', 
      services: 'Video consultation',
      destination: 'HC-001'
    },
    { 
      id: 'CLI-001', 
      name: 'Sandton Medical Clinic', 
      lat: -26.1076, 
      lng: 28.0567, 
      type: 'clinic', 
      status: 'active', 
      patients: 150, 
      bandwidth: '100 Mbps', 
      services: 'Telemedicine consultations',
      staff: 45
    },
    { 
      id: 'CLI-002', 
      name: 'Stellenbosch Health Centre', 
      lat: -33.9321, 
      lng: 18.8602, 
      type: 'clinic', 
      status: 'active', 
      patients: 120, 
      bandwidth: '100 Mbps', 
      services: 'Remote diagnostics',
      staff: 38
    }
  ];

  const createCustomIcon = (type, status) => {
    let color = TELKOM_COLORS.success;
    let size = 16;
    let emoji = '🏥';

    if (status === 'emergency') {
      color = TELKOM_COLORS.danger;
      size = 14;
      emoji = '🚑';
    } else if (type === 'hospital') {
      color = TELKOM_COLORS.danger;
      size = 20;
      emoji = '🏥';
    } else if (type === 'ambulance') {
      color = TELKOM_COLORS.danger;
      size = 14;
      emoji = '🚑';
    } else if (type === 'clinic') {
      color = TELKOM_COLORS.success;
      size = 14;
      emoji = '💚';
    }

    return L.divIcon({
      className: 'custom-healthcare-marker',
      html: `
        <div style="
          background-color: ${color};
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: ${size - 4}px;
          ${status === 'emergency' ? 'animation: emergency-pulse 1s ease-in-out infinite;' : 'animation: pulse 2s ease-in-out infinite;'}
        ">
          <span style="position: absolute; top: -${size + 8}px; font-size: ${size}px;">${emoji}</span>
        </div>
      `,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  };

  // Get connection lines between ambulances and hospitals
  const getConnectionLines = () => {
    const lines = [];
    healthcareFacilities.filter(f => f.type === 'ambulance').forEach(ambulance => {
      const hospital = healthcareFacilities.find(h => h.id === ambulance.destination);
      if (hospital) {
        lines.push({
          positions: [
            [ambulance.lat, ambulance.lng],
            [hospital.lat, hospital.lng]
          ],
          ambulance: ambulance.name,
          hospital: hospital.name
        });
      }
    });
    return lines;
  };

  return (
    <div className="healthcare-map-container">
      <div className="map-header">
        <div className="map-title">
          <Heart size={24} style={{ color: TELKOM_COLORS.danger }} />
          <h3>Healthcare Network - Mission Critical Services</h3>
        </div>
        <div className="healthcare-stats">
          <div className="health-stat">
            <Building2 size={18} />
            <span>{healthcareFacilities.filter(f => f.type === 'hospital').length} Hospitals</span>
          </div>
          <div className="health-stat">
            <Ambulance size={18} />
            <span>{healthcareFacilities.filter(f => f.type === 'ambulance').length} Active Ambulances</span>
          </div>
          <div className="health-stat">
            <Heart size={18} />
            <span>{healthcareFacilities.filter(f => f.type === 'clinic').length} Clinics</span>
          </div>
        </div>
      </div>

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
          
          {/* Connection lines between ambulances and hospitals */}
          {getConnectionLines().map((line, idx) => (
            <Polyline
              key={idx}
              positions={line.positions}
              pathOptions={{
                color: TELKOM_COLORS.danger,
                weight: 3,
                opacity: 0.6,
                dashArray: '10, 10'
              }}
            >
              <Popup>
                <div className="marker-popup">
                  <div className="popup-header-mini" style={{ borderBottomColor: TELKOM_COLORS.danger }}>
                    <Ambulance size={16} style={{ color: TELKOM_COLORS.danger }} />
                    <strong>Emergency Route</strong>
                  </div>
                  <div className="popup-content-mini">
                    <div><strong>From:</strong> {line.ambulance}</div>
                    <div><strong>To:</strong> {line.hospital}</div>
                    <div><strong>Status:</strong> <span style={{ color: TELKOM_COLORS.danger }}>ACTIVE</span></div>
                  </div>
                </div>
              </Popup>
            </Polyline>
          ))}

          {/* Facility markers */}
          {healthcareFacilities.map((facility) => {
            const color = facility.status === 'emergency' || facility.type === 'hospital' ? TELKOM_COLORS.danger : TELKOM_COLORS.success;
            const radius = facility.type === 'hospital' ? 20000 : facility.type === 'ambulance' ? 5000 : 10000;
            
            return (
              <React.Fragment key={facility.id}>
                {/* Coverage circle */}
                {facility.status !== 'emergency' && (
                  <Circle
                    center={[facility.lat, facility.lng]}
                    radius={radius}
                    pathOptions={{
                      color: color,
                      fillColor: color,
                      fillOpacity: 0.1,
                      weight: 1,
                      dashArray: facility.type === 'clinic' ? '5, 5' : undefined
                    }}
                  />
                )}
                
                {/* Facility marker */}
                <Marker 
                  position={[facility.lat, facility.lng]}
                  icon={createCustomIcon(facility.type, facility.status)}
                  eventHandlers={{
                    click: () => setSelectedFacility(facility)
                  }}
                >
                  <Popup>
                    <div className="marker-popup">
                      <div className="popup-header-mini" style={{ borderBottomColor: color }}>
                        {facility.type === 'hospital' && <Building2 size={16} style={{ color }} />}
                        {facility.type === 'ambulance' && <Ambulance size={16} style={{ color }} />}
                        {facility.type === 'clinic' && <Heart size={16} style={{ color }} />}
                        <strong>{facility.name}</strong>
                      </div>
                      <div className="popup-content-mini">
                        <div><strong>ID:</strong> {facility.id}</div>
                        <div><strong>Type:</strong> {facility.type.toUpperCase()}</div>
                        <div><strong>Status:</strong> <span style={{ color }}>{facility.status === 'emergency' ? '🚨 EMERGENCY' : '✓ Active'}</span></div>
                        <div><strong>Patients:</strong> {facility.patients}</div>
                        <div><strong>Bandwidth:</strong> {facility.bandwidth}</div>
                        <div><strong>Services:</strong> <span style={{ fontSize: '11px' }}>{facility.services}</span></div>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              </React.Fragment>
            );
          })}
        </MapContainer>
      </div>

      <div className="map-footer healthcare-footer">
        <div className="alert-box">
          🚨 <strong>{healthcareFacilities.filter(f => f.type === 'ambulance').length} Emergency Transports Active</strong> - Guaranteed 10 Mbps bandwidth per ambulance • 99.999% uptime
        </div>
      </div>

      {/* Detail Modal */}
      {selectedFacility && (
        <div className="site-detail-overlay" onClick={() => setSelectedFacility(null)}>
          <div className="site-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-large" style={{ borderBottomColor: selectedFacility.status === 'emergency' ? TELKOM_COLORS.danger : TELKOM_COLORS.success }}>
              <div>
                <h3>{selectedFacility.name}</h3>
                <p>{selectedFacility.id} • {selectedFacility.type.toUpperCase()}</p>
              </div>
              <button onClick={() => setSelectedFacility(null)}>×</button>
            </div>
            <div className="modal-body-large">
              <div className="detail-grid-large">
                <div className="detail-card">
                  <div className="detail-label">Status</div>
                  <div className="detail-value" style={{ color: selectedFacility.status === 'emergency' ? TELKOM_COLORS.danger : TELKOM_COLORS.success }}>
                    {selectedFacility.status === 'emergency' ? '🚨 EMERGENCY' : '✓ Active'}
                  </div>
                </div>
                <div className="detail-card">
                  <div className="detail-label">Patients/Capacity</div>
                  <div className="detail-value">{selectedFacility.patients}</div>
                </div>
                <div className="detail-card">
                  <div className="detail-label">Bandwidth</div>
                  <div className="detail-value" style={{ fontSize: '20px' }}>{selectedFacility.bandwidth}</div>
                </div>
                {selectedFacility.beds && (
                  <div className="detail-card">
                    <div className="detail-label">Hospital Beds</div>
                    <div className="detail-value">{selectedFacility.beds}</div>
                  </div>
                )}
                {selectedFacility.staff && (
                  <div className="detail-card">
                    <div className="detail-label">Medical Staff</div>
                    <div className="detail-value">{selectedFacility.staff}</div>
                  </div>
                )}
                <div className="detail-card" style={{ gridColumn: 'span 2' }}>
                  <div className="detail-label">Services Available</div>
                  <div className="detail-value" style={{ fontSize: '14px', lineHeight: '1.6' }}>{selectedFacility.services}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthcareMap;