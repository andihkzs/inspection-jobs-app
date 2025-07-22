import React from 'react';
import { InspectionJob } from '../../types/job';
import { useJobStore } from '../../stores/jobStore';
import StatusBadge from '../ui/StatusBadge';

interface JobCardProps {
  job: InspectionJob;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const setSelectedJob = useJobStore((state) => state.setSelectedJob);

  const handleClick = () => {
    setSelectedJob(job);
  };

  const getStatusColor = (status: InspectionJob['status']) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'in_progress':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'review':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'rejected':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: InspectionJob['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-400';
      case 'high':
        return 'bg-orange-400';
      case 'medium':
        return 'bg-yellow-400';
      case 'low':
        return 'bg-green-400';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div 
      className="card hover:shadow-soft-lg transition-all duration-200 cursor-pointer transform hover:-translate-y-1 group"
      onClick={handleClick}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-3 mb-3">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {job.inspectionType}
            </h3>
            <span className={`inline-block w-3 h-3 rounded-full ${getPriorityColor(job.priority)} shadow-sm flex-shrink-0`} />
          </div>
          
          <div className="text-sm text-gray-600 space-y-2 mb-3">
            <p className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
              <span className="font-medium text-gray-700">Job Number:</span>
              <span className="bg-gray-50 px-2 py-1 rounded-lg text-xs font-mono break-all">{job.jobNumber}</span>
            </p>
            <p className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
              <span className="font-medium text-gray-700">Customer:</span>
              <span className="truncate">{job.customerName}</span>
            </p>
            <p className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
              <span className="font-medium text-gray-700">Location:</span>
              <span className="truncate">{job.location.city}, {job.location.country}</span>
            </p>
            <p className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
              <span className="font-medium text-gray-700">Submitted:</span>
              <span>{job.submittedDate.toLocaleDateString()}</span>
            </p>
            {job.inspectorName && (
              <p className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                <span className="font-medium text-gray-700">Inspector:</span>
                <span className="truncate">{job.inspectorName}</span>
              </p>
            )}
          </div>
        </div>
        
        <div className="flex flex-row sm:flex-col items-center sm:items-end space-x-3 sm:space-x-0 sm:space-y-3">
          <StatusBadge 
            status={job.status}
            className={`status-badge border ${getStatusColor(job.status)}`}
          />
          <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 flex-shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default JobCard; 