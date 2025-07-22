import React from 'react';
import { InspectionJob } from '../../types/job';
import JobCard from './JobCard';

interface JobListProps {
  jobs: InspectionJob[];
}

const JobList: React.FC<JobListProps> = ({ jobs }) => {
  if (jobs.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <div className="text-center">
          <div className="text-6xl mb-4">📋</div>
          <p className="text-lg font-medium mb-2">No jobs found</p>
          <p className="text-sm text-gray-400">Create your first inspection job to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6 p-4 lg:p-6">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobList; 