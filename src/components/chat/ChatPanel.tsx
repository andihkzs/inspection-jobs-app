import React from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { useJobStore } from '../../stores/jobStore';

interface ChatPanelProps {
  jobId: string;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ jobId }) => {
  const selectedJob = useJobStore((state) => state.selectedJob);

  if (!selectedJob) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500 bg-gray-50">
        <div className="text-center">
          <div className="text-4xl mb-4">💬</div>
          <p className="text-gray-600">Select a job to view chat</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Chat Header */}
      <ChatHeader job={selectedJob} />
      
      {/* Messages */}
      <div className="flex-1 overflow-hidden bg-gray-50">
        <MessageList jobId={jobId} />
      </div>
      
      {/* Chat Input */}
      <ChatInput jobId={jobId} />
    </div>
  );
};

export default ChatPanel; 