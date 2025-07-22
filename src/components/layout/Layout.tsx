import React, { useState } from 'react';
import Sidebar from './Sidebar';
import InspectionDetailsSidebar from '../jobs/InspectionDetailsSidebar';
import { useJobStore } from '../../stores/jobStore';

interface LayoutProps {
  children: React.ReactNode;
  showChat?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showChat = true }) => {
  const selectedJob = useJobStore((state) => state.selectedJob);
  const setSelectedJob = useJobStore((state) => state.setSelectedJob);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-xl shadow-soft"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="mobile-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:relative z-50 h-full ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>
      
      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden w-full lg:w-auto">
        {/* Center Panel */}
        <div className="flex-1 overflow-auto p-4 lg:p-6 w-full">
          {children}
        </div>
        
        {/* Right Panel - Inspection Details or Chat */}
        {selectedJob && (
          <div className="hidden lg:block w-96 border-l border-gray-200 bg-white">
            <InspectionDetailsSidebar 
              job={selectedJob} 
              onClose={() => setSelectedJob(null)} 
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Layout; 