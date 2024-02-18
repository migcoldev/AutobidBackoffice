import { createRouter, createWebHashHistory } from "vue-router";
// import store from "../store"

import DashboardLayout from "@/layout/DashboardLayout";
import AuthLayout from "@/layout/AuthLayout";

import Dashboard from "../views/Dashboard.vue";
import Tables from "../views/Tables.vue";

import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import Usuarios from "../views/usuarios/index.vue";
import UsuariosRegistro from "../views/usuarios/registrar.vue";
import UsuariosEditar from "../views/usuarios/editar.vue";
import Vehiculos from "../views/vehiculos/index.vue";
import VehiculosRegistro from "../views/vehiculos/registrar.vue";
import VehiculosEditar from "../views/vehiculos/editar.vue";
import Solicitudes from "../views/solicitudes/index.vue";
import HistorialScrapeo from "../views/historial_scrapeo/index.vue";

const routes = [
  {
    path: "/",
    redirect: "/vehiculos",
    meta: {
        title: "Home",
        requiresAuth: true
    },
    component: DashboardLayout,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        components: { default: Dashboard },
      },
      {
        path: "/usuarios",
        name: "usuarios",
        components: { default: Usuarios },
      },
      {
        path: "/usuarios/registrar",
        name: "usuarios_registrar",
        components: { default: UsuariosRegistro },
      },
      {
        path: '/usuarios/editar/:id',
        name: "usuarios_editar",
        components: { default: UsuariosEditar },
      },
      {
        path: "/vehiculos",
        name: "vehiculos",
        components: { default: Vehiculos },
      },
      {
        path: "/vehiculos/registrar",
        name: "vehiculos_registrar",
        components: { default: VehiculosRegistro },
      },
      {
        path: '/vehiculos/editar/:id',
        name: "vehiculos_editar",
        components: { default: VehiculosEditar },
      },
      {
        path: "/solicitudes",
        name: "solicitudes",
        components: { default: Solicitudes },
      },
      {
        path: "/historial_scrapeo",
        name: "historial_scrapeo",
        components: { default: HistorialScrapeo },
      },
    ],
  },
  {
    path: "/",
    redirect: "login",
    component: AuthLayout,
    children: [
      {
        path: "/login",
        name: "login",
        components: { default: Login },
      }
    ],
  },
  {
    path: "/",
    redirect: "Logout",
    component: AuthLayout,
    children: [
      {
        path: "/logout",
        name: "logout",
        components: { default: Logout },
      }
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: "active",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // if (store.getters.isLoggedIn) {
    // console.log("TOKEN : " + localStorage.getItem("token"))
    if (localStorage.getItem("token") != "" && localStorage.getItem("token") != null) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router;
