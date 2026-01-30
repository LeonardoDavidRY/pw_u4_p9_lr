<template>
  <div class="container">
    <h1>Gestión de Estudiantes</h1>
    <button @click="fetchEstudiantes">Ver Estudiantes</button>
    <button @click="fetchEstudiantePorId(1)">Buscar Estudiante</button>
    
  </div>
</template>

<script>
import {
  consultarTodosFachada,
  consultarPorIdFachada,
  guardarFachada,
  actualizarFachada,
  actualizarParcialFachada,
  borrarFachada,
} from "@/clients/MatriculaClient.js";
export default {
  name: "AboutComponent",
  data() {
    return {
      estudiantes: [],
      estudiante: null,
    };
  },
  methods: {
    async fetchEstudiantes() {
      this.estudiantes = await consultarTodosFachada();
    },
    async fetchEstudiantePorId(id) {
      this.estudiante = await consultarPorIdFachada(id);
    },
    async guardarEstudiante(estudiante) {
      return await guardarFachada(estudiante);
    },
    async actualizarEstudiante(estudiante) {
      return await actualizarFachada(estudiante);
    },
    async actualizarParcialEstudiante(id, datosParciales) {
      return await actualizarParcialFachada(id, datosParciales);
    },
    async borrarEstudiante(id) {
      return await borrarFachada(id);
    },
  },
};
</script>

<style>
</style>