import React, { useEffect, useState, useRef, useCallback } from 'react';
import ChatProps from '../interfaces/chatPorps';
import axios from 'axios';

const Chat: React.FC<ChatProps> = ({ token, selectedUser, currentUser, connection, onBack }) => {
  const [messages, setMessages] = useState<{ sender: string, text: string }[]>([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Function to load previous chat messages
  const loadChatMessages = useCallback(async (currentUser: string, selectedUser: string) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/chat/messages?currentUser=${currentUser}&selectedUser=${selectedUser}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessages(response.data.map((msg: any) => ({ sender: msg.user, text: msg.message })));
    } catch (err) {
      console.error('Error loading messages:', err);
      setError('Error loading messages.');
    }
  }, [token]);

  useEffect(() => {
    if (connection) {
      // Load previous chat messages
      loadChatMessages(currentUser, selectedUser);

      // Listen for incoming messages
      connection.on('ReceiveMessage', (sender: string, recipient: string, receivedMessage: string) => {
        if (
          (sender === currentUser && recipient === selectedUser) ||
          (sender === selectedUser && recipient === currentUser)
        ) {
          setMessages((prev) => [...prev, { sender, text: receivedMessage }]);
        }
      });
    }

    return () => {
      if (connection) {
        connection.off('ReceiveMessage');
      }
    };
  }, [connection, currentUser, selectedUser, loadChatMessages]);

  useEffect(() => {
    // Scroll to the bottom whenever messages are updated
    scrollToBottom();
  }, [messages]);

  // Function to send a new message
  const sendMessage = async () => {
    if (!message.trim()) {
      setError('Message cannot be empty.');
      return;
    }

    if (!connection) {
      setError('No connection available.');
      return;
    }

    try {
      // Send message to the server
      await connection.send('SendMessage', currentUser, selectedUser, message);
      setMessage(''); // Clear input after sending
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Error sending the message.');
    }
  };

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Function to handle key press in input field
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {error && <div className="text-red-500 mb-2 text-center">{error}</div>}

      <div className="bg-green-600 text-white p-4 flex items-center justify-between">
        <button onClick={onBack} className="text-white font-bold bg-transparent border-none">
          &larr; Back
        </button>
        <h2 className="font-semibold">Chat with: {selectedUser}</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === currentUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] md:max-w-[60%] lg:max-w-[50%] p-3 rounded-lg text-sm shadow
              ${msg.sender === currentUser ? 'bg-green-200 text-right' : 'bg-white text-left'}`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      <div className="flex items-center p-4 bg-white border-t">
        <input
          type="text"
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 border rounded-full p-2 focus:outline-none focus:ring focus:border-green-400"
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
