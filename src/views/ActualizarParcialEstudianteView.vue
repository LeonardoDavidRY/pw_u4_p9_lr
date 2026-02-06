<template>
  <div class="actualizar-parcial-estudiante-view">
    <ActualizarParcialEstudiante />
  </div>
</template>

<script>
import { setTokenFachada } from "@/clients/MatriculaClient";
import ActualizarParcialEstudiante from "@/components/ActualizarParcialEstudiante.vue";

export default {
  name: "ActualizarParcialEstudianteView",
  components: {
    ActualizarParcialEstudiante,
  },
  mounted() {
    const token = localStorage.getItem("token");
    if (token) {
      setTokenFachada(token);
    }
  },
};
</script>

<style scoped>
.actualizar-parcial-estudiante-view {
  padding: 20px;
  min-height: 100vh;
  background-color: #9ee2dc;
}
</style>
