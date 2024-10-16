import React, { useState } from 'react';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [token, setToken] = useState<string>(''); // Cambia a string en lugar de string | null
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); // Estado para determinar si se está registrando

  const handleLogin = (token: string) => {
    setToken(token);
    setIsLoggedIn(true);
  };

  return (
    <div 
      className="App flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-green-500" // Fondo de gradiente
    >
      <div className="w-full h-full max-w-md p-6 bg-white bg-opacity-80 rounded-lg shadow-md flex flex-col justify-center">
        {!isLoggedIn ? (
          isRegistering ? (
            <Register setIsRegistering={setIsRegistering} />
          ) : (
            <Login onLogin={handleLogin} setIsRegistering={setIsRegistering} />
          )
        ) : (
          <Chat token={token} />
        )}
      </div>
    </div>
  );
}

export default App;
