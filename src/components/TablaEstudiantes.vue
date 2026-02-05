<template>
  <div class="tabla-estudiantes-container">
    <h1>Gestión de Estudiantes</h1>
    
    <!-- Sección de filtros -->
    <div class="filtros-section">
      <div class="filtro-grupo">
        <label for="buscarId">Buscar por ID:</label>
        <input 
          type="number" 
          id="buscarId" 
          v-model="idBusqueda" 
          placeholder="Ingrese el ID"
        />
        <button @click="buscarPorId" class="btn-buscar">Buscar</button>
        <button @click="limpiarFiltro" class="btn-limpiar">Limpiar</button>
      </div>
      <button @click="cargarTodos" class="btn-cargar-todos">Cargar Todos los Estudiantes</button>
    </div>

    <!-- Mensaje de carga -->
    <div v-if="cargando" class="mensaje-carga">
      Cargando estudiantes...
    </div>

    <!-- Mensaje de error -->
    <div v-if="error" class="mensaje-error">
      {{ error }}
    </div>

    <!-- Tabla de estudiantes -->
    <div v-if="!cargando && estudiantes.length > 0" class="tabla-wrapper">
      <table class="tabla-estudiantes">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Fecha Nacimiento</th>
            <th>Provincia</th>
            <th>Género</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="estudiante in estudiantes" :key="estudiante.id">
            <td>{{ estudiante.id }}</td>
            <td>{{ estudiante.nombre }}</td>
            <td>{{ estudiante.apellido }}</td>
            <td>{{ formatearFecha(estudiante.fechaNacimiento) }}</td>
            <td>{{ estudiante.provincia }}</td>
            <td>{{ estudiante.genero }}</td>
            <td class="acciones-cell">
              <button @click="irActualizar(estudiante.id)" class="btn-actualizar" title="Actualizar">
                Actualizar
              </button>
              <button @click="irActualizarParcial(estudiante.id)" class="btn-actualizar-parcial" title="Actualizar Parcial">
                Actualizar Parcial
              </button>
              <button @click="irBorrar(estudiante.id)" class="btn-borrar" title="Borrar">
                Borrar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="total-estudiantes">
        Total de estudiantes: {{ estudiantes.length }}
      </div>
    </div>

    <!-- Mensaje cuando no hay datos -->
    <div v-if="!cargando && estudiantes.length === 0 && !error" class="mensaje-vacio">
      No se encontraron estudiantes. Haz clic en "Cargar Todos los Estudiantes" para comenzar.
    </div>
  </div>
</template>

<script>
import {
  consultarTodosFachada,
  consultarPorIdFachada
} from "@/clients/MatriculaClient.js";

export default {
  name: "TablaEstudiantes",
  data() {
    return {
      estudiantes: [],
      idBusqueda: null,
      cargando: false,
      error: null,
    };
  },
  methods: {
    async cargarTodos() {
      try {
        this.cargando = true;
        this.error = null;
        this.estudiantes = await consultarTodosFachada();
      } catch (err) {
        this.error = "Error al cargar los estudiantes: " + err.message;
        console.error("Error al cargar estudiantes:", err);
      } finally {
        this.cargando = false;
      }
    },
    
    async buscarPorId() {
      if (!this.idBusqueda) {
        this.error = "Por favor, ingrese un ID para buscar";
        return;
      }
      
      try {
        this.cargando = true;
        this.error = null;
        const estudiante = await consultarPorIdFachada(this.idBusqueda);
        
        if (estudiante) {
          this.estudiantes = [estudiante];
        } else {
          this.estudiantes = [];
          this.error = "No se encontró ningún estudiante con ese ID";
        }
      } catch (err) {
        this.error = "Error al buscar el estudiante: " + err.message;
        this.estudiantes = [];
        console.error("Error al buscar estudiante:", err);
      } finally {
        this.cargando = false;
      }
    },
    
    limpiarFiltro() {
      this.idBusqueda = null;
      this.estudiantes = [];
      this.error = null;
    },
    
    formatearFecha(fecha) {
      if (!fecha) return "N/A";
      const date = new Date(fecha);
      return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      });
    },

    irActualizar(id) {
      this.$router.push({ name: 'actualizar-estudiante', params: { id } });
    },

    irActualizarParcial(id) {
      this.$router.push({ name: 'actualizar-parcial-estudiante', params: { id } });
    },

    irBorrar(id) {
      this.$router.push({ name: 'borrar-estudiante', params: { id } });
    }
  }
}
</script>

