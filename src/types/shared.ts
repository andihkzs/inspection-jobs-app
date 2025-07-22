export interface FileAttachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'inspector' | 'admin';
  avatar?: string;
  createdAt: Date;
} 