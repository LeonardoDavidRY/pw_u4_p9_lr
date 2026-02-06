<template>
  <div class="formulario-estudiante-container">
    <h2>Registro de Nuevo Estudiante</h2>
    
    <!-- Mensaje de éxito -->
    <div v-if="mensajeExito" class="mensaje-exito">
      {{ mensajeExito }}
    </div>

    <!-- Mensaje de error -->
    <div v-if="mensajeError" class="mensaje-error">
      {{ mensajeError }}
    </div>

    <div class="formulario">
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
        <button @click="guardarEstudiante" class="btn-guardar" :disabled="guardando">
          {{ guardando ? 'Guardando...' : 'Guardar Estudiante' }}
        </button>
        <button @click="limpiarFormulario" class="btn-limpiar">
          Limpiar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { guardarFachada } from '@/clients/MatriculaClient';

export default {
  name: 'FormularioEstudiante',
  data() {
    return {
      estudiante: {
        nombre: '',
        apellido: '',
        fechaNacimiento: '',
        provincia: '',
        genero: ''
      },
      guardando: false,
      mensajeExito: '',
      mensajeError: ''
    };
  },
  methods: {
    async guardarEstudiante() {
      this.guardando = true;
      this.mensajeExito = '';
      this.mensajeError = '';

      try {
        // Convertir fecha a formato LocalDateTime para el backend
        const estudianteData = {
          ...this.estudiante,
          fechaNacimiento: this.estudiante.fechaNacimiento + 'T00:00:00'
        };
        
        const resultado = await guardarFachada(estudianteData);
        console.log('Estudiante guardado:', resultado);
        
        this.mensajeExito = '¡Estudiante registrado exitosamente!';
        this.limpiarFormulario();

        // Opcional: redirigir después de 2 segundos
        setTimeout(() => {
          this.mensajeExito = '';
        }, 3000);

      } catch (error) {
        console.error('Error al guardar estudiante:', error);
        console.error('Detalles del error:', error.response?.data);
        const errorMsg = error.response?.data?.message || error.message || 'Error desconocido';
        this.mensajeError = `Error al guardar el estudiante: ${errorMsg}`;
      } finally {
        this.guardando = false;
      }
    },
    limpiarFormulario() {
      this.estudiante = {
        nombre: '',
        apellido: '',
        fechaNacimiento: '',
        provincia: '',
        genero: ''
      };
    }
  }
};
</script>

<style scoped>
.formulario-estudiante-container {
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

.form-grupo select {
  cursor: pointer;
}

.botones-grupo {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.btn-guardar,
.btn-limpiar {
  background-color: rgb(9, 177, 126);
  padding: 10px 20px;
  border-radius: 10px;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.btn-guardar:hover:not(:disabled) {
  background-color: rgb(7, 140, 100);
}

.btn-guardar:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.btn-limpiar {
  background-color: #f44336;
}

.btn-limpiar:hover {
  background-color: #da190b;
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
