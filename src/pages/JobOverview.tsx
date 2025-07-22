import React, { useEffect } from 'react';
import { useJobStore } from '../stores/jobStore';
import JobList from '../components/jobs/JobList';
import JobFilters from '../components/jobs/JobFilters';

const JobOverview: React.FC = () => {
  const { 
    jobs, 
    loading, 
    error, 
    setJobs, 
    setLoading, 
    setError 
  } = useJobStore();

  useEffect(() => {
    // TODO: Fetch jobs from API
    const fetchJobs = async () => {
      setLoading(true);
      try {
        // Mock data for now
        const mockJobs = [
          {
            id: '1',
            jobNumber: 'INSP-2025-001',
            customerId: '1',
            customerName: 'Andreas Barthelt',
            inspectionType: 'Medical Treatment',
            status: 'in_progress' as const,
            priority: 'high' as const,
            submittedDate: new Date('2025-07-15'),
            estimatedCompletion: new Date('2025-07-20'),
            inspectorId: '2',
            inspectorName: 'Dr. Michael Bullerjahn',
            location: {
              address: '123 Main St',
              city: 'Hamburg',
              country: 'Germany'
            },
            requirements: {
              type: 'Medical',
              standards: ['ISO 13485'],
              documents: ['Medical Certificate']
            },
            attachments: []
          },
          {
            id: '2',
            jobNumber: 'INSP-2025-002',
            customerId: '2',
            customerName: 'Lina Barthelt',
            inspectionType: 'Dental Treatment',
            status: 'completed' as const,
            priority: 'medium' as const,
            submittedDate: new Date('2025-07-10'),
            estimatedCompletion: new Date('2025-07-15'),
            actualCompletion: new Date('2025-07-14'),
            inspectorId: '2',
            inspectorName: 'Dr. Michael Bullerjahn',
            location: {
              address: '456 Oak Ave',
              city: 'Berlin',
              country: 'Germany'
            },
            requirements: {
              type: 'Dental',
              standards: ['ISO 13485'],
              documents: ['Dental Certificate']
            },
            attachments: []
          }
        ];
        
        setJobs(mockJobs);
      } catch (err) {
        setError('Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [setJobs, setLoading, setError]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <div className="text-lg text-gray-600">Loading jobs...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <div className="text-red-500 text-lg font-medium mb-2">Error loading jobs</div>
          <div className="text-gray-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 lg:p-8 border-b border-gray-100 bg-white shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl lg:text-3xl font-bold text-gray-900 mb-2">Inspection Jobs</h1>
            <p className="text-sm lg:text-base text-gray-600">Manage and track your inspection requests</p>
          </div>
          <button className="btn-primary self-start sm:self-center">
            + Submit New Job
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 lg:p-8 border-b border-gray-100 bg-white">
        <JobFilters />
      </div>

      {/* Job List */}
      <div className="flex-1 overflow-auto bg-gray-50">
        <JobList jobs={jobs} />
      </div>
    </div>
  );
};

export default JobOverview; 