import React, { useState } from 'react';
import { InspectionJob } from '../../types/job';
import { useJobStore } from '../../stores/jobStore';
import StatusBadge from '../ui/StatusBadge';

interface InspectionDetailsSidebarProps {
  job: InspectionJob;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  type: 'question' | 'reply' | 'system';
}

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'document';
  url: string;
  uploadedAt: Date;
}

const InspectionDetailsSidebar: React.FC<InspectionDetailsSidebarProps> = ({ job, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'messages' | 'documents'>('overview');
  
  // Mock data for messages and documents
  const messages: Message[] = [
    {
      id: '1',
      sender: 'Customer',
      content: 'Question regarding inspection requirements. Can you clarify the specific standards needed?',
      timestamp: new Date('2025-07-15'),
      type: 'question'
    },
    {
      id: '2',
      sender: 'Inspector',
      content: 'The inspection will follow ISO 13485 standards. Please ensure all required documents are submitted.',
      timestamp: new Date('2025-07-16'),
      type: 'reply'
    }
  ];

  const documents: Document[] = [
    {
      id: '1',
      name: 'Medical Certificate.pdf',
      type: 'pdf',
      url: '#',
      uploadedAt: new Date('2025-07-15')
    },
    {
      id: '2',
      name: 'Inspection Report.pdf',
      type: 'pdf',
      url: '#',
      uploadedAt: new Date('2025-07-20')
    }
  ];

  // Final report document (only show if job is completed)
  const finalReport: Document | null = job.status === 'completed' ? {
    id: 'final-report',
    name: `Final Report - ${job.jobNumber}.pdf`,
    type: 'pdf',
    url: '#',
    uploadedAt: job.actualCompletion || new Date()
  } : null;

  const getStatusIcon = (status: InspectionJob['status']) => {
    switch (status) {
      case 'completed':
        return '✅';
      case 'in_progress':
        return '🔄';
      case 'review':
        return '📋';
      case 'pending':
        return '⏳';
      case 'submitted':
        return '📤';
      case 'rejected':
        return '❌';
      default:
        return '📄';
    }
  };

  const getStatusColor = (status: InspectionJob['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'in_progress':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'review':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'submitted':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'rejected':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white border-l border-gray-200 shadow-xl z-50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-3">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="text-lg font-semibold text-gray-900">Inspection Details</h2>
        </div>
      </div>

      {/* Status and Action Header */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="text-center mb-4">
          <div className="text-4xl mb-2">{getStatusIcon(job.status)}</div>
          <div className="text-sm text-gray-600 mb-2">Status</div>
          <StatusBadge 
            status={job.status}
            className={`status-badge border ${getStatusColor(job.status)}`}
          />
        </div>
        <div className="space-y-2">
          <button className="w-full btn-primary">
            Write a message
          </button>
          <button className="w-full bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Download Report
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {[
          { id: 'overview', label: 'Overview', icon: '📋' },
          { id: 'messages', label: 'Messages', icon: '💬' },
          { id: 'documents', label: 'Documents', icon: '📎' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'overview' && (
          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">Job Number:</span>
                  <span className="text-sm text-gray-900 font-mono">{job.jobNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">Customer:</span>
                  <span className="text-sm text-gray-900">{job.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">Inspection Type:</span>
                  <span className="text-sm text-gray-900">{job.inspectionType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">Priority:</span>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    job.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                    job.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                    job.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {job.priority.charAt(0).toUpperCase() + job.priority.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">Address:</span>
                  <span className="text-sm text-gray-900 text-right">{job.location.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">City:</span>
                  <span className="text-sm text-gray-900">{job.location.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">Country:</span>
                  <span className="text-sm text-gray-900">{job.location.country}</span>
                </div>
              </div>
            </div>

            {/* Dates */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">Submitted:</span>
                  <span className="text-sm text-gray-900">{job.submittedDate.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">Estimated Completion:</span>
                  <span className="text-sm text-gray-900">{job.estimatedCompletion.toLocaleDateString()}</span>
                </div>
                {job.actualCompletion && (
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">Actual Completion:</span>
                    <span className="text-sm text-gray-900">{job.actualCompletion.toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Requirements */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">Type:</span>
                  <span className="text-sm text-gray-900">{job.requirements.type}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Standards:</span>
                  <div className="mt-1">
                    {job.requirements.standards.map((standard, index) => (
                      <span key={index} className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded mr-1 mb-1">
                        {standard}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Required Documents:</span>
                  <div className="mt-1">
                    {job.requirements.documents.map((doc, index) => (
                      <span key={index} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded mr-1 mb-1">
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Inspector */}
            {job.inspectorName && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Inspector</h3>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">Assigned Inspector:</span>
                  <span className="text-sm text-gray-900">{job.inspectorName}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Messages</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700">View all</button>
            </div>
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{message.sender}</span>
                    <span className="text-xs text-gray-500">{message.timestamp.toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-gray-700">{message.content}</p>
                  <div className="mt-2">
                    <button className="text-xs text-blue-600 hover:text-blue-700">Reply</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Documents</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700">Upload</button>
            </div>
            
            {/* Final Report Section */}
            {finalReport && (
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Final Report</h4>
                <div className="flex items-center justify-between p-4 border-2 border-green-200 rounded-lg bg-green-50">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">📋</div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{finalReport.name}</div>
                      <div className="text-xs text-gray-500">Completed {finalReport.uploadedAt.toLocaleDateString()}</div>
                    </div>
                  </div>
                  <button className="text-green-600 hover:text-green-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Submitted Documents */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Submitted Documents</h4>
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">
                        {doc.type === 'pdf' ? '📄' : doc.type === 'image' ? '🖼️' : '📎'}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                        <div className="text-xs text-gray-500">Uploaded {doc.uploadedAt.toLocaleDateString()}</div>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InspectionDetailsSidebar; 