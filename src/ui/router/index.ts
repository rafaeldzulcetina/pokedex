import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

// @Views
import PokeHome from "../views/PokeHome.vue";
import Login from "@/ui/views/auth/Login.vue";
import Register from "@/ui/views/auth/Register.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: "/",
    name: "PokeHome",
    component: PokeHome,
  },
  {
    path: "/PokeList",
    name: "PokeList",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/PokeList.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }
  if (!authRequired && loggedIn) {
    return next('/');
  }

  next();
})

export default router;
