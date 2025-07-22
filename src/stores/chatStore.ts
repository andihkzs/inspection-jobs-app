import { create } from 'zustand';
import { ChatMessage, ChatState } from '../types/chat';

interface ChatStoreState extends ChatState {
  currentJobId: string | null;
  
  // Actions
  setMessages: (messages: ChatMessage[]) => void;
  addMessage: (message: ChatMessage) => void;
  setTyping: (isTyping: boolean) => void;
  setTypingUsers: (users: string[]) => void;
  setConnected: (connected: boolean) => void;
  setCurrentJobId: (jobId: string | null) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatStoreState>((set, get) => ({
  messages: [],
  isTyping: false,
  typingUsers: [],
  connected: false,
  currentJobId: null,
  
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set((state) => ({ 
    messages: [...state.messages, message] 
  })),
  setTyping: (isTyping) => set({ isTyping }),
  setTypingUsers: (users) => set({ typingUsers: users }),
  setConnected: (connected) => set({ connected }),
  setCurrentJobId: (jobId) => set({ currentJobId: jobId }),
  clearMessages: () => set({ messages: [] }),
})); 