import { createRouter, createWebHistory } from "vue-router";

import Dashboard from "../pages/Dashboard.vue";
import Managers from "../pages/Managers.vue";
import Users from "../pages/Users.vue";
import Books from "../pages/Books.vue";
import Authors from "../pages/Authors.vue";
import Publishers from "../pages/Publishers.vue";
import Category from "../pages/Category.vue";

const routes = [
  { path: "/", redirect: "/dashboard" },
  { path: "/dashboard", component: Dashboard },
  { path: "/managers", component: Managers },
  { path: "/users", component: Users },
  { path: "/books", component: Books },
  { path: "/authors", component: Authors },
  { path: "/publishers", component: Publishers },
  { path: "/category", component: Category },
];

export default createRouter({
  history: createWebHistory(),
  routes
});