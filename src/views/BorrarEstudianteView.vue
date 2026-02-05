<template>
  <div class="borrar-estudiante-view">
    <BorrarEstudiante />
  </div>
</template>

<script>
import { getTokenFachada } from "@/clients/AuthorizationClient";
import { setTokenFachada } from "@/clients/MatriculaClient";
import BorrarEstudiante from '@/components/BorrarEstudiante.vue';

export default {
  name: 'BorrarEstudianteView',
  components: {
    BorrarEstudiante
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
.borrar-estudiante-view {
  padding: 20px;
  min-height: 100vh;
  background-color: #9ee2dc;
}
</style>
