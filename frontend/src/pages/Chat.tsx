import { useEffect, useRef, useState } from "react";
import { Alert, Avatar, Box, Button, CircularProgress, IconButton, TextField, Typography } from "@mui/material";
import { FiArrowLeft, FiRefreshCw, FiSend, FiTrash2, FiZap } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getApiErrorMessage, sendChatRequest } from "../helpers/api-communicator";
import ChatItem from "../components/chat/ChatItem";

type Message = { role: "user" | "assistant"; content: string };
const STORAGE_KEY = "ask-chirayu-conversation";
const suggestions = ["What has Chirayu built?", "What kind of collaborator is he?", "Ask me anything general"];

const Chat = () => {
  const navigate = useNavigate();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [retryMessage, setRetryMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setChatMessages(JSON.parse(saved));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chatMessages));
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isLoading]);

  const handleSubmit = async (message = input) => {
    const content = message.trim();
    if (!content || isLoading) return;
    const previousMessages = chatMessages;
    setInput("");
    setError("");
    setRetryMessage(content);
    setChatMessages((previous) => [...previous, { role: "user", content }]);
    setIsLoading(true);
    try {
      const chatData = await sendChatRequest(content, previousMessages);
      setChatMessages((previous) => [...previous, { role: "assistant", content: chatData.assistant }]);
      setRetryMessage("");
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "I could not answer that just now."));
      setInput(content);
    } finally {
      setIsLoading(false);
    }
  };

  const clearConversation = () => {
    setChatMessages([]);
    setError("");
    setRetryMessage("");
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <Box className="page-enter content-wrap chat-page" sx={{ py: { xs: 2, md: 5 } }}>
      <Box className="chat-toolbar"><Button onClick={() => navigate("/")} startIcon={<FiArrowLeft />}>Back to overview</Button><Button onClick={clearConversation} startIcon={<FiTrash2 />}>New conversation</Button></Box>
      <Box className="chat-layout">
        <Box className="chat-intro">
          <span className="eyebrow">AskChirayu / open conversation</span>
          <Typography className="chat-title" component="h1">A little context.<br /><span>Any question.</span></Typography>
          <Typography className="chat-description">Ask about Chirayu’s career, projects, perspective, or working style. You can also use this as a normal AI chat for anything on your mind.</Typography>
          <Box className="chat-note"><FiZap /><Typography>Chats stay in this browser. No account, email, or sign-up required.</Typography></Box>
        </Box>
        <Box className="chat-window">
          <Box className="chat-heading"><Avatar>C</Avatar><Box><Typography sx={{ fontWeight: 600 }}>AskChirayu AI</Typography><Typography className="status-line">Portfolio guide · ready when you are</Typography></Box><span className="status-dot" /></Box>
          <Box className="message-area">
            {chatMessages.length === 0 ? <Box className="empty-chat"><Typography variant="h5">Where should we start?</Typography><Typography>Try a prompt below, or ask something completely your own.</Typography><Box className="suggestion-list">{suggestions.map((suggestion) => <Button key={suggestion} onClick={() => handleSubmit(suggestion)}>{suggestion}<FiArrowLeft /></Button>)}</Box></Box> : chatMessages.map((chat, index) => <ChatItem content={chat.content} role={chat.role} key={`${chat.role}-${index}`} />)}
            {isLoading && <Box className="thinking"><CircularProgress size={16} /><Typography>Thinking through that...</Typography></Box>}
            <div ref={messagesEndRef} />
          </Box>
          {error && <Alert severity="error" className="chat-error" action={<Button color="inherit" size="small" startIcon={<FiRefreshCw />} onClick={() => handleSubmit(retryMessage)}>Retry</Button>}>{error}</Alert>}
          <Box component="form" className="composer" onSubmit={(event) => { event.preventDefault(); handleSubmit(); }}><TextField value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about a project, a perspective, or anything else..." fullWidth multiline maxRows={4} disabled={isLoading} variant="standard" InputProps={{ disableUnderline: true }} /><IconButton type="submit" disabled={!input.trim() || isLoading} aria-label="Send message"><FiSend /></IconButton></Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
