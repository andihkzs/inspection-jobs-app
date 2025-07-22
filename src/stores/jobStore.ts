import { create } from 'zustand';
import { InspectionJob, JobFilters } from '../types/job';

interface JobState {
  jobs: InspectionJob[];
  selectedJob: InspectionJob | null;
  filters: JobFilters;
  loading: boolean;
  error: string | null;
  
  // Actions
  setJobs: (jobs: InspectionJob[]) => void;
  setSelectedJob: (job: InspectionJob | null) => void;
  setFilters: (filters: JobFilters) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Computed
  filteredJobs: InspectionJob[];
  getJobById: (id: string) => InspectionJob | undefined;
}

export const useJobStore = create<JobState>((set, get) => ({
  jobs: [],
  selectedJob: null,
  filters: {},
  loading: false,
  error: null,
  
  setJobs: (jobs) => set({ jobs }),
  setSelectedJob: (job) => set({ selectedJob: job }),
  setFilters: (filters) => set({ filters }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  
  get filteredJobs() {
    const { jobs, filters } = get();
    let filtered = [...jobs];
    
    if (filters.status) {
      filtered = filtered.filter(job => job.status === filters.status);
    }
    
    if (filters.priority) {
      filtered = filtered.filter(job => job.priority === filters.priority);
    }
    
    if (filters.inspectionType) {
      filtered = filtered.filter(job => job.inspectionType === filters.inspectionType);
    }
    
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(job => 
        job.jobNumber.toLowerCase().includes(search) ||
        job.customerName.toLowerCase().includes(search) ||
        job.inspectionType.toLowerCase().includes(search)
      );
    }
    
    return filtered.sort((a, b) => new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime());
  },
  
  getJobById: (id) => {
    const { jobs } = get();
    return jobs.find(job => job.id === id);
  },
})); 