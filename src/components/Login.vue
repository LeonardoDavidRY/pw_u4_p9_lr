<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Iniciar Sesión</h2>
      <div class="login-form">
        <div class="form-grupo">
          <label for="usuario">Usuario:</label>
          <input 
            type="text" 
            id="usuario"
            v-model="usuario" 
            placeholder="Ingrese su usuario"
          />
        </div>
        <div class="form-grupo">
          <label for="password">Contraseña:</label>
          <input 
            type="password" 
            id="password"
            v-model="password" 
            placeholder="Ingrese su contraseña"
          />
        </div>
        <div class="botones-grupo">
          <button @click="login" class="btn-login">
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTokenFachada } from "@/clients/AuthorizationClient.js";

export default {
  data() {
    return {
      usuario: "",
      password: "",
    };
  },
  methods: {
    // Aqui mando la logica del token
    async login() {
      try {
        const tokenData = await getTokenFachada(this.usuario, this.password);
        if (tokenData !== null && tokenData !== undefined && tokenData.accessToken) {
          localStorage.setItem("token", tokenData.accessToken);
          localStorage.setItem("estaAutenticado", "true");
          this.$router.push("/tabla-estudiantes");
        } else {
          console.log("Error de autenticación");
          alert("Error de autenticación");
        }
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        alert("Error al iniciar sesión. Verifique sus credenciales.");
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #9ee2dc;
  padding: 20px;
}

.login-box {
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 450px;
}

.login-box h2 {
  text-align: center;
  color: rgb(19, 97, 52);
  font-size: 28px;
  margin-bottom: 30px;
  font-weight: bold;
}

.login-form {
  background-color: rgb(51, 241, 178);
  border-radius: 10px;
  padding: 30px 40px;
  box-shadow: 10px 20px rgba(65, 58, 58, 0.2);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-grupo {
  display: flex;
  flex-direction: column;
}

.form-grupo label {
  font-size: 18px;
  color: rgb(19, 97, 52);
  margin-bottom: 5px;
  font-weight: bold;
}

.form-grupo input {
  width: 100%;
  border: none;
  border-bottom: 2px solid rgb(70, 148, 105);
  background: none;
  color: rgb(19, 97, 52);
  padding: 10px 0;
  font-size: 16px;
  transition: border-bottom 0.3s;
}

.form-grupo input::placeholder {
  color: rgba(19, 97, 52, 0.5);
}

.form-grupo input:focus {
  outline: none;
  border-bottom: 3px solid rgb(2, 37, 18);
}

.botones-grupo {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.btn-login {
  background-color: rgb(9, 177, 126);
  padding: 12px 40px;
  border-radius: 10px;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.2s;
  width: 100%;
}

.btn-login:hover {
  background-color: rgb(7, 140, 100);
  transform: translateY(-2px);
}

.btn-login:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .login-box {
    padding: 15px;
  }

  .login-form {
    padding: 20px;
  }

  .login-box h2 {
    font-size: 24px;
  }

  .btn-login {
    font-size: 16px;
    padding: 10px 30px;
  }
}
</style>