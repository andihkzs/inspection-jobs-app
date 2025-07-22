import React, { useState } from 'react';
import { useJobStore } from '../../stores/jobStore';
import { JobFilters as JobFiltersType } from '../../types/job';

const JobFilters: React.FC = () => {
  const filters = useJobStore((state) => state.filters);
  const setFilters = useJobStore((state) => state.setFilters);
  const [isExpanded, setIsExpanded] = useState(false);

  const statusOptions = [
    { value: '', label: 'All' },
    { value: 'submitted', label: 'Submitted' },
    { value: 'pending', label: 'Pending' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'review', label: 'Under Review' },
    { value: 'completed', label: 'Completed' },
    { value: 'rejected', label: 'Rejected' },
  ];

  const priorityOptions = [
    { value: '', label: 'All' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ];

  const inspectionTypeOptions = [
    { value: '', label: 'All' },
    { value: 'Medical Treatment', label: 'Medical Treatment' },
    { value: 'Dental Treatment', label: 'Dental Treatment' },
    { value: 'Physiotherapy', label: 'Physiotherapy' },
    { value: 'Preventive Healthcare', label: 'Preventive Healthcare' },
  ];

  const handleFilterChange = (key: keyof JobFiltersType, value: string) => {
    setFilters({
      ...filters,
      [key]: value || undefined,
    });
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Basic Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleFilterChange('status', option.value)}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-soft hover:shadow-soft-lg transform hover:-translate-y-0.5 ${
                filters.status === option.value
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-500 hover:text-gray-700 p-2 rounded-xl hover:bg-gray-100 transition-all duration-200 self-start sm:self-center"
        >
          <svg 
            className={`w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Advanced Filters */}
      {isExpanded && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 pt-4 lg:pt-6 border-t border-gray-100">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <select
              value={filters.priority || ''}
              onChange={(e) => handleFilterChange('priority', e.target.value)}
              className="input-field"
            >
              {priorityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Inspection Type
            </label>
            <select
              value={filters.inspectionType || ''}
              onChange={(e) => handleFilterChange('inspectionType', e.target.value)}
              className="input-field"
            >
              {inspectionTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <input
              type="text"
              placeholder="Search jobs..."
              value={filters.search || ''}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="input-field"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default JobFilters; 