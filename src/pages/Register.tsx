import React, { useState } from 'react';
import axios from 'axios'; // Importar Axios

const Register = ({ setIsRegistering }: { setIsRegistering: (value: boolean) => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Estado para manejar la carga

  const handleRegister = async () => {
    setError(''); // Resetear el mensaje de error
    setLoading(true); // Activar el indicador de carga

    try {
      // Validación simple
      if (!username || !password) {
        setError('Por favor, ingrese un nombre de usuario y una contraseña.');
        setLoading(false);
        return;
      }

      // Hacer la solicitud POST usando Axios
      const response = await axios.post('https://localhost:7014/auth/register', {
        username,
        password,
      });

      // Si la respuesta es exitosa, mostrar un mensaje
      alert('Registro exitoso');
      setIsRegistering(false); // Regresar a la pantalla de inicio de sesión
    } catch (err) {
      // Manejo de errores
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.message || 'Error en el registro'); // Usar el mensaje de error del servidor
      } else {
        setError('Error desconocido'); // Manejar otro tipo de error
      }
    } finally {
      setLoading(false); // Desactivar el indicador de carga al final
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-xl mb-4 font-semibold text-center">Registro</h1>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border border-gray-300 rounded p-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-gray-300 rounded p-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button 
        onClick={handleRegister} 
        className={`bg-blue-500 text-white px-4 py-2 rounded w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
        disabled={loading} // Deshabilitar el botón si está cargando
      >
        {loading ? 'Cargando...' : 'Registrarse'}
      </button>
      <div className="text-center mt-4">
        <p>¿Ya tienes una cuenta? <button onClick={() => setIsRegistering(false)} className="text-blue-500 underline">Inicia sesión aquí</button></p>
      </div>
    </div>
  );
};

export default Register;
