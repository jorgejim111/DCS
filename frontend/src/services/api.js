import axios from 'axios';

// Crear instancia global de axios
const api = axios.create();

// Interceptor de respuesta para manejar expiración de token
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Eliminar token y redirigir a login
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