<style scoped>
.tabla-estudiantes-container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  color: rgb(70, 155, 212);
  border-bottom: 2px solid rgb(8, 58, 43);
  font-size: 35px;
  text-align: center;
  margin-bottom: 30px;
}

/* Sección de filtros */
.filtros-section {
  background-color: rgb(51, 241, 178);
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 10px 20px rgba(65, 58, 58, 0.2);
}

.filtro-grupo {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.filtro-grupo label {
  font-weight: bold;
  color: rgb(19, 97, 52);
  font-size: 18px;
}

.filtro-grupo input {
  padding: 8px 12px;
  border: none;
  border-bottom: 2px solid rgb(70, 148, 105);
  background: none;
  color: rgb(103, 13, 248);
  font-size: 14px;
  width: 150px;
}

.filtro-grupo input:focus {
  outline: none;
  border-bottom: 3px solid rgb(2, 37, 18);
}

/* Botones */
button {
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
  color: white;
}

.btn-buscar {
  background-color: rgb(9, 177, 126);
}

.btn-buscar:hover {
  background-color: rgb(7, 140, 100);
}

.btn-limpiar {
  background-color: #f44336;
}

.btn-limpiar:hover {
  background-color: #da190b;
}

.btn-cargar-todos {
  background-color: rgb(9, 177, 126);
}

.btn-cargar-todos:hover {
  background-color: rgb(7, 140, 100);
}

/* Mensajes */
.mensaje-carga,
.mensaje-error,
.mensaje-vacio {
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
}

.mensaje-carga {
  background-color: #e3f2fd;
  color: #1976d2;
  border-left: 5px solid #2196F3;
}

.mensaje-error {
  background-color: rgb(199, 151, 151);
  border-left: 5px solid rgb(139, 12, 12);
  color: rgb(219, 45, 14);
}

.mensaje-vacio {
  background-color: #fff3e0;
  color: #f57c00;
  border-left: 5px solid #FF9800;
}

/* Tabla */
.tabla-wrapper {
  overflow-x: auto;
  background-color: rgb(51, 241, 178);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 10px 20px rgba(65, 58, 58, 0.2);
}

.tabla-estudiantes {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
}

.tabla-estudiantes thead {
  background-color: rgb(9, 177, 126);
  color: white;
}

.tabla-estudiantes th,
.tabla-estudiantes td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid rgb(70, 148, 105);
}

.tabla-estudiantes th {
  font-weight: bold;
  text-transform: uppercase;
  font-size: 14px;
}

.tabla-estudiantes tbody tr:hover {
  background-color: rgba(51, 241, 178, 0.2);
}

.tabla-estudiantes tbody tr:nth-child(even) {
  background-color: rgba(158, 226, 220, 0.2);
}

.total-estudiantes {
  margin-top: 10px;
  font-weight: bold;
  color: rgb(19, 97, 52);
  text-align: right;
  font-size: 16px;
}

/* Acciones */
.acciones-cell {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}

.btn-actualizar,
.btn-actualizar-parcial,
.btn-borrar {
  padding: 6px 12px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.3s;
  white-space: nowrap;
  color: white;
}

.btn-actualizar {
  background-color: rgb(9, 177, 126);
}

.btn-actualizar:hover {
  background-color: rgb(7, 140, 100);
}

.btn-actualizar-parcial {
  background-color: #FF9800;
}

.btn-actualizar-parcial:hover {
  background-color: #e68900;
}

.btn-borrar {
  background-color: #f44336;
}

.btn-borrar:hover {
  background-color: #da190b;
}

/* Responsive */
@media (max-width: 768px) {
  .tabla-estudiantes-container {
    padding: 10px;
  }

  .filtro-grupo {
    flex-direction: column;
    align-items: stretch;
  }

  .filtro-grupo input {
    width: 100%;
  }

  .tabla-estudiantes {
    font-size: 12px;
  }

  .tabla-estudiantes th,
  .tabla-estudiantes td {
    padding: 8px;
  }
}
</style>
