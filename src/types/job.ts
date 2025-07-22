export interface JobLocation {
  address: string;
  city: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface InspectionRequirements {
  type: string;
  standards: string[];
  specialRequirements?: string[];
  documents: string[];
}

import { FileAttachment } from './shared';
import { InspectionReport } from './report';

export interface InspectionJob {
  id: string;
  jobNumber: string;
  customerId: string;
  customerName: string;
  inspectionType: string;
  status: 'submitted' | 'pending' | 'in_progress' | 'review' | 'completed' | 'rejected';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  submittedDate: Date;
  estimatedCompletion: Date;
  actualCompletion?: Date;
  inspectorId?: string;
  inspectorName?: string;
  location: JobLocation;
  requirements: InspectionRequirements;
  attachments: FileAttachment[];
  finalReport?: InspectionReport;
}

export interface JobFilters {
  status?: string;
  priority?: string;
  inspectionType?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  search?: string;
}

export interface JobStatus {
  status: InspectionJob['status'];
  label: string;
  color: string;
  icon: string;
} 