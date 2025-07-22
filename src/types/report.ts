import { FileAttachment } from './shared';

export interface InspectionFinding {
  id: string;
  category: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  recommendation: string;
  photos?: string[];
}

export interface ComplianceStatus {
  overall: 'compliant' | 'non_compliant' | 'partial';
  details: {
    standard: string;
    status: 'pass' | 'fail' | 'partial';
    notes?: string;
  }[];
}

export interface DigitalSignature {
  inspectorId: string;
  inspectorName: string;
  signedAt: Date;
  signatureHash: string;
}

export interface InspectionReport {
  id: string;
  jobId: string;
  inspectorId: string;
  inspectorName: string;
  completionDate: Date;
  findings: InspectionFinding[];
  compliance: ComplianceStatus;
  recommendations: string[];
  attachments: FileAttachment[];
  signature: DigitalSignature;
  pdfUrl?: string;
  status: 'draft' | 'final' | 'approved';
} 