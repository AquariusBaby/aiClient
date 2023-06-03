import {createContext} from 'react';

const ChatContext = createContext<{
    roleInfo?: any; 
    setChatMessageVos?: (v: any) => void;
    setDialogueList?: (v: any) => void;
    chatHistory?: any;
    setChatHistory?: (v: any) => void;
    selectedTopic?: any;
    setSelectedTopic?: (v: any) => void;
}>({});

export default ChatContext;