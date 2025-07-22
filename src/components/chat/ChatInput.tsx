import React, { useState } from 'react';
import { useChatStore } from '../../stores/chatStore';

interface ChatInputProps {
  jobId: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ jobId }) => {
  const [message, setMessage] = useState('');
  const addMessage = useChatStore((state) => state.addMessage);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        jobId,
        senderId: 'current-user', // TODO: Get from auth context
        senderName: 'You',
        content: message.trim(),
        timestamp: new Date(),
        type: 'text' as const,
        readBy: [],
      };
      
      addMessage(newMessage);
      setMessage('');
    }
  };

  return (
    <div className="p-6 border-t border-gray-100 bg-white shadow-soft">
      <form onSubmit={handleSubmit} className="flex space-x-3">
        <button
          type="button"
          className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-xl hover:bg-gray-100"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828L18 9.828a2 2 0 000-2.828L15.172 7z" />
          </svg>
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-50 focus:bg-white transition-all duration-200"
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className="bg-primary-500 text-white px-6 py-3 rounded-xl hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-soft hover:shadow-soft-lg transform hover:-translate-y-0.5 disabled:transform-none"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatInput; 