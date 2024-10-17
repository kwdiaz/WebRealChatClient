import { useState, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';

export const useChatConnection = (username: string, token: string) => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);

  useEffect(() => {
    if (username && token) {
      const chatHubUrl = `${process.env.REACT_APP_API_URL}/chatHub?username=${encodeURIComponent(username)}`;
      const newConnection = new signalR.HubConnectionBuilder()
        .withUrl(chatHubUrl, {
          accessTokenFactory: () => token,
        })
        .withAutomaticReconnect()
        .build();

      setConnection(newConnection);

      newConnection
        .start()
        .then(() => {
          console.log('SignalR connection established');
        })
        .catch((err) => console.error('Error connecting to SignalR:', err));
      
      return () => {
        newConnection.stop();
      };
    }
  }, [username, token]);

  return connection;
};
