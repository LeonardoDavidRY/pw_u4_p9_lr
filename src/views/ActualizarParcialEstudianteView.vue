<template>
  <div class="actualizar-parcial-estudiante-view">
    <ActualizarParcialEstudiante />
  </div>
</template>

<script>
import { getTokenFachada } from "@/clients/AuthorizationClient";
import { setTokenFachada } from "@/clients/MatriculaClient";
import ActualizarParcialEstudiante from "@/components/ActualizarParcialEstudiante.vue";

export default {
  name: "ActualizarParcialEstudianteView",
  components: {
    ActualizarParcialEstudiante,
  },
  async mounted() {
    try {
      const tokenData = await getTokenFachada("admin", "1234");
      console.log("Token obtenido:", tokenData);

      setTokenFachada(tokenData.accessToken);
      this.cargando = false;
    } catch (error) {
      console.error("Error al obtener el token:", error);
      this.error =
        "Error de autenticación. Por favor, verifica las credenciales.";
      this.cargando = false;
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
