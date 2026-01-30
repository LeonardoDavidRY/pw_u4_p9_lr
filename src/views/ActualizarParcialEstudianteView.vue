<template>
  <div class="actualizar-parcial-estudiante-view">
    <ActualizarParcialEstudiante />
  </div>
</template>

<script>
import ActualizarParcialEstudiante from '@/components/ActualizarParcialEstudiante.vue';

export default {
  name: 'ActualizarParcialEstudianteView',
  components: {
    ActualizarParcialEstudiante
  }
};
</script>

<style scoped>
.actualizar-parcial-estudiante-view {
  padding: 20px;
  min-height: 100vh;
  background-color: #9ee2dc;
}
</style>
