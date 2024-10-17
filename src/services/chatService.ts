import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/chat`;

export const fetchOnlineUsers = async (token: string) => {
  const response = await axios.get(`${API_URL}/onlineUsers`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchChatMessages = async (token: string, currentUser: string, selectedUser: string) => {
  const response = await axios.get(`${API_URL}/messages?currentUser=${currentUser}&selectedUser=${selectedUser}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
