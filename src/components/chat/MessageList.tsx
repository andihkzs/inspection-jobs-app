import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import { useChatStore } from '../../stores/chatStore';

interface MessageListProps {
  jobId: string;
}

const MessageList: React.FC<MessageListProps> = ({ jobId }) => {
  const messages = useChatStore((state) => state.messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {messages.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          <div className="text-6xl mb-4">💬</div>
          <p className="text-lg font-medium mb-2">No messages yet</p>
          <p className="text-sm text-gray-400">Start a conversation about this job</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList; 