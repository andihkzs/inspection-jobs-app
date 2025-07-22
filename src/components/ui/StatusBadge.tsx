import React from 'react';
import { InspectionJob } from '../../types/job';

interface StatusBadgeProps {
  status: InspectionJob['status'];
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const getStatusLabel = (status: InspectionJob['status']) => {
    switch (status) {
      case 'submitted':
        return 'Submitted';
      case 'pending':
        return 'Pending';
      case 'in_progress':
        return 'In Progress';
      case 'review':
        return 'Under Review';
      case 'completed':
        return 'Completed';
      case 'rejected':
        return 'Rejected';
      default:
        return status;
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {getStatusLabel(status)}
    </span>
  );
};

export default StatusBadge; 