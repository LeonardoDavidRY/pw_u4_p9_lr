import axios from "axios";

const URL = "http://localhost:8082/auth";

const getToken = async (username, password) => {
  try {
    const response = await axios.get(`${URL}/token`, {
      params: {
        user: username,
        password: password
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener el token:", error);
    throw error;
  }
};

export const getTokenFachada = async (username, password) => {
  return await getToken(username, password);
}



