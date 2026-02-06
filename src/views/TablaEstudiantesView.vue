<template>
  <div class="tabla-estudiantes-view">
    <TablaEstudiantes />
  </div>
</template>

<script>
import TablaEstudiantes from "@/components/TablaEstudiantes.vue";
import { setTokenFachada } from "@/clients/MatriculaClient";

export default {
  name: "TablaEstudiantesView",
  components: {
    TablaEstudiantes,
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
.loading-message, .error-message {
  padding: 20px;
  margin: 20px;
  text-align: center;
  font-size: 18px;
}

.loading-message {
  color: #2196F3;
}

.error-message {
  color: #f44336;
  background-color: #ffebee;
  border: 1px solid #f44336;
  border-radius: 4px;
}
</style>

<style>
</style>