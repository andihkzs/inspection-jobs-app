import React from 'react';
import { InspectionJob } from '../../types/job';
import { useJobStore } from '../../stores/jobStore';

interface ChatHeaderProps {
  job: InspectionJob;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ job }) => {
  const setSelectedJob = useJobStore((state) => state.setSelectedJob);

  const handleClose = () => {
    setSelectedJob(null);
  };

  return (
    <div className="p-6 border-b border-gray-100 bg-white shadow-soft">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {job.inspectionType}
          </h3>
          <p className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-lg inline-block">
            {job.jobNumber}
          </p>
        </div>
        <button
          onClick={handleClose}
          className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-xl hover:bg-gray-100"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatHeader; 