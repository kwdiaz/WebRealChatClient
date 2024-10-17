import axios from 'axios';

export const fetchOnlineUsers = async (token: string) => {
  const response = await axios.get('https://localhost:7014/chat/onlineUsers', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchChatMessages = async (token: string, currentUser: string, selectedUser: string) => {
  const response = await axios.get(`https://localhost:7014/chat/messages?currentUser=${currentUser}&selectedUser=${selectedUser}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
