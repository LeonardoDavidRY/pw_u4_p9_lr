import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      requiereAutorizacion: false,
      esPublica: true,
    },
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
    meta: {
      requiereAutorizacion: false,
      esPublica: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
  },
  {
    path: "/tabla-estudiantes",
    name: "tabla-estudiantes",
    component: () =>
      import(
        /* webpackChunkName: "tabla-estudiantes" */ "../views/TablaEstudiantesView.vue"
      ),
    meta: {
      requiereAutorizacion: true,
      esPublica: false,
    },
  },
  {
    path: "/formulario-estudiante",
    name: "formulario-estudiante",
    component: () =>
      import(
        /* webpackChunkName: "formulario-estudiante" */ "../views/FormularioEstudianteView.vue"
      ),
    meta: {
      requiereAutorizacion: true,
      esPublica: false,
    },
  },
  {
    path: "/actualizar-estudiante/:id",
    name: "actualizar-estudiante",
    component: () =>
      import(
        /* webpackChunkName: "actualizar-estudiante" */ "../views/ActualizarEstudianteView.vue"
      ),
    meta: {
      requiereAutorizacion: true,
      esPublica: false,
    },
  },
  {
    path: "/actualizar-parcial-estudiante/:id",
    name: "actualizar-parcial-estudiante",
    component: () =>
      import(
        /* webpackChunkName: "actualizar-parcial-estudiante" */ "../views/ActualizarParcialEstudianteView.vue"
      ),
    meta: {
      requiereAutorizacion: true,
      esPublica: false,
    },
  },
  {
    path: "/borrar-estudiante/:id",
    name: "borrar-estudiante",
    component: () =>
      import(
        /* webpackChunkName: "borrar-estudiante" */ "../views/BorrarEstudianteView.vue"
      ),
    meta: {
      requiereAutorizacion: true,
      esPublica: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
/* Configuracion del Guardian */
router.beforeEach((to, from, next) => {
  if (to.meta.requiereAutorizacion) {
    /* Le envio a una pagina de login*/
    const estaAutenticado = localStorage.getItem("estaAutenticado");
    if(!estaAutenticado){
      console.log("No Autenticado - Redirigiendo al Login");
      next({ name: "login" });
    }else{
      console.log("Autenticado - Acceso Permitido");
      next();
    }
  } else {
    /*Le dejo que pase sin validaciones */
    console.log("Pase Libre");
    next();
  }
});

export default router;
