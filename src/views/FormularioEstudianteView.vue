<template>
  <div class="formulario-estudiante-view">
    <FormularioEstudiante />
  </div>
</template>

<script>
import FormularioEstudiante from '@/components/FormularioEstudiante.vue';

export default {
  name: 'FormularioEstudianteView',
  components: {
    FormularioEstudiante
  }
};
</script>

<style scoped>
.formulario-estudiante-view {
  padding: 20px;
  min-height: 100vh;
  background-color: #9ee2dc;
}
</style>
