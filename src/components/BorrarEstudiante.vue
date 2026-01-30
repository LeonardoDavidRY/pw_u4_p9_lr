<template>
  <div class="borrar-estudiante-container">
    <h2>Borrar Estudiante</h2>
    <p class="advertencia">⚠️ Esta acción es irreversible. Verifique los datos antes de eliminar.</p>
    
    <!-- Mensaje de carga -->
    <div v-if="cargando" class="mensaje-carga">
      Cargando datos del estudiante...
    </div>

    <!-- Mensaje de éxito -->
    <div v-if="mensajeExito" class="mensaje-exito">
      {{ mensajeExito }}
    </div>

    <!-- Mensaje de error -->
    <div v-if="mensajeError" class="mensaje-error">
      {{ mensajeError }}
    </div>

    <div v-if="!cargando && !mensajeExito" class="formulario">
      <div class="datos-estudiante">
        <h3>Datos del Estudiante a Eliminar:</h3>
        
        <div class="dato-fila">
          <span class="dato-label">ID:</span>
          <span class="dato-valor">{{ estudiante.id }}</span>
        </div>

        <div class="dato-fila">
          <span class="dato-label">Nombre:</span>
          <span class="dato-valor">{{ estudiante.nombre }}</span>
        </div>

        <div class="dato-fila">
          <span class="dato-label">Apellido:</span>
          <span class="dato-valor">{{ estudiante.apellido }}</span>
        </div>

        <div class="dato-fila">
          <span class="dato-label">Fecha de Nacimiento:</span>
          <span class="dato-valor">{{ formatearFecha(estudiante.fechaNacimiento) }}</span>
        </div>

        <div class="dato-fila">
          <span class="dato-label">Provincia:</span>
          <span class="dato-valor">{{ estudiante.provincia }}</span>
        </div>

        <div class="dato-fila">
          <span class="dato-label">Género:</span>
          <span class="dato-valor">{{ estudiante.genero }}</span>
        </div>
      </div>

      <div class="confirmacion-grupo">
        <label class="checkbox-label">
          <input 
            type="checkbox" 
            v-model="confirmacion"
          />
          Confirmo que deseo eliminar este estudiante de forma permanente
        </label>
      </div>

      <div class="botones-grupo">
        <button 
          type="button" 
          @click="borrarEstudiante" 
          class="btn-borrar" 
          :disabled="!confirmacion || borrando"
        >
          {{ borrando ? 'Eliminando...' : 'Borrar' }}
        </button>
        <button type="button" @click="volver" class="btn-cancelar">
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { consultarPorIdFachada, borrarFachada } from '@/clients/MatriculaClient';

export default {
  name: 'BorrarEstudiante',
  data() {
    return {
      estudiante: {
        id: null,
        nombre: '',
        apellido: '',
        fechaNacimiento: '',
        provincia: '',
        genero: ''
      },
      cargando: false,
      borrando: false,
      confirmacion: false,
      mensajeExito: '',
      mensajeError: ''
    };
  },
  methods: {
    async cargarEstudiante() {
      this.cargando = true;
      this.mensajeError = '';

      try {
        const id = this.$route.params.id;
        const data = await consultarPorIdFachada(id);
        
        if (data) {
          this.estudiante = data;
        } else {
          this.mensajeError = 'No se encontró el estudiante';
        }
      } catch (error) {
        console.error('Error al cargar estudiante:', error);
        this.mensajeError = 'Error al cargar los datos del estudiante';
      } finally {
        this.cargando = false;
      }
    },

    async borrarEstudiante() {
      if (!this.confirmacion) {
        this.mensajeError = 'Debe confirmar la eliminación';
        return;
      }

      this.borrando = true;
      this.mensajeError = '';

      try {
        const id = this.estudiante.id;
        await borrarFachada(id);
        
        this.mensajeExito = '¡Estudiante eliminado exitosamente!';
        
        setTimeout(() => {
          this.$router.push({ name: 'tabla-estudiantes' });
        }, 1500);

      } catch (error) {
        console.error('Error al borrar estudiante:', error);
        this.mensajeError = 'Error al eliminar el estudiante. Por favor, intente nuevamente.';
      } finally {
        this.borrando = false;
      }
    },

    formatearFecha(fecha) {
      if (!fecha) return 'N/A';
      const date = new Date(fecha);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    },

    volver() {
      this.$router.push({ name: 'tabla-estudiantes' });
    }
  },
  mounted() {
    this.cargarEstudiante();
  }
};
</script>

<style scoped>
.borrar-estudiante-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
}

h2 {
  color: rgb(70, 155, 212);
  border-bottom: 2px solid rgb(8, 58, 43);
  font-size: 35px;
  text-align: center;
  margin-bottom: 10px;
}

.advertencia {
  text-align: center;
  color: #d32f2f;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #ffebee;
  border: 2px solid #f44336;
  border-radius: 10px;
}

.mensaje-carga {
  background-color: #e3f2fd;
  color: #1976d2;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
}

.mensaje-exito {
  background-color: #d4edda;
  color: #155724;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 20px;
  border-left: 5px solid #28a745;
  font-weight: bold;
}

.mensaje-error {
  background-color: rgb(199, 151, 151);
  border-left: 5px solid rgb(139, 12, 12);
  padding: 10px;
  color: rgb(219, 45, 14);
  font-weight: bold;
  margin-bottom: 20px;
}

.formulario {
  background-color: rgb(51, 241, 178);
  border-radius: 10px;
  padding: 30px 40px;
  box-shadow: 10px 20px rgba(65, 58, 58, 0.2);
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 400px;
}

.datos-estudiante {
  background-color: rgba(255, 255, 255, 0.5);
  padding: 20px;
  border-radius: 8px;
  border: 2px solid rgb(70, 148, 105);
}

.datos-estudiante h3 {
  color: rgb(19, 97, 52);
  margin-bottom: 15px;
  font-size: 18px;
  border-bottom: 2px solid rgb(70, 148, 105);
  padding-bottom: 5px;
}

.dato-fila {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid rgba(70, 148, 105, 0.3);
}

.dato-fila:last-child {
  border-bottom: none;
}

.dato-label {
  font-weight: bold;
  color: rgb(19, 97, 52);
}

.dato-valor {
  color: rgb(103, 13, 248);
  font-weight: bold;
}

.confirmacion-grupo {
  background-color: rgba(255, 243, 205, 0.5);
  padding: 15px;
  border-radius: 10px;
  border: 2px solid #ffc107;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 14px;
  color: rgb(19, 97, 52);
  font-weight: bold;
}

.checkbox-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.botones-grupo {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.btn-borrar,
.btn-cancelar {
  background-color: rgb(9, 177, 126);
  padding: 10px 20px;
  border-radius: 10px;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.btn-borrar {
  background-color: #f44336;
}

.btn-borrar:hover:not(:disabled) {
  background-color: #da190b;
}

.btn-borrar:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.btn-cancelar {
  background-color: #757575;
}

.btn-cancelar:hover {
  background-color: #616161;
}

@media (max-width: 768px) {
  .formulario {
    min-width: auto;
    width: 100%;
    padding: 20px;
  }

  .dato-fila {
    flex-direction: column;
    gap: 5px;
  }

  .botones-grupo {
    flex-direction: column;
  }
}
</style>
