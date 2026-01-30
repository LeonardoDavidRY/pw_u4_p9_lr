import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/tabla-estudiantes',
    name: 'tabla-estudiantes',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "tabla-estudiantes" */ '../views/TablaEstudiantesView.vue')
  },
  {
    path: '/formulario-estudiante',
    name: 'formulario-estudiante',
    component: () => import(/* webpackChunkName: "formulario-estudiante" */ '../views/FormularioEstudianteView.vue')
  },
  {
    path: '/actualizar-estudiante/:id',
    name: 'actualizar-estudiante',
    component: () => import(/* webpackChunkName: "actualizar-estudiante" */ '../views/ActualizarEstudianteView.vue')
  },
  {
    path: '/actualizar-parcial-estudiante/:id',
    name: 'actualizar-parcial-estudiante',
    component: () => import(/* webpackChunkName: "actualizar-parcial-estudiante" */ '../views/ActualizarParcialEstudianteView.vue')
  },
  {
    path: '/borrar-estudiante/:id',
    name: 'borrar-estudiante',
    component: () => import(/* webpackChunkName: "borrar-estudiante" */ '../views/BorrarEstudianteView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
