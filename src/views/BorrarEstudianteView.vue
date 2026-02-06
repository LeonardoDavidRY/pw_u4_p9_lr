<template>
  <div class="borrar-estudiante-view">
    <BorrarEstudiante />
  </div>
</template>

<script>
import { setTokenFachada } from "@/clients/MatriculaClient";
import BorrarEstudiante from '@/components/BorrarEstudiante.vue';

export default {
  name: 'BorrarEstudianteView',
  components: {
    BorrarEstudiante
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
.borrar-estudiante-view {
  padding: 20px;
  min-height: 100vh;
  background-color: #9ee2dc;
}
</style>
