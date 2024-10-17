import { useState, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';

export const useChatConnection = (username: string, token: string) => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);

  useEffect(() => {
    if (username && token) {
      const newConnection = new signalR.HubConnectionBuilder()
        .withUrl(`https://localhost:7014/chatHub?username=${encodeURIComponent(username)}`, {
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
