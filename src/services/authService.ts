import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/Auth`;

export const login = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  return response.data;
};

export const register = async (username: string, password: string, name: string) => {
  const response = await axios.post(`${API_URL}/register`, { username, password, name });
  return response.data;
};
