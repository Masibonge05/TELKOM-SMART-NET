import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { GraduationCap, School, BookOpen } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Maps.css';

const TELKOM_COLORS = {
  primary: '#00C1DE',
  warning: '#f59e0b',
  success: '#10b981'
};

const EducationMap = () => {
  const [selectedSchool, setSelectedSchool] = useState(null);

  const educationFacilities = [
    { 
      id: 'EDU-001', 
      name: 'University of Johannesburg', 
      lat: -26.1858, 
      lng: 28.0369, 
      type: 'university', 
      students: 8500, 
      status: 'active', 
      exams: true,
      bandwidth: '2 Gbps',
      campuses: 4
    },
    { 
      id: 'EDU-002', 
      name: 'University of Cape Town', 
      lat: -33.9577, 
      lng: 18.4610, 
      type: 'university', 
      students: 12000, 
      status: 'active', 
      exams: false,
      bandwidth: '3 Gbps',
      campuses: 6
    },
    { 
      id: 'EDU-003', 
      name: 'University of Pretoria', 
      lat: -25.7545, 
      lng: 28.2314, 
      type: 'university', 
      students: 9200, 
      status: 'active', 
      exams: true,
      bandwidth: '2.5 Gbps',
      campuses: 7
    },
    { 
      id: 'EDU-004', 
      name: 'University of KwaZulu-Natal', 
      lat: -29.8688, 
      lng: 30.9822, 
      type: 'university', 
      students: 7800, 
      status: 'active', 
      exams: false,
      bandwidth: '2 Gbps',
      campuses: 5
    },
    { 
      id: 'SCH-001', 
      name: 'Johannesburg High School', 
      lat: -26.2041, 
      lng: 28.0473, 
      type: 'school', 
      students: 1200, 
      status: 'active', 
      exams: false,
      bandwidth: '500 Mbps',
      grades: '8-12'
    },
    { 
      id: 'SCH-002', 
      name: 'Cape Town Secondary', 
      lat: -33.9249, 
      lng: 18.4241, 
      type: 'school', 
      students: 980, 
      status: 'active', 
      exams: true,
      bandwidth: '500 Mbps',
      grades: '8-12'
    },
    { 
      id: 'SCH-003', 
      name: 'Durban Academy', 
      lat: -29.8587, 
      lng: 31.0218, 
      type: 'school', 
      students: 850, 
      status: 'active', 
      exams: false,
      bandwidth: '400 Mbps',
      grades: '1-12'
    },
    { 
      id: 'SCH-004', 
      name: 'Pretoria College', 
      lat: -25.7479, 
      lng: 28.2293, 
      type: 'school', 
      students: 1100, 
      status: 'active', 
      exams: true,
      bandwidth: '600 Mbps',
      grades: '8-12'
    },
    { 
      id: 'RUR-001', 
      name: 'Limpopo Rural School Network', 
      lat: -23.9045, 
      lng: 29.4689, 
      type: 'rural', 
      students: 450, 
      status: 'active', 
      exams: false,
      bandwidth: '200 Mbps',
      schools: 12
    },
    { 
      id: 'RUR-002', 
      name: 'Eastern Cape Rural Hub', 
      lat: -32.9833, 
      lng: 27.8667, 
      type: 'rural', 
      students: 380, 
      status: 'active', 
      exams: false,
      bandwidth: '150 Mbps',
      schools: 8
    }
  ];

  const createCustomIcon = (type, exams) => {
    let color = TELKOM_COLORS.primary;
    let size = 16;
    let emoji = '🎓';

    if (exams) {
      color = TELKOM_COLORS.warning;
      emoji = '📝';
    } else if (type === 'university') {
      color = TELKOM_COLORS.primary;
      size = 20;
      emoji = '🎓';
    } else if (type === 'school') {
      color = TELKOM_COLORS.success;
      size = 16;
      emoji = '🏫';
    } else if (type === 'rural') {
      color = '#8b92a7';
      size = 14;
      emoji = '📚';
    }

    return L.divIcon({
      className: 'custom-education-marker',
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
          ${exams ? 'animation: exam-pulse 1.5s ease-in-out infinite;' : 'animation: pulse 2s ease-in-out infinite;'}
        ">
          <span style="position: absolute; top: -${size + 8}px; font-size: ${size}px;">${emoji}</span>
        </div>
      `,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  };

  return (
    <div className="education-map-container">
      <div className="map-header">
        <div className="map-title">
          <GraduationCap size={24} style={{ color: TELKOM_COLORS.primary }} />
          <h3>Education Network - Digital Learning Infrastructure</h3>
        </div>
        <div className="education-stats">
          <div className="edu-stat">
            <BookOpen size={18} />
            <span>{educationFacilities.filter(f => f.type === 'university').length} Universities</span>
          </div>
          <div className="edu-stat">
            <School size={18} />
            <span>{educationFacilities.filter(f => f.type === 'school').length} Schools</span>
          </div>
          <div className="edu-stat">
            <GraduationCap size={18} />
            <span>{educationFacilities.reduce((sum, f) => sum + f.students, 0).toLocaleString()} Students Online</span>
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

          {/* Education facility markers */}
          {educationFacilities.map((school) => {
            const color = school.exams ? TELKOM_COLORS.warning : 
                         school.type === 'university' ? TELKOM_COLORS.primary : 
                         school.type === 'school' ? TELKOM_COLORS.success : '#8b92a7';
            
            const radius = school.type === 'university' ? 25000 : 
                          school.type === 'school' ? 15000 : 30000;
            
            return (
              <React.Fragment key={school.id}>
                {/* Coverage circle */}
                <Circle
                  center={[school.lat, school.lng]}
                  radius={radius}
                  pathOptions={{
                    color: color,
                    fillColor: color,
                    fillOpacity: school.exams ? 0.15 : 0.08,
                    weight: school.exams ? 2 : 1,
                    dashArray: school.type === 'rural' ? '5, 5' : undefined
                  }}
                />
                
                {/* School marker */}
                <Marker 
                  position={[school.lat, school.lng]}
                  icon={createCustomIcon(school.type, school.exams)}
                  eventHandlers={{
                    click: () => setSelectedSchool(school)
                  }}
                >
                  <Popup>
                    <div className="marker-popup">
                      <div className="popup-header-mini" style={{ borderBottomColor: color }}>
                        {school.type === 'university' && <GraduationCap size={16} style={{ color }} />}
                        {school.type === 'school' && <School size={16} style={{ color }} />}
                        {school.type === 'rural' && <BookOpen size={16} style={{ color }} />}
                        <strong>{school.name}</strong>
                      </div>
                      <div className="popup-content-mini">
                        <div><strong>ID:</strong> {school.id}</div>
                        <div><strong>Type:</strong> {school.type.toUpperCase()}</div>
                        <div><strong>Students:</strong> {school.students.toLocaleString()}</div>
                        <div><strong>Bandwidth:</strong> {school.bandwidth}</div>
                        <div><strong>Status:</strong> <span style={{ color }}>{school.exams ? '📝 EXAM MODE' : '✓ Active'}</span></div>
                        {school.exams && (
                          <div style={{ marginTop: '8px', padding: '8px', background: 'rgba(245, 158, 11, 0.2)', borderRadius: '6px', fontSize: '11px' }}>
                            <strong>Zero-rated data active</strong><br/>
                            Capacity boosted to 18%
                          </div>
                        )}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              </React.Fragment>
            );
          })}
        </MapContainer>
      </div>

      <div className="map-footer education-footer">
        <div className="alert-box exam-alert">
          📝 <strong>{educationFacilities.filter(f => f.exams).length} Institutions in Exam Mode</strong> - Zero-rated data active • Capacity boosted to 18% • {educationFacilities.filter(f => f.exams).reduce((sum, f) => sum + f.students, 0).toLocaleString()} students supported
        </div>
      </div>

      {/* Detail Modal */}
      {selectedSchool && (
        <div className="site-detail-overlay" onClick={() => setSelectedSchool(null)}>
          <div className="site-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-large" style={{ borderBottomColor: selectedSchool.exams ? TELKOM_COLORS.warning : TELKOM_COLORS.primary }}>
              <div>
                <h3>{selectedSchool.name}</h3>
                <p>{selectedSchool.id} • {selectedSchool.type.toUpperCase()}</p>
              </div>
              <button onClick={() => setSelectedSchool(null)}>×</button>
            </div>
            <div className="modal-body-large">
              <div className="detail-grid-large">
                <div className="detail-card">
                  <div className="detail-label">Students Online</div>
                  <div className="detail-value">{selectedSchool.students.toLocaleString()}</div>
                </div>
                <div className="detail-card">
                  <div className="detail-label">Bandwidth</div>
                  <div className="detail-value" style={{ fontSize: '20px' }}>{selectedSchool.bandwidth}</div>
                </div>
                <div className="detail-card">
                  <div className="detail-label">Status</div>
                  <div className="detail-value" style={{ 
                    fontSize: '16px',
                    color: selectedSchool.exams ? TELKOM_COLORS.warning : TELKOM_COLORS.success 
                  }}>
                    {selectedSchool.exams ? '📝 Exam Mode' : '✓ Active'}
                  </div>
                </div>
                {selectedSchool.campuses && (
                  <div className="detail-card">
                    <div className="detail-label">Campuses</div>
                    <div className="detail-value">{selectedSchool.campuses}</div>
                  </div>
                )}
                {selectedSchool.grades && (
                  <div className="detail-card">
                    <div className="detail-label">Grades</div>
                    <div className="detail-value" style={{ fontSize: '20px' }}>{selectedSchool.grades}</div>
                  </div>
                )}
                {selectedSchool.schools && (
                  <div className="detail-card">
                    <div className="detail-label">Connected Schools</div>
                    <div className="detail-value">{selectedSchool.schools}</div>
                  </div>
                )}
                {selectedSchool.exams && (
                  <div className="detail-card" style={{ 
                    gridColumn: 'span 2',
                    background: 'rgba(245, 158, 11, 0.15)',
                    borderColor: 'rgba(245, 158, 11, 0.3)'
                  }}>
                    <div className="detail-label" style={{ color: TELKOM_COLORS.warning }}>Exam Mode Benefits</div>
                    <div className="detail-value" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                      ✓ Zero-rated data<br/>
                      ✓ Priority bandwidth (18% capacity)<br/>
                      ✓ Enhanced connection stability
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationMap;