import { FileAttachment } from './shared';

export interface ChatMessage {
  id: string;
  jobId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  attachments?: FileAttachment[];
  type: 'text' | 'file' | 'status_update' | 'system';
  readBy: string[];
}

export interface ChatRoom {
  id: string;
  jobId: string;
  participants: string[];
  lastMessage?: ChatMessage;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatState {
  messages: ChatMessage[];
  isTyping: boolean;
  typingUsers: string[];
  connected: boolean;
} 