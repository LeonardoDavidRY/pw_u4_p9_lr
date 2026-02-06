<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/tabla-estudiantes">Tabla Estudiantes</router-link> |
    <router-link to="/formulario-estudiante">Registrar Estudiante</router-link> |

  </nav>
  <router-view/>
</template>

<style scoped>
body {
  background-color: #9ee2dc;
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  background-color: #9ee2dc;
}

nav {
  background-color: rgb(51, 241, 178);
  padding: 20px 30px;
  box-shadow: 10px 10px rgba(65, 58, 58, 0.2);
  border-radius: 10px;
  margin: 20px;
}

nav a {
  font-weight: bold;
  color: rgb(19, 97, 52);
  text-decoration: none;
  font-size: 18px;
  transition: color 0.3s;
}

nav a:hover {
  color: rgb(103, 13, 248);
}

nav a.router-link-exact-active {
  color: rgb(70, 155, 212);
  border-bottom: 2px solid rgb(8, 58, 43);
  padding-bottom: 5px;
}
</style>

