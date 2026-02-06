<template>
  <div class="formulario-estudiante-view">
    <FormularioEstudiante />
  </div>
</template>

<script>
import FormularioEstudiante from '@/components/FormularioEstudiante.vue';
import { setTokenFachada } from "@/clients/MatriculaClient";

export default {
  name: 'FormularioEstudianteView',
  components: {
    FormularioEstudiante
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
.formulario-estudiante-view {
  padding: 20px;
  min-height: 100vh;
  background-color: #9ee2dc;
}

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
