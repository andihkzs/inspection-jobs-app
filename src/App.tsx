import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import JobOverview from './pages/JobOverview';

// Placeholder components with better styling
const PlaceholderPage: React.FC<{ title: string; description: string; icon: string }> = ({ title, description, icon }) => (
  <div className="flex items-center justify-center h-full bg-gray-50">
    <div className="text-center max-w-md mx-auto p-8">
      <div className="text-6xl mb-6">{icon}</div>
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">{title}</h1>
      <p className="text-gray-600 mb-6">{description}</p>
      <button className="btn-primary">
        Coming Soon
      </button>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<JobOverview />} />
          <Route path="/jobs" element={<JobOverview />} />
          <Route 
            path="/new-job" 
            element={
              <PlaceholderPage 
                title="Submit New Job" 
                description="Create a new inspection request with our easy-to-use form"
                icon="📝"
              />
            } 
          />
          <Route 
            path="/inbox" 
            element={
              <PlaceholderPage 
                title="Inbox" 
                description="View and manage your messages and notifications"
                icon="📧"
              />
            } 
          />
          <Route 
            path="/reports" 
            element={
              <PlaceholderPage 
                title="Reports" 
                description="Generate and view detailed inspection reports"
                icon="📊"
              />
            } 
          />
          <Route 
            path="/settings" 
            element={
              <PlaceholderPage 
                title="Settings" 
                description="Configure your account preferences and system settings"
                icon="⚙️"
              />
            } 
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
