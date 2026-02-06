<template>
  <div class="actualizar-estudiante-container">
    <h2>Actualizar Estudiante</h2>
    
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

    <div v-if="!cargando" class="formulario">
      <div class="form-grupo">
        <label for="id">ID:</label>
        <input 
          type="text" 
          id="id" 
          v-model="estudiante.id" 
          disabled
          class="input-disabled"
        />
      </div>

      <div class="form-grupo">
        <label for="nombre">Nombre:</label>
        <input 
          type="text" 
          id="nombre" 
          v-model="estudiante.nombre" 
          placeholder="Ingrese el nombre"
        />
      </div>

      <div class="form-grupo">
        <label for="apellido">Apellido:</label>
        <input 
          type="text" 
          id="apellido" 
          v-model="estudiante.apellido" 
          placeholder="Ingrese el apellido"
        />
      </div>

      <div class="form-grupo">
        <label for="fechaNacimiento">Fecha de Nacimiento:</label>
        <input 
          type="date" 
          id="fechaNacimiento" 
          v-model="estudiante.fechaNacimiento" 
        />
      </div>

      <div class="form-grupo">
        <label for="provincia">Provincia:</label>
        <input 
          type="text" 
          id="provincia" 
          v-model="estudiante.provincia" 
          placeholder="Ingrese la provincia"
        />
      </div>

      <div class="form-grupo">
        <label for="genero">Género:</label>
        <select 
          id="genero" 
          v-model="estudiante.genero" 
        >
          <option value="">Seleccione un género</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>
      </div>

      <div class="botones-grupo">
        <button @click="actualizarEstudiante" class="btn-actualizar" :disabled="actualizando">
          {{ actualizando ? 'Actualizando...' : 'Actualizar' }}
        </button>
        <button @click="volver" class="btn-cancelar">
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { consultarPorIdFachada, actualizarFachada } from '@/clients/MatriculaClient';

export default {
  name: 'ActualizarEstudiante',
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
      actualizando: false,
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
          this.estudiante = {
            ...data,
            fechaNacimiento: this.formatearFechaParaInput(data.fechaNacimiento)
          };
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

    async actualizarEstudiante() {
      this.actualizando = true;
      this.mensajeExito = '';
      this.mensajeError = '';

      try {
        const id = this.estudiante.id;
        const body = {
          nombre: this.estudiante.nombre,
          apellido: this.estudiante.apellido,
          fechaNacimiento: this.estudiante.fechaNacimiento + 'T00:00:00',
          provincia: this.estudiante.provincia,
          genero: this.estudiante.genero
        };

        console.log('ID del estudiante:', id);
        console.log('Datos a actualizar:', body);
        
        const resultado = await actualizarFachada(id, body);
        console.log('Resultado de actualización:', resultado);
        
        this.mensajeExito = '¡Estudiante actualizado exitosamente!';
        
        setTimeout(() => {
          this.$router.push({ name: 'tabla-estudiantes' });
        }, 1500);

      } catch (error) {
        console.error('Error al actualizar estudiante:', error);
        this.mensajeError = 'Error al actualizar el estudiante. Por favor, intente nuevamente.';
      } finally {
        this.actualizando = false;
      }
    },

    formatearFechaParaInput(fecha) {
      if (!fecha) return '';
      const date = new Date(fecha);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
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
.actualizar-estudiante-container {
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
  margin-bottom: 20px;
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
  gap: 15px;
  min-width: 400px;
}

.form-grupo {
  display: flex;
  flex-direction: column;
}

.form-grupo label {
  font-size: 20px;
  color: rgb(19, 97, 52);
  margin-top: 10px;
  font-weight: bold;
}

.form-grupo input,
.form-grupo select {
  width: 100%;
  border: none;
  border-bottom: 2px solid rgb(70, 148, 105);
  background: none;
  color: rgb(103, 13, 248);
  padding: 8px 0;
  font-size: 16px;
}

.form-grupo input:focus,
.form-grupo select:focus {
  outline: none;
  border-bottom: 3px solid rgb(2, 37, 18);
}

.input-disabled {
  background-color: rgba(233, 236, 239, 0.3);
  cursor: not-allowed;
  color: #666;
}

.botones-grupo {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.btn-actualizar,
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

.btn-actualizar:hover:not(:disabled) {
  background-color: rgb(7, 140, 100);
}

.btn-actualizar:disabled {
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

  .botones-grupo {
    flex-direction: column;
  }
}
</style>
