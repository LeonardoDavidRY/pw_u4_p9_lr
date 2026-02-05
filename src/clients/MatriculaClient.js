import axios from "axios";

// Variable para almacenar el token dinámicamente
let TOKEN = "";

const URL = "http://localhost:8081/matricula/api/v1.0/estudiantes";

// Función para establecer el token
export const setTokenFachada = (token) => {
  TOKEN = token;
};

// Función para obtener el token actual
export const getTokenValue = () => {
  return TOKEN;
};

const consultarTodos = async () => {
  const data = await axios
    .get(`${URL}`, { headers: { Authorization: `Bearer ${TOKEN}` } })
    .then((r) => r.data);
  console.log(data);

  return data;
};
const consultarPorId = async (id) => {
  const data = await axios
    .get(`${URL}/${id}`, { headers: { Authorization: `Bearer ${TOKEN}` } })
    .then((r) => r.data);
  console.log(data);
  return data;
};
const guardar = async (body) => {
  console.log("Datos a enviar:", body);

  const data = await axios
    .post(`${URL}`, body, { headers: { Authorization: `Bearer ${TOKEN}` } })
    .then((r) => r.data);
  console.log("Respuesta del servidor:", data);
  return data;
};

const actualizar = async (id, body) => {
  const data = await axios
    .put(`${URL}/${id}`, body, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    })
    .then((r) => r.data);
  console.log(data);
  return data;
};
const actualizarParcial = async (id, body) => {
  const data = await axios
    .patch(`${URL}/${id}`, body, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    })
    .then((r) => r.data);
  console.log(data);
  return data;
};

const borrar = async (id) => {
  await axios
    .delete(`${URL}/${id}`, { headers: { Authorization: `Bearer ${TOKEN}` } })
    .then((r) => r.data);
  console.log(`Estudiante con id ${id} borrado`);
};

//Funciones fachadas
export const consultarTodosFachada = async () => {
  return await consultarTodos();
};
export const consultarPorIdFachada = async (id) => {
  return await consultarPorId(id);
};
export const guardarFachada = async (body) => {
  return await guardar(body);
};
export const actualizarFachada = async (id, body) => {
  return await actualizar(id, body);
};
export const actualizarParcialFachada = async (id, body) => {
  return await actualizarParcial(id, body);
};
export const borrarFachada = async (id) => {
  await borrar(id);
};
