import axios from "axios";

const URL = "http://localhost:8082/auth";

// Función para obtener el token de autenticación
const getToken = async (username, password) => {
  try {
    const response = await axios.get(`${URL}/token`, {
      params: {
        user: username,
        password: password
      }
    });
    
    // Retorna el objeto completo con accessToken, expiresAt y role
    return response.data;
  } catch (error) {
    console.error("Error al obtener el token:", error);
    throw error;
  }
};

// Exportar la función
export { getToken };



