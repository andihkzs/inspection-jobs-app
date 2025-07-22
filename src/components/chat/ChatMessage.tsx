import React from 'react';
import { ChatMessage as ChatMessageType } from '../../types/chat';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isOwnMessage = message.senderId === 'current-user'; // TODO: Get from auth context

  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? 'order-2' : 'order-1'}`}>
        <div className={`rounded-2xl px-4 py-3 shadow-soft ${
          isOwnMessage 
            ? 'bg-primary-500 text-white' 
            : 'bg-white text-gray-900 border border-gray-100'
        }`}>
          <div className="text-sm font-medium mb-1">
            {message.senderName}
          </div>
          <div className="text-sm">
            {message.content}
          </div>
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-2 space-y-1">
              {message.attachments.map((attachment) => (
                <div key={attachment.id} className="text-xs opacity-75 bg-black bg-opacity-10 px-2 py-1 rounded-lg">
                  📎 {attachment.name}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={`text-xs text-gray-500 mt-2 ${
          isOwnMessage ? 'text-right' : 'text-left'
        }`}>
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage; 