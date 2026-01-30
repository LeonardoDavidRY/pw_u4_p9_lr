<template>
  <div class="actualizar-estudiante-view">
    <ActualizarEstudiante />
  </div>
</template>

<script>
import ActualizarEstudiante from '@/components/ActualizarEstudiante.vue';

export default {
  name: 'ActualizarEstudianteView',
  components: {
    ActualizarEstudiante
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
