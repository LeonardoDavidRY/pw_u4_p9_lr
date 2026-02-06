<template>
  <div class="login">
    <h2>Login</h2>
    <input type="text" placeholder="Usuario" v-model="usuario" />
    <input type="password" placeholder="Contraseña" v-model="password" />
    <button @click="login()">Iniciar Sesión</button>
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
        const token = await getTokenFachada(this.usuario, this.password);
        if (token !== null && token !== undefined) {
          localStorage.setItem("token", token);
          localStorage.setItem("estaAutenticado", true);
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

<style>
.login {
  width: 300px;
  margin: 100px;
  padding: 20px;
  border: 1px solid #0eac7c;
  border-radius: 8px;
  text-align: center;
}
input {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
}
button {
  width: 100%;
  padding: 8px;
  cursor: pointer;
}
</style>