import React, { useState } from 'react';
import axios from 'axios'; // Importar Axios

const Login = ({ onLogin, setIsRegistering }: { onLogin: (token: string) => void, setIsRegistering: (value: boolean) => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Estado para manejar la carga

  const handleLogin = async () => {
    setError(''); // Reiniciar el error
    setLoading(true); // Activar el indicador de carga

    try {
      const response = await axios.post('https://localhost:7014/auth/login', {
        username,
        password,
      });

      // Si la respuesta es exitosa, llama a onLogin con el token
      onLogin(response.data.token);
    } catch (err) {
      // Manejo de errores
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.message || 'Error en el inicio de sesión'); // Usar el mensaje de error del servidor
      } else {
        setError('Error desconocido'); // Manejar otro tipo de error
      }
    } finally {
      setLoading(false); // Desactivar el indicador de carga al final
    }
  };

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-xl mb-4 font-semibold text-center">Iniciar Sesión</h1>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border border-gray-300 rounded p-3 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-gray-300 rounded p-3 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button 
        onClick={handleLogin} 
        className={`bg-blue-500 text-white px-4 py-2 rounded w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
        disabled={loading} // Deshabilitar el botón si está cargando
      >
        {loading ? 'Cargando...' : 'Iniciar Sesión'}
      </button>
      <div className="text-center mt-4">
        <p>¿No tienes una cuenta? <button onClick={() => setIsRegistering(true)} className="text-blue-500 underline">Regístrate aquí</button></p>
      </div>
    </div>
  );
};

export default Login;
