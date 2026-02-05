<template>
  <div class="tabla-estudiantes-view">
    <div v-if="cargando" class="loading-message">
      Autenticando...
    </div>
    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>
    <TablaEstudiantes v-else />
  </div>
</template>

<script>
import TablaEstudiantes from "@/components/TablaEstudiantes.vue";
import { getTokenFachada } from "@/clients/AuthorizationClient";
import { setTokenFachada } from "@/clients/MatriculaClient";

export default {
  name: "TablaEstudiantesView",
  components: {
    TablaEstudiantes,
  },
  data() {
    return {
      cargando: true,
      error: null
    };
  },
  async mounted() {
    try {
      const tokenData = await getTokenFachada("admin", "1234");
      console.log("Token obtenido:", tokenData);
      
      setTokenFachada(tokenData.accessToken);
      this.cargando = false;
    } catch (error) {
      console.error("Error al obtener el token:", error);
      this.error = "Error de autenticación. Por favor, verifica las credenciales.";
      this.cargando = false;
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