import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
import ChatList from './pages/ChatList';
import { useChatConnection } from './hooks/useChatConnection';
import { fetchOnlineUsers } from './services/chatService';

const App: React.FC = () => {
  const [token, setToken] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<{ username: string; lastMessage: string }[]>([]);
  const [username, setUsername] = useState<string>('');

  const connection = useChatConnection(username, token);

  const handleLogin = (token: string, username: string) => {
    setToken(token);
    setUsername(username);
    setIsLoggedIn(true);
  };

  const handleBackToChatList = () => {
    setSelectedUser(null);
  };

  useEffect(() => {
    if (isLoggedIn && token && connection) {
      // Fetch online users initially
      fetchOnlineUsers(token)
        .then((users) =>
          setOnlineUsers(users.map((user: string) => ({ username: user, lastMessage: '' })))
        )
        .catch((error) => console.error('Error fetching online users:', error));

      // Set up SignalR event listener to update online users
      connection.on('UpdateOnlineUsers', (users: string[]) => {
        setOnlineUsers(users.map((user) => ({ username: user, lastMessage: '' })));
      });

      // Cleanup listener on dismount
      return () => {
        connection.off('UpdateOnlineUsers');
      };
    }
  }, [isLoggedIn, token, connection]);

  return (
    <div className="w-full">
      {!isLoggedIn ? (
        isRegistering ? (
          <Register setIsRegistering={setIsRegistering} />
        ) : (
          <Login onLogin={handleLogin} setIsRegistering={setIsRegistering} />
        )
      ) : selectedUser ? (
        <Chat
          token={token}
          selectedUser={selectedUser}
          currentUser={username}
          connection={connection}
          onBack={handleBackToChatList}
        />
      ) : (
        <ChatList chats={onlineUsers} onSelectChat={setSelectedUser} />
      )}
    </div>
  );
};

export default App;
