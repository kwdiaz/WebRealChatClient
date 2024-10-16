import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

const Chat = ({ token }: { token: string }) => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState('');  // El usuario será declarado antes de iniciar la conexión
  const [isUserConfirmed, setIsUserConfirmed] = useState(false);  // Estado para controlar si el usuario ha confirmado su nombre
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [error, setError] = useState('');

  // Conectar a SignalR solo después de que el usuario confirme su nombre
  useEffect(() => {
    if (isUserConfirmed && user) {
      const newConnection = new signalR.HubConnectionBuilder()
        .withUrl(`https://localhost:7014/chatHub?username=${user}`, {
          accessTokenFactory: () => token, // Autenticación JWT
        })
        .withAutomaticReconnect()
        .build();

      setConnection(newConnection);
    }
  }, [isUserConfirmed, user, token]);

  // Manejar el inicio de la conexión y los eventos de SignalR
  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          // Obtener el historial de mensajes
          connection.invoke('GetMessageHistory').then((history: any) => {
            setMessages(history.map((msg: any) => `${msg.user}: ${msg.message}`));
          }).catch(err => {
            setError('Error al cargar el historial de mensajes.');
          });

          // Actualizar mensajes en tiempo real
          connection.on('ReceiveMessage', (user: string, message: string) => {
            setMessages(prev => [...prev, `${user}: ${message}`]);
          });

          // Actualizar usuarios en línea en tiempo real
          connection.on('UpdateOnlineUsers', (users: string[]) => {
            setOnlineUsers(users);
          });

          // Actualizar cuando un usuario se conecta
          connection.on('UserConnected', (username: string) => {
            setOnlineUsers(prev => [...prev, username]);
          });

          // Actualizar cuando un usuario se desconecta
          connection.on('UserDisconnected', (username: string) => {
            setOnlineUsers(prev => prev.filter(user => user !== username));
          });
        })
        .catch(err => {
          setError('Error al conectar con el servidor de SignalR.');
        });
    }
  }, [connection]);

  // Función para enviar un mensaje a través de SignalR
  const sendMessage = async () => {
    if (!message.trim()) {
      setError('El mensaje no puede estar vacío.');
      return;
    }

    try {
      if (connection) {
        await connection.send('SendMessage', user, message);
        setMessage('');
      }
    } catch (err) {
      setError('Error al enviar el mensaje.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {!isUserConfirmed ? (
        <div>
          <input
            type="text"
            placeholder="Escribe tu nombre"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="border p-2 mb-2 w-full"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            onClick={() => setIsUserConfirmed(true)}  // El usuario confirma su nombre
          >
            Confirmar Nombre
          </button>
        </div>
      ) : (
        <>
          <h2>Usuarios en línea: {onlineUsers.join(', ')}</h2>
          <div className="bg-gray-100 rounded-lg p-6 h-96 flex flex-col">
            <div className="h-full overflow-y-auto mb-4">
              {messages.map((msg, idx) => (
                <div key={idx} className="mb-2">
                  {msg}
                </div>
              ))}
            </div>
            <input
              type="text"
              placeholder="Tu mensaje"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border p-2 mb-2 w-full"
            />
            <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded w-full">
              Enviar
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
