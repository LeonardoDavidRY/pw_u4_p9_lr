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
    }
  },
  mounted() {
    // Cargar estudiantes automáticamente al montar el componente
    this.cargarTodos();
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
  color: #333;
  text-align: center;
  margin-bottom: 30px;
}

/* Sección de filtros */
.filtros-section {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
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
  color: #555;
}

.filtro-grupo input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  width: 150px;
}

.filtro-grupo input:focus {
  outline: none;
  border-color: #4CAF50;
}

/* Botones */
button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.btn-buscar {
  background-color: #4CAF50;
  color: white;
}

.btn-buscar:hover {
  background-color: #45a049;
}

.btn-limpiar {
  background-color: #f44336;
  color: white;
}

.btn-limpiar:hover {
  background-color: #da190b;
}

.btn-cargar-todos {
  background-color: #2196F3;
  color: white;
}

.btn-cargar-todos:hover {
  background-color: #0b7dda;
}

/* Mensajes */
.mensaje-carga,
.mensaje-error,
.mensaje-vacio {
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
}

.mensaje-carga {
  background-color: #e3f2fd;
  color: #1976d2;
}

.mensaje-error {
  background-color: #ffebee;
  color: #c62828;
}

.mensaje-vacio {
  background-color: #fff3e0;
  color: #f57c00;
}

/* Tabla */
.tabla-wrapper {
  overflow-x: auto;
}

.tabla-estudiantes {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.tabla-estudiantes thead {
  background-color: #4CAF50;
  color: white;
}

.tabla-estudiantes th,
.tabla-estudiantes td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.tabla-estudiantes th {
  font-weight: bold;
  text-transform: uppercase;
  font-size: 14px;
}

.tabla-estudiantes tbody tr:hover {
  background-color: #f5f5f5;
}

.tabla-estudiantes tbody tr:nth-child(even) {
  background-color: #fafafa;
}

.total-estudiantes {
  margin-top: 10px;
  font-weight: bold;
  color: #666;
  text-align: right;
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
