<template>
  <div class="actualizar-estudiante-view">
    <ActualizarEstudiante />
  </div>
</template>

<script>
import { setTokenFachada } from "@/clients/MatriculaClient";
import ActualizarEstudiante from '@/components/ActualizarEstudiante.vue';

export default {
  name: 'ActualizarEstudianteView',
  components: {
    ActualizarEstudiante
  },
  mounted() {
    const token = localStorage.getItem("token");
    if (token) {
      setTokenFachada(token);
    }
  }

};
</script>

<style scoped>
.actualizar-estudiante-view {
  padding: 20px;
  min-height: 100vh;
  background-color: #9ee2dc;
}
</style>
