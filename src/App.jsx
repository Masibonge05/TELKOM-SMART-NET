import React, { useState, useEffect } from 'react';
import logo from './assets/smart_net.png';
import { BarChart3, Layers, MapPin, AlertTriangle, FileText, Activity, Zap, DollarSign, Shield, Brain } from 'lucide-react';

// Component Imports
import MetricsGrid from './components/NetworkOverview/MetricsGrid';
import MetricDrillDown from './components/NetworkOverview/MetricDrillDown';
import KPIThreadScore from './components/NetworkOverview/KPIThreadScore';
import SitesMap from './components/Maps/SitesMap';
import HealthcareMap from './components/Maps/HealthcareMap';
import EducationMap from './components/Maps/EducationMap';
import PredictiveDashboard from './components/PredictiveMaintenance/PredictiveDashboard';
import ChurnDashboard from './components/ChurnPrediction/ChurnDashboard';
import RevenueDashboard from './components/RevenueAssurance/RevenueDashboard';
import TheftPrediction from './components/CableSecurity/TheftPrediction';
import RecommendationsPanel from './components/AIInsights/RecommendationsPanel';
import { IndustrySlices, FaultInterrogation, TicketsManagement } from './components/ExistingTabs';

// Import existing original App content
import OriginalOverview from './components/OriginalOverview';

import './App.css';

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
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedMetric, setSelectedMetric] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const tabs = [
    { id: 'overview', label: 'Network Overview', icon: BarChart3 },
    { id: 'kpi', label: 'KPI Dashboard', icon: Activity },
    { id: 'industry', label: 'Industry Slices', icon: Layers },
    { id: 'predictive', label: 'Predictive Maintenance', icon: Zap },
    { id: 'churn', label: 'Churn Prediction', icon: Activity },
    { id: 'revenue', label: 'Revenue Assurance', icon: DollarSign },
    { id: 'security', label: 'Cable Security', icon: Shield },
    { id: 'sites', label: 'Site Management', icon: MapPin },
    { id: 'faults', label: 'Fault Interrogation', icon: AlertTriangle },
    { id: 'tickets', label: 'Tickets', icon: FileText },
    { id: 'ai-insights', label: 'AI Insights', icon: Brain }
  ];

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <div className="logo-container">
            <img src={logo} alt="Smart Net Logo" className="app-logo" />
          </div>
        </div>
        <div className="header-center">
          <h1 className="header-title">AI-Powered 5G Network Intelligence Platform</h1>
          <div className="header-subtitle">
            <span className="status-indicator pulsing"></span>
            <span>All Systems Operational • AI Monitoring Active</span>
          </div>
        </div>
        <div className="header-right">
          <div className="header-time">
            <span>{currentTime.toLocaleTimeString('en-ZA')}</span>
          </div>
          <div className="header-date">
            {currentTime.toLocaleDateString('en-ZA', { 
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
            })}
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="nav-tabs">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              style={{ borderBottomColor: activeTab === tab.id ? TELKOM_COLORS.primary : 'transparent' }}
            >
              <Icon size={20} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {activeTab === 'overview' && (
          <>
            <MetricsGrid onMetricClick={setSelectedMetric} />
            {selectedMetric && (
              <MetricDrillDown 
                metric={selectedMetric} 
                onClose={() => setSelectedMetric(null)} 
              />
            )}
            <OriginalOverview />
          </>
        )}

        {activeTab === 'kpi' && <KPIThreadScore />}

        {activeTab === 'industry' && (
          <>
            <IndustrySlices />
            <div style={{ marginTop: '40px' }}>
              <h2 style={{ fontSize: '24px', marginBottom: '24px', color: '#fff', paddingLeft: '24px' }}>
                Industry-Specific Network Maps
              </h2>
              <HealthcareMap />
              <EducationMap />
              <SitesMap />
            </div>
          </>
        )}

        {activeTab === 'predictive' && <PredictiveDashboard />}
        {activeTab === 'churn' && <ChurnDashboard />}
        {activeTab === 'revenue' && <RevenueDashboard />}
        {activeTab === 'security' && <TheftPrediction />}
        {activeTab === 'sites' && <SitesMap fullScreen />}
        {activeTab === 'faults' && <FaultInterrogation />}
        {activeTab === 'tickets' && <TicketsManagement />}
        {activeTab === 'ai-insights' && <RecommendationsPanel fullScreen />}
      </main>
    </div>
  );
}

export default App;